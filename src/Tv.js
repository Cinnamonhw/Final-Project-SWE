import React from 'react';
import './App.css';
const IMG_URL = "https://image.tmdb.org/t/p/w200/";


const Tv = ({ name, poster_path, media_type, first_air_date }) => {
    return (
        <div className="container1">
            <img className="movie_image" src={IMG_URL + poster_path}></img>
            <b className="title">{name}</b>
            <span className="info">
                {media_type}
                <span className="info">{first_air_date}</span>
            </span>

        </div>
    )
}

export default Tv;