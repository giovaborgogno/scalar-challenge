from rest_framework import serializers
from .models import *
from apps.user.serializers import UserCreateSerializer


class ReviewSerializer(serializers.ModelSerializer):
    user = UserCreateSerializer()

    class Meta:
        model = Review
        fields = [
            "id",
            "user",
            "rating",
            "comment",
            "date_created",
        ]