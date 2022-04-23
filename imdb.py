"""This handles IMDB API query and returns movie details"""
import os
from flask import jsonify
import requests
from dotenv import find_dotenv, load_dotenv


load_dotenv(find_dotenv())

BASE_URL = "https://imdb-api.com/en/API/SearchMovie"
BASE_URL2 = "https://imdb-api.com/en/API/MostPopularMovies"
BASE_URL3 = "https://imdb-api.com/en/API/Title"
IMDB_KEY = os.getenv("IMDB_KEY")


def search_movies(query):
    """Returns json data from movie search"""

    query_params = {
        "lang": "en",
        "apiKey": IMDB_KEY,
        "expression": query,
    }
    # Creating full url to send requests to
    full_url = BASE_URL + "/" + IMDB_KEY + "/" + query

    response = requests.get(full_url, params=query_params)
    data = response.json()
    # print(data)

    return jsonify(data)


# search_movies("spiderman")


def get_trending_movies():
    """Returns json data of trending movies"""
    new_params = {
        "lang": "en",
        "apiKey": IMDB_KEY,
    }
    new_url = BASE_URL2 + "/" + IMDB_KEY
    # print(new_url)
    response = requests.get(new_url, params=new_params)
    trending_movies = response.json()

    return jsonify(trending_movies)


def get_movie_detail(id):
    """Returns json data of movie details"""
    new_url = BASE_URL3 + "/" + IMDB_KEY + "/" + id
    response = requests.get(new_url)
    movie_details = response.json()

    return jsonify(movie_details)
