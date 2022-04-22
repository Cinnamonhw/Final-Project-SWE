import React from 'react';
import './App.css';
const IMG_URL = "https://image.tmdb.org/t/p/w200/";

const SearchTv = ({ name, poster_path, first_air_date }) => {
    return (
        <div className="container1">
            <img className="image" src={IMG_URL + poster_path}></img>
            <b className="title">{name}</b>
            <span className="info">
                <p>tv</p>
                <span className="info">{first_air_date}</span>
            </span>
            {/* <p className="info1">{overview}</p> */}
        </div>
    )
}

export default SearchTv;