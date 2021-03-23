from ..models import Author
from ..serializers import AuthorSerializer

from rest_framework.response import Response
from rest_framework import permissions, status, viewsets

class AuthorViewSet(viewsets.ModelViewSet):
	"""
	This class specifies the view for the Post objects. This will run methods to retrieve and edit DB rows and return correctly formatted HTTP responses
	"""
	# Specifies the query set on which this view can act
	queryset = Author.objects.all()

	# Specifies the permissions needed to access and modify the data
	permission_classes = [
		permissions.IsAuthenticated
	]

	# Specifies the serializer used to return the correctly formatted JSON response body
	serializer_class = AuthorSerializer

	# Specifies the lookup field to use the in the database
	lookup_field = 'id'

	def update(self, request, id=None,*args, **kwargs):
		"""
		This method will be called when a POST request is received for a specific author.
		"""

		author = Author.objects.filter(user=request.user.id).get()
		checkDisplay = Author.objects.filter(displayName=request.data["displayName"]).get()

		if checkDisplay and checkDisplay.id != author.id:
			return Response(status.HTTP_409_CONFLICT)

		if request.user.is_authenticated and author.id == id:
			author.displayName = request.data["displayName"]
			author.github = request.data["github"]
			author.save()

			return Response(self.get_serializer(author).data, status=status.HTTP_200_OK)
		else:
			return Response(status.HTTP_400_BAD_REQUEST)