import React from 'react';
import './App.css';


const SearchBooks = ({ volumeInfo }) => {
    return (
        <div>
            <h1>{volumeInfo}</h1>
            {/* <img className="movie_image" src={imageLinks.thumbnail}></img> */}
            {/* <p>{description}</p> */}
        </div>
    )
}

export default SearchBooks;