from rest_framework.test import APISimpleTestCase
from rest_framework import status
from django.urls import reverse
from unittest.mock import patch, MagicMock
from apps.movie.models import Movie
from apps.user.models import UserAccount
from apps.review.models import Review


class ListCriticsReviewsViewTest(APISimpleTestCase):
    
    @patch('apps.movie.models.Movie.objects.get')
    @patch('apps.user.models.UserAccount.objects.filter')
    @patch('apps.review.models.Review.objects')
    def test_list_critics_reviews(self, mock_review_objects, mock_user_filter, mock_movie_get):
        mock_movie = Movie(title='Movie 1', slug='movie-1')
        mock_movie_get.return_value = mock_movie

        mock_user_filter.return_value = [UserAccount(email='critic@example.com', role='critic')]

        mock_review = Review(
            user=UserAccount(email='critic@example.com', role='critic'),
            movie=mock_movie,
            rating=4,
            comment='Good movie'
        )
        mock_review_objects.order_by.return_value.filter.return_value = [mock_review]

        url = reverse('list-critics-reviews', args=[mock_movie.slug])
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['comment'], 'Good movie')

    @patch('apps.review.views.Movie.objects.get')
    def test_list_critics_reviews_invalid_movie_slug(self, mock_movie_get):
        mock_movie_get.side_effect = Movie.DoesNotExist

        url = reverse('list-critics-reviews', args=['invalid-slug'])
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class ListUsersReviewsViewTest(APISimpleTestCase):
    
    @patch('apps.review.views.Movie.objects.get')
    @patch('apps.review.views.UserAccount.objects.filter')
    @patch('apps.review.views.Review.objects')
    def test_list_users_reviews(self, mock_review_objects, mock_user_filter, mock_movie_get):
        mock_movie = Movie(title='Movie 1', slug='movie-1')
        mock_movie_get.return_value = mock_movie

        mock_user_filter.return_value = [UserAccount(email='user@example.com', role='user')]

        mock_review = Review(
            user=UserAccount(email='user@example.com', role='user'),
            movie=mock_movie,
            rating=4,
            comment='Good movie'
        )
        mock_review_objects.order_by.return_value.filter.return_value = [mock_review]

        url = reverse('list-users-reviews', args=[mock_movie.slug])
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['comment'], 'Good movie')

    @patch('apps.review.views.Movie.objects.get')
    def test_list_users_reviews_invalid_movie_slug(self, mock_movie_get):
        mock_movie_get.side_effect = Movie.DoesNotExist

        url = reverse('list-users-reviews', args=['invalid-slug'])
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class PostReviewViewTest(APISimpleTestCase):
    
    @patch('apps.movie.models.Movie.objects')
    @patch('apps.review.models.Review.objects')
    @patch('apps.user.models.UserAccount.objects.filter')
    def test_post_review(self, mock_user_filter, mock_review_objects, mock_movie_objects):
        movie_data = {
            "title": "Sound of Freedom",
            "slug": "sound-of-freedom",
            "release_date": "2023-06-01",
            "genre": "Thriller",
            "plot": "A former federal agent embarks on a dangerous mission to save a girl from ruthless child traffickers. Time is running out, and he ventures into the Colombian jungle, risking his life to free her from a fate worse than death.",
            "trailer_url": "https://www.youtube.com/embed/H82uvLvszQ0?si=NpbtC3QjySz6p52x",
            "status": "Published",
            "rating": None,
            "users_rating": 4.0
        }
        mock_movie = MagicMock(spec=Movie)
        mock_movie_objects.get.return_value = mock_movie
        mock_movie_objects.get.return_value.save.return_value = Movie(**movie_data) 

        mock_user = UserAccount(email='user@example.com', role='user')

        mock_review_objects.create.return_value = Review(
            rating=4,
            comment='Good movie',
            user=mock_user,
            movie=Movie(**movie_data)
        )
        
        mock_user_filter.return_value = [mock_user]

        mock_review_objects.filter.return_value.aggregate.return_value = { 'rating__avg': 4.0 }

        self.client.force_authenticate(user=mock_user)

        url = reverse('post-review', args=[mock_movie.slug])
        data = {'rating': 4.0, 'comment': 'Good movie'}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['results']['movie']['users_rating'], '4.0')
        self.assertEqual(response.data['results']['review']['user']['role'], 'user')

    @patch('apps.review.views.Movie.objects.get')
    def test_post_review_invalid_movie_slug(self, mock_movie_get):
        mock_movie_get.side_effect = Movie.DoesNotExist

        self.client.force_authenticate(user=MagicMock(spec=UserAccount, role='user'))

        url = reverse('post-review', args=['invalid-slug'])
        data = {'rating': 4.0, 'comment': 'Good movie'}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_post_review_unauthenticated_user(self):
        url = reverse('post-review', args=['movie-1'])
        data = {'rating': 4.0, 'comment': 'Good movie'}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    @patch('apps.movie.models.Movie.objects')
    @patch('apps.review.models.Review.objects')
    @patch('apps.user.models.UserAccount.objects.filter')
    def test_post_review(self, mock_user_filter, mock_review_objects, mock_movie_objects):
        movie_data = {
            "title": "Sound of Freedom",
            "slug": "sound-of-freedom",
            "release_date": "2023-06-01",
            "genre": "Thriller",
            "plot": "A former federal agent embarks on a dangerous mission to save a girl from ruthless child traffickers. Time is running out, and he ventures into the Colombian jungle, risking his life to free her from a fate worse than death.",
            "trailer_url": "https://www.youtube.com/embed/H82uvLvszQ0?si=NpbtC3QjySz6p52x",
            "status": "Published",
            "rating": None,
            "users_rating": 4.0
        }
        mock_movie = MagicMock(spec=Movie)
        mock_movie_objects.get.return_value = mock_movie
        mock_movie_objects.get.return_value.save.return_value = Movie(**movie_data) 

        mock_user = UserAccount(email='user@example.com', role='critic')

        mock_review_objects.create.return_value = Review(
            rating=4,
            comment='Good movie',
            user=mock_user,
            movie=Movie(**movie_data)
        )
        
        mock_user_filter.return_value = [mock_user]

        mock_review_objects.filter.return_value.aggregate.return_value = { 'rating__avg': 4.0 }

        self.client.force_authenticate(user=mock_user)

        url = reverse('post-review', args=[mock_movie.slug])
        data = {'rating': 4.0, 'comment': 'Good movie'}
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['results']['movie']['users_rating'], '4.0')
        self.assertEqual(response.data['results']['review']['user']['role'], 'critic')
