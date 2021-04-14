from rest_framework import serializers

from core.models import PokemonCaptured


class PokemonCapturedSerializer(serializers.ModelSerializer):
    """Serializer for PokemonCaptured objects"""

    class Meta:
        model = PokemonCaptured
        fields = ('id', 'pokemonId', 'userId')
        read_only_fields = ('id',)