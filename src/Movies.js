import React from 'react';
import './App.css';


const Movie = ({ title, image, year }) => {
    return (
        <div className="container1">
            <img className="image" src={image}></img>
            <b className="title">{title}</b>
            <p className="info1">{year}</p>
        </div>
    )
}

export default Movie;