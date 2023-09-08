from django.urls import path
from .views import *

urlpatterns = [
    path("list/", ListPublishedMoviesView.as_view(), name='list_published_movies'),
    path("private-list/", ListMoviesView.as_view()),
    path("change-status/<slug>", ChangeStatusMovieView.as_view()),
    path("detail/<slug>", DetailMovieView.as_view(), name='movie-detail'),
    path("update/<slug>", UpdateMovieView.as_view()),
    path("create/", PostMovieView.as_view(), name='create-movie'),
]
