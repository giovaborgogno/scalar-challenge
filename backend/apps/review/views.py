from rest_framework_api.views import StandardAPIView
from rest_framework import status
from .serializers import ReviewSerializer
from apps.movie.serializers import MovieSerializer
from .models import *
from apps.movie.models import Movie
from django.db.models.query_utils import Q
from apps.user.models import UserAccount
from django.db.models import Avg



# Create your views here.
class ListCriticsReviewsView(StandardAPIView):
    def get(self, request, slug):
        try:
            movie = Movie.objects.get(slug=slug)
            critics = UserAccount.objects.filter(role='critic')
            reviews = Review.objects.order_by('-date_created').filter(movie=movie, user__in=critics)
            
            serializer = ReviewSerializer(reviews, many=True).data
            return self.paginate_response(request, serializer)

        except Movie.DoesNotExist:
            return self.send_error("Invalid movie slug", status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return self.send_error("Internal Server Error", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ListUsersReviewsView(StandardAPIView):
    def get(self, request, slug):
        try:
            movie = Movie.objects.get(slug=slug)
            users = UserAccount.objects.filter(Q(role='user') | Q(role='admin'))
            reviews = Review.objects.order_by('-date_created').filter(movie=movie, user__in=users)
            
            serializer = ReviewSerializer(reviews, many=True).data
            return self.paginate_response(request, serializer)

        except Movie.DoesNotExist:
            return self.send_error("Invalid movie slug", status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return self.send_error("Internal Server Error", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class PostReviewView(StandardAPIView):
    def post(self, request, slug):
        try:
            try:     
                user = self.request.user               
            except Exception:
                return self.send_error(str('You are not logged in'), status=status.HTTP_401_UNAUTHORIZED)
            
            movie = Movie.objects.get(slug=slug)
            
            if movie.status == 'Draft':
                return self.send_error("Forbidden", status=status.HTTP_403_FORBIDDEN)
            
            try:
                data = self.request.data
                
                rating = data['rating']
                comment = data['comment']
            except:
                return self.send_error("Invalid data", status=status.HTTP_400_BAD_REQUEST)
            
            review = Review.objects.create(
                rating=rating,
                comment=comment,
                user=user,
                movie=movie
            )
            if user.role == 'critic':
                users = UserAccount.objects.filter(role='critic')
                avg_rating = Review.objects.filter(movie=movie, user__in=users).aggregate(Avg('rating'))              
                movie.rating = avg_rating['rating__avg']
                
            else:
                users = UserAccount.objects.filter(Q(role='user') | Q(role='admin'))
                avg_rating = Review.objects.filter(movie=movie, user__in=users).aggregate(Avg('rating'))
                movie.users_rating = avg_rating['rating__avg']
            
            movie = MovieSerializer(movie.save()).data
            
            review = ReviewSerializer(review).data
            return self.send_response({'review': review, 'movie':movie}, status=status.HTTP_201_CREATED)
        except Movie.DoesNotExist:
            return self.send_error("Invalid movie slug", status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return self.send_error(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            # return self.send_error("Internal Server Error", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        