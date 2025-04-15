from rest_framework import serializers
from.models import Recipe, Review
from django.contrib.auth.models import User


class RecipeSerializer (serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField('get_image_url')
    image=serializers.ImageField(required=False)
    class Meta:
        model=Recipe
        fields=['id', 'recipe_name', 'recipe_ingredients', 'instructions', 'recipe_cuisine', 'meal_type','image','image_url']

    def get_image_url(self, obj):
        request = self.context.get('request')
        photo_url = obj.image.url
        return request.build_absolute_uri(photo_url)


    



class ReviewSerializer (serializers. ModelSerializer):
    name = serializers.SerializerMethodField('get_user') #to send username with json data
    recipe = serializers.SerializerMethodField('get_recipe')#to send recipe name with json data
    date=serializers.SerializerMethodField('get_date') #to send review date with json data
    class Meta:
        model=Review
        fields=['recipe_name', 'user', 'rating', 'comment','created','recipe','name','date']

    def get_user(self,obj):
        return obj.user.username
    def get_recipe(self,obj):
        return obj.recipe_name.recipe_name
    def get_date(self,obj):
        return obj.created.date()


class UserSerializer(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True)
    class Meta:
        model=User
        fields=['id', 'username', 'password']

    def create(self, validate_data):
        user=User.objects.create_user (username=validate_data['username'], password=validate_data['password'])
        user.save()
        return user