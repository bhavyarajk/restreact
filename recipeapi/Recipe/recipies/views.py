from .serializers import RecipeSerializer,ReviewSerializer,UserSerializer
from django.contrib.auth.models import User
from django.db.models import Q
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.views import APIView
from .models import Recipe,Review


class RecipeView(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer


class User_Register(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer




class Create_review(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
       u=request.user #current login user
       r=request.data['id']   #to fetch recipe id from json object received from client side
       recipe_name=Recipe.objects.get(id=r) #to fetch recipe details of particular recipe


       t=request.data['rating'] #to fetch rating from json object
       c=request.data['comment'] #to fetch comment from json object


       re=Review.objects.create(user=u,recipe_name=recipe_name,rating=t,comment=c) #creating review record
       re.save()
       rcp = ReviewSerializer(re) #converts it into json


       return Response(rcp.data,status=status.HTTP_201_CREATED) #sends the created review object


class Recipe_Search(APIView):
    def get(self,request):
        query = request.query_params.get('search')
        if query:
            r = Recipe.objects.filter(Q(recipe_name__icontains=query) | Q(recipe_ingredients__icontains=query) | Q(recipe_cuisine__icontains=query) | Q(meal_type__icontains=query))
            if not r.exists():  # if query set is empty
                return Response({'msg': 'no results found'}, status=status.HTTP_200_OK)
            rcp = RecipeSerializer(r, many=True,context={"request": request})

            return Response(rcp.data, status=status.HTTP_200_OK)
        else:
            return Response({'msg': 'no results found'},status=status.HTTP_200_OK)


class Recipe_Filter(APIView):
    def get(self,request):
        query = request.query_params.get('filter')
        if query:
            r = Recipe.objects.filter(Q(recipe_name=query)|Q(recipe_ingredients=query)|Q(recipe_cuisine=query)|Q(meal_type=query))
            rcp = RecipeSerializer(r,many=True)
            if rcp.data:
                return Response(rcp.data, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)


class Review_Filter(APIView):
    def get(self,request,pk):
        r=Recipe.objects.get(id=pk)   #Fetch the recipe object matching with pk value
        rev=Review.objects.filter(recipe_name=r) #Review details matching with Recipe object
        rcp = ReviewSerializer(rev,many=True)
        if rcp.data:
            return Response(rcp.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        request.user.auth_token.delete()
        return Response({'msg':"Logout successful"},status=status.HTTP_200_OK)
