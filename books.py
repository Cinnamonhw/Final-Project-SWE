from flask import jsonify
import requests
import os
from dotenv import find_dotenv, load_dotenv

load_dotenv(find_dotenv())
BASE_URL = "https://www.googleapis.com/books/v1/volumes"


def search_books(query):

    query_params = {
        "q": query,
        "pagination": "maxResults",
        "key": os.getenv("BOOKS_KEY"),
    }

    response = requests.get(BASE_URL, params=query_params)
    data = response.json()

    return jsonify(results=data["items"])


# search_books("hunger games")
