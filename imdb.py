from flask import jsonify
import requests
import os
from dotenv import find_dotenv, load_dotenv


load_dotenv(find_dotenv())

BASE_URL = "https://imdb-api.com/en/API/SearchMovie"
IMDB_KEY = os.getenv("IMDB_KEY")


def search_movies(query):
    """Returns title, image, and description of movie results"""

    query_params = {
        "lang": "en",
        "apiKey": IMDB_KEY,
        "expression": query,
    }
    # Creating full url to send requests to
    full_url = BASE_URL + "/" + IMDB_KEY + "/" + query

    response = requests.get(full_url, params=query_params)
    data = response.json()

    return jsonify(results=data["results"])
