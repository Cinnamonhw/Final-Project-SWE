import React from 'react';
import './App.css';


const SearchResults = ({ title, image, description }) => {
    return (
        <div className="container1">
            <img className="image" src={image}></img>
            <b className="title">{title}</b>
            <p className="info1">{description}</p>
        </div>
    )
}

export default SearchResults;