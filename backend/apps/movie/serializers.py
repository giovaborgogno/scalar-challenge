from rest_framework import serializers
from apps.review.models import Review
from apps.review.serializers import ReviewSerializer
from django.db.models import Avg
from .models import Movie

class MovieSerializer(serializers.ModelSerializer):
    
    # rating = serializers.SerializerMethodField()
    class Meta:
        model = Movie
        fields = "__all__"
        
        # def get_rating(self, movie):
        #     if Review.objects.filter(movie=movie).exists():
        #         avg_rating = Review.objects.filter(movie=movie).aggregate(Avg('rating'))
        #         return avg_rating['rating__avg']
        #     return None
