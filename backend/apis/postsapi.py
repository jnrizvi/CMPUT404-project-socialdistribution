
from manager.paginate import ResultsPagination
from manager.settings import HOSTNAME
from ..models import Post
from ..serializers import PostSerializer

import requests
import json
from rest_framework.response import Response
from rest_framework import permissions, status, viewsets

class PostsViewSet(viewsets.ModelViewSet):
	"""
	This class specifies the view for all Post objects on the server that are public and local.
	"""
	# Specifies the query set on which this view can act
	queryset = Post.objects.all()
	# Specifies the permissions needed to access and modify the data
	permission_classes = [
		permissions.IsAuthenticated
	]
	# Specifies the serializer used to return the correctly formatted JSON response body
	serializer_class = PostSerializer
	# Specifies the lookup field to use the in the database
	lookup_field = 'id'

	pagination_class = ResultsPagination

	def list (self, request, *args, **kwargs):
		"""
		This method will be called when a GET request is received, listing all the posts in the database.
		"""
		self.pagination_class = ResultsPagination
		try:
			posts = Post.objects.filter(visibility="PUBLIC", author_host__icontains=HOSTNAME)
		except:
			return Response(data="No posts found", status=status.HTTP_404_NOT_FOUND)
		
		# Paginate the returned list of all public posts
		result = self.get_serializer(posts, many=True)
		paginated_serialized_result = self.paginate_queryset(result.data)

		return Response(paginated_serialized_result, status=status.HTTP_200_OK)