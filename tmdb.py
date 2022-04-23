"""This handles TMDB API query and returns tv show details from TMDB"""
import os
from flask import jsonify
import requests
from dotenv import find_dotenv, load_dotenv

load_dotenv(find_dotenv())
BASE_URL = "https://api.themoviedb.org/3/search/tv"
BASE_URL1 = "https://api.themoviedb.org/3/trending/tv/day"
BASE_URL2 = "https://api.themoviedb.org/3/tv"
PIC_URL = "https://image.tmdb.org/t/p/w200"
POSTER_SIZE = "w100"


def search_tv(query):
    """Returns json data from TMDB tv show search"""
    query_params = {
        "api_key": os.getenv("TMDB_KEY"),
        "language": "en-US",
        "query": query,
    }
    response = requests.get(BASE_URL, params=query_params)
    data = response.json()
    return jsonify(results=data["results"])


# search_tv("snowpiercer")


def get_trending():
    """Returns json data from TMDB trending tv shows"""
    new_params = {"api_key": os.getenv("TMDB_KEY")}
    response = requests.get(BASE_URL1, params=new_params)
    popular_data = response.json()
    return jsonify(popular_data)


# get_trending()


def get_tv_detail(id):
    """Returns tv show details based on tv show id"""
    new_url = BASE_URL2 + "/" + id
    query_params = {
        "api_key": os.getenv("TMDB_KEY"),
        "language": "en-US",
    }
    response = requests.get(new_url, params=query_params)
    tv_details = response.json()
    return jsonify(tv_details)
