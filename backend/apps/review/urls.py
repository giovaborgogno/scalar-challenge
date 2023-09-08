from django.urls import path
from .views import *

urlpatterns = [
    path("list/<slug>", ListUsersReviewsView.as_view(), name='list-users-reviews'),
    path("critic-list/<slug>", ListCriticsReviewsView.as_view(), name='list-critics-reviews'),
    path("create/<slug>", PostReviewView.as_view(), name='post-review'),

]
