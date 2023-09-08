from django.urls import path
from .views import *

urlpatterns = [
    path("partial-update-user/<userId>", PartialUpdateUserView.as_view()),

]
