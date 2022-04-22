import React from 'react';
import { useState } from 'react';
import { IoIosSearch } from "react-icons/io";

function Searchbar(props) {
    const [query, setQuery] = useState(props.query || '');
    const [data, setData] = useState({});
    const [search, setSearch] = useState("");

    // function submit(e) {
    //     console.log(search)
    //     if (typeof props.search === 'function') {
    //         props.search(search);
    //         sendQuery();
    //     }
    // }

    function handleChange(e) {
        setSearch(e.target.value)
        console.log(search)
    }

    function sendQuery() {
        console.log(search)
        var postData = { query: search }
        Promise.all([fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        }),
        fetch('/search1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        }),
        fetch('/search2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        }),
        ]).then(function (responses) {
            return Promise.all(responses.map(function (response) {
                return response.json()
            }));
        }).then(
            data => {
                setData(data)
                console.log(data)
            }
        )
    }
    return (
        <div>
            <input type="text" placeholder="Search" onChange={handleChange}></input>
            <button type="button" onClick={() => sendQuery()}><IoIosSearch /></button>
        </div>

    )
}


export default Searchbar;