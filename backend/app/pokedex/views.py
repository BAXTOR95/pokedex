from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, mixins, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from core.models import PokemonCaptured

from pokedex import serializers


class PokemonCapturedViewSet(viewsets.GenericViewSet,
                             mixins.ListModelMixin,
                             mixins.CreateModelMixin):
    """Manage pokemons captured in the database"""
    queryset = PokemonCaptured.objects.all()
    serializer_class = serializers.PokemonCapturedSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Retrieve the captured pokemons for the authenticated user"""
        user = self.request.user
        return PokemonCaptured.objects.filter(user=user)

    def get_serializer_class(self):
        """Return appropriate serializer class"""
        return self.serializer_class

    def perform_create(self, serializer):
        """Create a new pokemon captured"""
        serializer.save(user=self.request.user)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()
