from rest_framework.test import APISimpleTestCase
from rest_framework import status
from django.urls import reverse
from unittest.mock import patch, MagicMock
from apps.movie.models import Movie
from apps.user.models import UserAccount

class ListPublishedMoviesViewTest(APISimpleTestCase):
    
    @patch('apps.movie.views.Movie.objects')
    def test_list_published_movies(self, mock_movie_objects):
        movie_data = {
            "title": "Sound of Freedom",
            "slug": "sound-of-freedom",
            "release_date": "2023-06-01",
            "genre": "Thriller",
            "plot": "A former federal agent embarks on a dangerous mission to save a girl from ruthless child traffickers. Time is running out, and he ventures into the Colombian jungle, risking his life to free her from a fate worse than death.",
            "trailer_url": "https://www.youtube.com/embed/H82uvLvszQ0?si=NpbtC3QjySz6p52x",
            "status": "Published",
            "rating": None,
            "users_rating": "4.0"
        }
        mock_movie_objects.order_by.return_value.filter.return_value = [Movie(**movie_data)]

        url = reverse('list_published_movies')
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['title'], 'Sound of Freedom')


class DetailMovieViewTest(APISimpleTestCase):
    
    @patch('apps.movie.models.Movie.objects.get')
    def test_get_movie_detail(self, mock_movie_get):
        movie_data = {
            "title": "Sound of Freedom",
            "slug": "sound-of-freedom",
            "release_date": "2023-06-01",
            "genre": "Thriller",
            "plot": "A former federal agent embarks on a dangerous mission to save a girl from ruthless child traffickers. Time is running out, and he ventures into the Colombian jungle, risking his life to free her from a fate worse than death.",
            "trailer_url": "https://www.youtube.com/embed/H82uvLvszQ0?si=NpbtC3QjySz6p52x",
            "status": "Published",
            "rating": None,
            "users_rating": "4.0"
        }
        
        mock_movie_get.return_value = Movie(**movie_data)

        url = reverse('movie-detail', kwargs={'slug': 'sound-of-freedom'})
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results']['movie']['title'], 'Sound of Freedom')

    @patch('apps.movie.models.Movie.objects.get')
    def test_invalid_movie_slug(self, mock_movie_get):
        mock_movie_get.side_effect = Movie.DoesNotExist

        url = reverse('movie-detail', kwargs={'slug': 'invalid-slug'})
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class PostMovieViewTest(APISimpleTestCase):
    
    @patch('apps.movie.models.Movie.objects.create')
    @patch('apps.user.models.UserAccount.objects.get')
    def test_create_movie(self, mock_get_user, mock_movie_create):
        mock_user = MagicMock(spec=UserAccount)
        mock_user.email = 'admin@gmail.com'
        mock_user.role = 'admin'
        mock_get_user.return_value = mock_user

        self.client.force_authenticate(user=mock_user)
        
        data = {
            'title': 'New Movie',
            'release_date': '2023-09-15',
            'genre': 'Action',
            'plot': 'A new movie plot',
            'trailer_url': 'https://example.com/trailer',
            'status': 'Published'
        }
        mock_movie_create.return_value = Movie(**data)

        url = reverse('create-movie')
        
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        mock_movie_create.assert_called_once_with(
            title='New Movie',
            release_date='2023-09-15',
            genre='Action',
            plot='A new movie plot',
            trailer_url='https://example.com/trailer',
            status='Published'
        )

    @patch('apps.user.models.UserAccount.objects.get')
    def test_unauthorized_user(self, mock_get_user):
        mock_user = MagicMock(spec=UserAccount)
        mock_user.email = 'user@gmail.com'
        mock_user.role = 'user'
        mock_user.is_staff = False
        mock_get_user.return_value = mock_user

        self.client.force_authenticate(user=mock_user)
        
        url = reverse('create-movie')
        data = {
            'title': 'New Movie',
            'release_date': '2023-09-15',
            'genre': 'Action',
            'plot': 'A new movie plot',
            'trailer_url': 'https://example.com/trailer',
            'status': 'Published'
        }
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    @patch('apps.user.models.UserAccount.objects.get')
    def test_invalid_data(self, mock_get_user):
        mock_user = MagicMock(spec=UserAccount)
        mock_user.email = 'admin@gmail.com'
        mock_user.role = 'admin'
        mock_get_user.return_value = mock_user

        self.client.force_authenticate(user=mock_user)
        
        url = reverse('create-movie')
        data = {
            'title': 'New Movie',
            'genre': 'Action',
        }
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK) # Should fail
        # self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST) # Should pass
