import React, { useState, useEffect } from 'react'

export default function MyLists({ onDeleteItem, itemId, media_id, media_type }) {

    const [media_name, setMediaName] = useState('');

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
                } else if (media_type == "TV") {
                    setMediaName(data.name)
                } else if (media_type == "Book") {
                    setMediaName(data.volumeInfo.title)
                }
            }
        )
    }, [])

    return (
        <li>
            {media_name} - <button onClick={deleteItemHandle}>Delete Item</button>
        </li>
    );
}