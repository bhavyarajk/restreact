from django.urls import path,include
from . import views
from rest_framework.routers import SimpleRouter
from rest_framework.authtoken import views as views2

app_name = "recipies"

#Viewset
router = SimpleRouter()
router.register('recipe',views.RecipeView)
router.register('users',views.User_Register)
# router.register('review',views.ReviewView)

urlpatterns = [
    path('', include(router.urls)),

    path('recipe_search', views.Recipe_Search.as_view(), name='recipe_search'),
    path('recipe_filter', views.Recipe_Filter.as_view(), name='recipe_filter'),
    path('review_filter/<int:pk>', views.Review_Filter.as_view(), name='review_filter'),
    path('login/', views2.obtain_auth_token),
    path('create/',views.Create_review.as_view()),
    path('logout', views.LogoutView.as_view(), name='logout'),

]