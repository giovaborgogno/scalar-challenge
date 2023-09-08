from django.db import models
from django.utils.timezone import now
from django.conf import settings
from apps.movie.models import Movie

User = settings.AUTH_USER_MODEL

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, blank=True)
    rating = models.DecimalField(max_digits=2, decimal_places=1)
    comment = models.TextField()
    date_created = models.DateTimeField(default=now)

    def __str__(self):
        return self.comment