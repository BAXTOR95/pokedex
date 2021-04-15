import datetime

from rest_framework import generics, permissions, status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.settings import api_settings
from rest_framework.response import Response

from django.conf import settings
from django.utils import timezone

from user.serializers import UserSerializer, AuthTokenSerializer
from user.authentication import ExpiringTokenAuthentication

EXPIRE_HOURS = getattr(settings, 'REST_FRAMEWORK_TOKEN_EXPIRE_HOURS', 24)


class CreateUserView(generics.CreateAPIView):
    """Create a new user in the system"""
    serializer_class = UserSerializer

    def post(self, request, **kwargs):

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            user = serializer.create(
                validated_data=serializer.validated_data)

            return Response({'idToken': user.auth_token.key,
                             'created': user.auth_token.created,
                             'expiresIn': user.expiresIn,
                             'email': user.email,
                             'localId': user.localId,
                             'is_active': user.is_active,
                             'is_superuser': user.is_superuser})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CreateTokenView(ObtainAuthToken):
    """Create a new auth token for user"""
    serializer_class = AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES


class CreateExpiringTokenView(ObtainAuthToken):
    """Create a new auth token for user"""
    serializer_class = AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES

    def post(self, request, **kwargs):

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data['user']

            token, created = Token.objects.get_or_create(
                user=user)

            yesterday = (timezone.now() -
                         datetime.timedelta(hours=EXPIRE_HOURS))

            if not created and token.created < yesterday:
                token.delete()
                token = Token.objects.create(
                    user=serializer.validated_data['user'])
                # token[0]['created'] = datetime.datetime.utcnow().replace(
                #     tzinfo=timezone.utc)
                token.save()

            return Response({'idToken': token.key,
                             'created': token.created,
                             'expiresIn': token.created - yesterday,
                             'email': user.email,
                             'localId': user.localId,
                             'is_active': user.is_active,
                             'is_superuser': user.is_superuser})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ManageUserView(generics.RetrieveUpdateAPIView):
    """Manage the authenticated user"""
    serializer_class = UserSerializer
    authentication_classes = (ExpiringTokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        """Retrieve and return authenticated user"""
        return self.request.user
