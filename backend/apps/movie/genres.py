from django.db import models


class Genres(models.TextChoices):
    Action = 'Action'
    Comedy = 'Comedy'
    Drama = 'Drama'
    Fantasy = 'Fantasy'
    Horror = 'Horror'
    Mystery = 'Mystery'
    Romance = 'Romance'
    Thriller = 'Thriller'
    Western = 'Western'
    Crime = 'Crime'
    Disaster = 'Disaster'
    Psychological = 'Psychological'
    Techno = 'Techno'