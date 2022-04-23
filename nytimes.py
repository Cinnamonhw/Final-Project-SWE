"""This handles NY Times Book API"""
import os
from flask import jsonify
import requests
from dotenv import find_dotenv, load_dotenv

load_dotenv(find_dotenv())
NY_KEY = os.getenv("NY_KEY")

BASE_URL = "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json"


def get_best_sellers():
    """Returns json data on current best sellers"""
    query_params = {
        "list": "hardcover-fiction",
        "api-key": NY_KEY,
    }
    response = requests.get(BASE_URL, params=query_params)
    best_sellers = response.json()
    return jsonify(best_sellers)


# get_best_sellers()
