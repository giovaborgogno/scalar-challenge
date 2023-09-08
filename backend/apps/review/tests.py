from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from django.urls import reverse, resolve
from apps.user.models import UserAccount
from apps.movie.models import Movie
from apps.movie.serializers import MovieSerializer
from apps.review.models import *

class ListCriticsReviewsViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.movie = Movie.objects.create(title='Movie 1', slug='movie-1')
        self.user = UserAccount.objects.create(email='user@example.com', password='password', role='critic')
        self.review = Review.objects.create(user=self.user, movie=self.movie, rating=4, comment='Good movie')

    def test_list_critics_reviews(self):
        url = reverse('list-critics-reviews', args=[self.movie.slug])
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['comment'], 'Good movie')

    def test_list_critics_reviews_invalid_movie_slug(self):
        url = reverse('list-critics-reviews', args=['invalid-slug'])
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

class ListUsersReviewsViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.movie = Movie.objects.create(title='Movie 1', slug='movie-1')
        self.user = UserAccount.objects.create(email='user@example.com', password='password', role='user')
        self.review = Review.objects.create(user=self.user, movie=self.movie, rating=4, comment='Good movie')

    def test_list_users_reviews(self):
        url = reverse('list-users-reviews', args=[self.movie.slug])
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['comment'], 'Good movie')

    def test_list_users_reviews_invalid_movie_slug(self):
        url = reverse('list-users-reviews', args=['invalid-slug'])
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

class PostReviewViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.movie = Movie.objects.create(title='Movie 1', slug='movie-1', status='Publish')
        self.movie_draft = Movie.objects.create(title='Movie 2', slug='movie-2', status='Draft')
        self.user = UserAccount.objects.create(email='user@example.com', password='password', role='user')
        self.critic = UserAccount.objects.create(email='critic@example.com', password='password', role='critic')
        
    def test_post_review_forbidden(self):
        self.client.force_authenticate(user=self.user)
        url = reverse('post-review', args=[self.movie_draft.slug])
        data = {'rating': 4.0, 'comment': 'Good movie'}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_post_review(self):
        self.client.force_authenticate(user=self.user)
        url = reverse('post-review', args=[self.movie.slug])
        data = {'rating': 4.0, 'comment': 'Good movie'}
        data_2 = {'rating': 3.0, 'comment': 'Good movie'}
        response = self.client.post(url, data, format='json')
        response = self.client.post(url, data_2, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Review.objects.count(), 2)
        self.assertEqual(response.data['results']['movie']['users_rating'], '3.5')
        self.assertEqual(Movie.objects.get(slug=self.movie.slug).users_rating, 3.5)

    def test_post_review_invalid_movie_slug(self):
        self.client.force_authenticate(user=self.user)
        url = reverse('post-review', args=['invalid-slug'])
        data = {'rating': 4, 'comment': 'Good movie'}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Review.objects.count(), 0)

    def test_post_review_unauthenticated_user(self):
        url = reverse('post-review', args=[self.movie.slug])
        data = {'rating': 4, 'comment': 'Good movie'}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(Review.objects.count(), 0)

    def test_post_review_by_critic(self):
        self.client.force_authenticate(user=self.critic)
        url = reverse('post-review', args=[self.movie.slug])
        data = {'rating': 4, 'comment': 'Good movie'}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Review.objects.count(), 1)
        self.assertEqual(response.data['results']['movie']['rating'], '4.0')
        self.assertEqual(Movie.objects.get(slug=self.movie.slug).rating, 4.0)
