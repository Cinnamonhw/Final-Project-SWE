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

    return jsonify(data)


def get_book_detail(query):
    new_url = BASE_URL + "/" + query
    query_params = {
        "key": os.getenv("BOOKS_KEY"),
    }

    response = requests.get(new_url, params=query_params)
    data = response.json()

    return jsonify(data)
