from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from book.serializers import Bookserializer
from rest_framework import status
from book.models import Book
from rest_framework.permissions import IsAuthenticated, AllowAny


# @api_view(['GET','POST'])
#
#
# def booklist(request):
#
#     if request.method=="GET":
#         b=Book.objects.all()
#         bok=Bookserializer(b,many=True)
#         return Response(bok.data, status=status.HTTP_200_OK)
#
#     elif (request.method == "POST"):
#         b = Bookserializer(data=request.data)  # deserialization
#         if b.is_valid():
#             b.save()
#             return Response(b.data, status=status.HTTP_201_CREATED)
#     return Response(b.errors, status=status.HTTP_400_BAD_REQUEST)
#
# @api_view(['GET', 'PUT', 'DELETE'])  # primary key based
# def bookdetails(request, pk):
#     try:
#         b = Book.objects.get(id=pk)
#     except Book.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
#
#     if request.method == "GET":
#         bok = Bookserializer(b)  # doing serialization to convert to json format data
#         return Response(bok.data, status=status.HTTP_200_OK)
#
#     elif request.method == "PUT":
#         bok = Bookserializer(b,data=request.data)
#         if bok.is_valid():
#             bok.save()
#             return Response(bok.data, status=status.HTTP_201_CREATED)
#
#     elif request.method == "DELETE":
#         b.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

from rest_framework.views import APIView
from book.models import Book
from book.serializers import Bookserializer
from django.db.models import Q
class SearchAPI(APIView):
    def get(self,request):
        query=self.request.query_params.get('search') #Reads the query from the request
        if query:
            b=Book.objects.filter(Q(title__icontains=query) | Q(author__icontains=query)|Q(language__icontains=query)) #Filter the book records from Book table
            if not b.exists():  #if query set is empty
                return Response({'msg': 'no results found'}, status=status.HTTP_200_OK)

            book=Bookserializer(b,many=True,context={"request": request})  #After serailization sends the response into Client
            return Response(book.data,status=status.HTTP_200_OK)
        else:#if search key word is none
            return Response({'msg':'no results found'},status=status.HTTP_200_OK)
#Filter by title
class Filterbytitle(APIView):
    def get(self,request):
        query=self.request.query_params.get('title') #Reads the query from the request
        if query:
            b=Book.objects.filter(title__icontains=query) #Filter the book records from Book table
            if not b.exists():  #if query set is empty
                return Response({'msg': 'no results found'}, status=status.HTTP_200_OK)

            book=Bookserializer(b,many=True)  #After serailization sends the response into Client
            return Response(book.data,status=status.HTTP_200_OK)
        else:#if search key word is none
            return Response({'msg':'no results found'},status=status.HTTP_200_OK)
#filter by price
class Filterbyprice(APIView):
    def get(self,request):
        query=self.request.query_params.get('price') #Reads the query from the request
        if query:
            b=Book.objects.filter(price__lte=query) #Filter the book records from Book table
            if not b.exists():  #if query set is empty
                return Response({'msg': 'no results found'}, status=status.HTTP_200_OK)

            book=Bookserializer(b,many=True)  #After serailization sends the response into Client
            return Response(book.data,status=status.HTTP_200_OK)
        else:#if search key word is none
            return Response({'msg':'no results found'},status=status.HTTP_200_OK)
#filter by author
class Filterbyauthor(APIView):
    def get(self,request):
        query=self.request.query_params.get('author') #Reads the query from the request
        if query:
            b=Book.objects.filter(author__icontains=query) #Filter the book records from Book table
            if not b.exists():  #if query set is empty
                return Response({'msg': 'no results found'}, status=status.HTTP_200_OK)

            book=Bookserializer(b,many=True)  #After serailization sends the response into Client
            return Response(book.data,status=status.HTTP_200_OK)
        else:#if search key word is none
            return Response({'msg':'no results found'},status=status.HTTP_200_OK)




#Register View




from rest_framework import viewsets
from django.contrib.auth.models import User
from book.serializers import UserSerializer

class UserAPI(viewsets.ModelViewSet):

    queryset = User.objects.all()

    serializer_class = UserSerializer
class BooksAPI(viewsets.ModelViewSet):
    # permission_classes=[IsAuthenticated,]
    queryset = Book.objects.all()

    serializer_class = Bookserializer


class LogoutView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request):
        self.request.user.auth_token.delete() #deletes the token assigned to already logged in user stored in Token Table
        return Response({"msg":"Logout succesfully"},status=status.HTTP_200_OK)



