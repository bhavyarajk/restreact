from django.db import models

class Book(models.Model):
    title=models.CharField(max_length=50)
    author=models.CharField(max_length=50)
    price=models.IntegerField()
    pages=models.IntegerField()
    language=models.CharField(max_length=50)
    image=models.ImageField(upload_to="img",blank=True)

    def __str__(self):
        return self.title
