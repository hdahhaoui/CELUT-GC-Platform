from django.db import models

class Internship(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    start_date = models.DateField()

    def __str__(self):
        return self.title
