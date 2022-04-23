"""This handles Google Books API query and retrieves book details from Google Books"""
import os
from flask import jsonify
import requests
from dotenv import find_dotenv, load_dotenv

load_dotenv(find_dotenv())
BASE_URL = "https://www.googleapis.com/books/v1/volumes"


def search_books(query):
    """Returns json of book search data"""
    query_params = {
        "q": query,
        "pagination": "maxResults",
        "key": os.getenv("BOOKS_KEY"),
    }

    response = requests.get(BASE_URL, params=query_params)
    data = response.json()

    return jsonify(data)


def get_book_detail(query):
    """Returns json data of book details"""
    new_url = BASE_URL + "/" + query
    query_params = {
        "key": os.getenv("BOOKS_KEY"),
    }

    response = requests.get(new_url, params=query_params)
    data = response.json()

    return jsonify(data)


# search_books("hunger games")
