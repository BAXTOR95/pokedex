from django.urls import path, include
from rest_framework.routers import DefaultRouter

from pokedex import views

router = DefaultRouter()
router.register('captured_pokemons', views.PokemonCapturedViewSet)

app_name = 'pokedex'

urlpatterns = [
    path('', include(router.urls))
]
