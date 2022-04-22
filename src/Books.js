import React from 'react';
import './App.css';


const Books = ({ title, book_image, description, author }) => {
    return (
        <div className="container1">
            <img className="image" src={book_image}></img>
            <b className="title">{title}</b>
            <p className="info1">Description: {description}</p>
            <p className="info1">Author(s): {author}</p>
        </div>
    )
}

export default Books;