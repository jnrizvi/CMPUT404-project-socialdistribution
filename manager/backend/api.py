from backend.models import Author
from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response
from .serializers import AuthorSerializer, RegisterSerializer, UserSerializer, LoginSerializer
from rest_framework.authtoken.models import Token

# Get Author API
class AuthorViewSet(viewsets.ModelViewSet):
    
    queryset = Author.objects.all()

    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = AuthorSerializer

    lookup_field = 'id'

# Register API
class RegisterAPI(generics.GenericAPIView):
  serializer_class = RegisterSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    token = Token.objects.create(user=user)
    userData = UserSerializer(user, context=self.get_serializer_context()).data
    return Response({
      "user": userData
    })

# Login API
class LoginAPI(generics.GenericAPIView):
  serializer_class = LoginSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data
    token = Token.objects.get_or_create(user=user)
    print(token.Token)
    return Response({
      "user": UserSerializer(user, context=self.get_serializer_context()).data,
      "token": token
    })