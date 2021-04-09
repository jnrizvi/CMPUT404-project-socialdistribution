from rest_framework import status
from rest_framework.response import Response
from manager.settings import HOSTNAME
from .models import Author, Node, Post
from .serializers import PostSerializer

import json


def get_author_by_ID(request, author_id, label):
	"""
	This function takes a request object and author ID as parameters, it will check if the author is in our database and add the author if it is not. Returns the author object and a boolean representing if it is local or remote.
	"""

	# Decode the request body and load into a json
	body = json.loads(request.body.decode('utf-8'))

	# Check if the foreign ID exists in the database, if not add that Author to our database
	try:
		author = Author.objects.filter(id=author_id).get()

		if HOSTNAME in author.host :
			return author, True
		else:
			return author, False
	except Exception as e:
		print(e)
		node = Node.objects.filter(host=body[label]["host"]).get()

		author = Author(
			id = author_id,
			user = node.user,
			displayName = body[label]["displayName"],
			github = body[label]["github"],
			host = body[label]["host"],
			url = body[label]["url"]
		)
		author.save()
		return author, False


def add_post(request, author,id=None):

	body = json.loads(request.body.decode('utf-8'))

	try:
		post = Post.objects.filter(id=id).get()
		return post, PostSerializer(post, remove_fields={'size'}).data, True
	except:
		pass

	if id:
		post = Post(
			id = id,
			author = author,
			title = body["title"],
			host = HOSTNAME,
			origin = body["origin"],
			description = body["description"],
			contentType = body["contentType"],
			categories = body["categories"],
			visibility = body["visibility"],
			unlisted = body["unlisted"]
		)
	else:
		post = Post(
			author = author,
			title = body["title"],
			host = HOSTNAME,
			description = body["description"],
			contentType = body["contentType"],
			categories = body["categories"],
			visibility = body["visibility"],
			unlisted = body["unlisted"]
		)

	if any([types in body["contentType"] for types in ['application/base64', 'image/png', 'image/jpeg']]):
		post.image_content = body["content"]
	# If the post does not contain image content
	else:
		post.content = body["content"]

	post.save()

	return post, PostSerializer(post, remove_fields={'size'}).data, False