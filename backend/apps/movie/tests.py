from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from apps.movie.models import Movie
from apps.user.models import UserAccount  # Asegúrate de importar tu modelo de usuario

class ListPublishedMoviesViewTest(APITestCase):
    def setUp(self):
        # Crea un usuario de ejemplo con el rol adecuado
        self.user = UserAccount.objects.create(email='critic@gmail.com', role='critic')
        self.movie = Movie.objects.create(title='Movie Title', status='Published')

    def test_list_published_movies(self):
        # Inicia sesión como el usuario crítico
        self.client.force_authenticate(user=self.user)
        
        url = reverse('list_published_movies')
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['title'], 'Movie Title 2')
        # self.assertEqual(response.data['results'][0]['title'], 'Movie Title')


class DetailMovieViewTest(APITestCase):
    def setUp(self):
        self.movie = Movie.objects.create(title='Movie Title', status='Published')

    def test_get_movie_detail(self):
        url = reverse('movie-detail', kwargs={'slug': self.movie.slug})
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results']['movie']['title'], 'Movie Title')

    def test_invalid_movie_slug(self):
        url = reverse('movie-detail', kwargs={'slug': 'invalid-slug'})
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

class PostMovieViewTest(APITestCase):
    def setUp(self):
        self.user = UserAccount.objects.create(email='admin@gmail.com', role='admin')

    def test_create_movie(self):
        self.client.force_authenticate(user=self.user)
        
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

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Movie.objects.count(), 1)
        self.assertEqual(Movie.objects.get().title, 'New Movie')

    def test_unauthorized_user(self):
        self.client.force_authenticate(user=UserAccount.objects.create(email='user@gmail.com', role='user'))
        
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

    def test_invalid_data(self):
        self.client.force_authenticate(user=self.user)
        
        url = reverse('create-movie')
        data = {
            'title': 'New Movie',
            'genre': 'Action',  # Faltan campos requeridos
        }
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
