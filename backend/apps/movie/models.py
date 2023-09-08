from django.db import models
from django.utils.timezone import now
from django.utils.text import slugify
from .genres import Genres

class Movie(models.Model):
    title = models.CharField(max_length=255, blank=True, null=True)
    slug = models.SlugField(unique=True, blank=True, null=True)
    release_date = models.DateField(default=now)
    genre = models.CharField(
        max_length=255, choices=Genres.choices)
    plot = models.TextField()
    trailer_url = models.CharField(max_length=255, blank=True, null=True)
    status = models.CharField(
        max_length=255, choices=(
            ("Draft", "Draft"),
            ("Published", "Published"),
        ), default='Draft')
    rating = models.DecimalField(max_digits=2, decimal_places=1, blank=True, null=True)
    users_rating = models.DecimalField(max_digits=2, decimal_places=1, blank=True, null=True)



    def save(self, *args, **kwargs):
        if not self.slug or self.slug == '':
            if not Movie.objects.filter(title=self.title).exists():
                self.slug = slugify(self.title)
            else:
                # super(Movie, self).save(*args, **kwargs)
                count = Movie.objects.filter(title=self.title).count()
                self.slug = slugify(self.title +'-'+ str(count + 1))
        super(Movie, self).save(*args, **kwargs)
        

    def __str__(self):
        return self.title