import React, { useState, useEffect } from 'react'
import './ListContent.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function MyLists({ onDeleteItem, itemId, media_id, media_type }) {

    const [media_name, setMediaName] = useState('');
    const [thumbnail, setThumbnail] = useState('');

    function deleteItemHandle() {
        onDeleteItem(itemId);
    }

    useEffect(() => {
        var url;
        if (media_type == "Movie") {
            url = "/getMovieDetails";
        } else if (media_type == "TV") {
            url = "/getTVDetails";
        } else if (media_type == "Book") {
            url = "/getBookDetails";
        }
        const postData = { "media_id": media_id };
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'applicaton/json',
            },
            body: JSON.stringify(postData),
        }).then(
            res => res.json()
        ).then(
            data => {
                if (media_type == "Movie") {
                    setMediaName(data.title)
                    setThumbnail(data.image)
                } else if (media_type == "TV") {
                    setMediaName(data.name)
                    setThumbnail("https://image.tmdb.org/t/p/w200" + data.poster_path)
                } else if (media_type == "Book") {
                    setMediaName(data.volumeInfo.title)
                    setThumbnail(data.volumeInfo.imageLinks.thumbnail)
                }
            }
        )
    }, [])

    return (
        <div className="listItem">
            <img className="image" src={thumbnail}></img>
            <b className="title">{media_name}</b>
            <div className="delete">
                <button onClick={deleteItemHandle}><FontAwesomeIcon icon={faTrash} /></button>
            </div>
        </div>
    );
}