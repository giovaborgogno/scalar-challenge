from rest_framework_api.views import StandardAPIView
from rest_framework import status
from rest_framework import permissions
from .serializers import MovieSerializer
from .models import *
from django.db.models.query_utils import Q
from apps.user.models import UserAccount
from django.db.models import F, Value
from django.db.models.functions import Coalesce



class ListPublishedMoviesView(StandardAPIView):
    def get(self, request, *args, **kwargs):
        try:               
            
            sortBy = request.query_params.get('sort_by')

            if not (sortBy == 'rating'):
                sortBy = 'release_date'
            
            order = request.query_params.get('order')
            
            if order == 'asc':
                movies = Movie.objects.order_by(sortBy).filter(status="Published")
            else:
                sortBy = '-' + sortBy
                if sortBy == '-rating':
                    movies = Movie.objects.annotate(
                        sorted_rating=Coalesce('rating', Value(-100))
                    ).order_by(F('sorted_rating').desc(), 'release_date').filter(status="Published")
                else:
                    movies = Movie.objects.order_by(sortBy).filter(status="Published")
                
            
            search_term = request.query_params.get("search")
            if search_term and search_term != "none":
                movies = movies.filter(
                    Q(title__icontains=search_term)
                    | Q(genre__icontains=search_term)
                    | Q(plot__icontains=search_term)
                )

            
            serializer = MovieSerializer(movies, many=True).data
            return self.paginate_response(request, serializer)

        

        except Exception as e:
            return self.send_error("Internal Server Error", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ListMoviesView(StandardAPIView):
    def get(self, request, *args, **kwargs):
        try:          
            try:     
                user = self.request.user
                if not (user.role =='admin' or user.is_staff):
                    return self.send_error(str('You have not permissions'), status=status.HTTP_401_UNAUTHORIZED)                
            except Exception:
                return self.send_error(str('You have not permissions'), status=status.HTTP_401_UNAUTHORIZED) 
                
            sortBy = request.query_params.get('sort_by')

            if not (sortBy == 'rating'):
                sortBy = 'release_date'
            
            order = request.query_params.get('order')
            
            if order == 'asc':
                movies = Movie.objects.order_by(sortBy).all()
            else:
                sortBy = '-' + sortBy
                if sortBy == '-rating':
                    movies = Movie.objects.annotate(
                        sorted_rating=Coalesce('rating', Value(-100))
                    ).order_by(F('sorted_rating').desc(), 'release_date').all()
                else:
                    movies = Movie.objects.order_by(sortBy).all()
            
            search_term = request.query_params.get("search")
            if search_term and search_term != "none":
                movies = movies.filter(
                    Q(title__icontains=search_term)
                    | Q(genre__icontains=search_term)
                    | Q(plot__icontains=search_term)
                )

            
            serializer = MovieSerializer(movies, many=True).data
            return self.paginate_response(request, serializer)

        

        except Exception as e:
            return self.send_error("Internal Server Error", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class DetailMovieView(StandardAPIView):
    def get(self, request, slug, *args, **kwargs):
        try:              
            
            movie = Movie.objects.get(slug=slug)
            serializer = MovieSerializer(movie).data

            return self.send_response({"movie": serializer}, status=status.HTTP_200_OK)

        except Movie.DoesNotExist:
            return self.send_error("Invalid movie slug", status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return self.send_error("Internal Server Error", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class PostMovieView(StandardAPIView):
    def post(self, request, format=None):
        try:
            try:     
                user = self.request.user
                if not (user.role =='admin' or user.is_staff):
                    return self.send_error(str('You have not permissions'), status=status.HTTP_401_UNAUTHORIZED)                
            except Exception:
                return self.send_error(str('You have not permissions'), status=status.HTTP_401_UNAUTHORIZED) 
            
            try:
                data = self.request.data
                
                title = data['title']
                release_date = data['release_date']
                genre = data['genre']
                plot = data['plot']
                trailer_url = data['trailer_url']
                movie_status = data['status']
            except:
                return self.send_error("Invalid data", status=status.HTTP_400_BAD_REQUEST)
            
            movie = Movie.objects.create(
                title=title,
                release_date = release_date,
                genre = genre,
                plot = plot,
                trailer_url = trailer_url,
                status = movie_status
            )

            movie = MovieSerializer(movie).data
            
            return self.send_response({"movie": movie}, status=status.HTTP_201_CREATED)
            
            
        except Exception as e:
            return self.send_error("Internal Server Error", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ChangeStatusMovieView(StandardAPIView):
     def put(self, request,slug, format=None):
        try:
            try:     
                user = self.request.user
                if not (user.role =='admin' or user.is_staff):
                    return self.send_error(str('You have not permissions'), status=status.HTTP_401_UNAUTHORIZED)                
            except Exception:
                return self.send_error(str('You have not permissions'), status=status.HTTP_401_UNAUTHORIZED) 
            
            try:
                movie_status = self.request.data['status']
            except:
                return self.send_error("Invalid data", status=status.HTTP_400_BAD_REQUEST)
            
            movie = Movie.objects.get(slug=slug)
            movie.status = movie_status
            movie.save()

            movie = MovieSerializer(movie).data
            
            return self.send_response({},status=status.HTTP_204_NO_CONTENT)
        
        except Movie.DoesNotExist:
            return self.send_error("Invalid movie slug", status=status.HTTP_404_NOT_FOUND)
            
        except Exception as e:
            return self.send_error("Internal Server Error", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UpdateMovieView(StandardAPIView):
    def put(self, request, slug, format=None):
        try:
            try:     
                user = self.request.user
                if not (user.role =='admin' or user.is_staff):
                    return self.send_error(str('You have not permissions'), status=status.HTTP_401_UNAUTHORIZED)                
            except Exception:
                return self.send_error(str('You have not permissions'), status=status.HTTP_401_UNAUTHORIZED) 
            
            try:
                data = self.request.data
                
                title = data['title']
                release_date = data['release_date']
                genre = data['genre']
                plot = data['plot']
                trailer_url = data['trailer_url']
                movie_status = data['status']
            except:
                return self.send_error("Invalid data", status=status.HTTP_400_BAD_REQUEST)
            
            movie = Movie.objects.filter(slug=slug).update(
                title=title,
                release_date = release_date,
                genre = genre,
                plot = plot,
                trailer_url = trailer_url,
                status = movie_status
            )
            

            movie = MovieSerializer(movie).data
            
            return self.send_response({}, status=status.HTTP_204_NO_CONTENT)
            
        except Movie.DoesNotExist:
            return self.send_error("Invalid movie slug", status=status.HTTP_404_NOT_FOUND)
            
        except Exception as e:
            return self.send_error("Internal Server Error", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    