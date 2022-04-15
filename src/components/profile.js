import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";

export default function Profile() {
    const [data, setData] = useState({})
    const [search, setSearch] = useState("");

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
        })
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
        <main style={{ padding: "1rem 0" }}>
            <header
                style={{
                    color: '#7373E3',
                }}
            >
                <h1>PersonalPix</h1>
            </header>
            <nav id="navbar"
                style={{
                    color: '#7373E3',
                    border: "solid 10px",
                    padding: "10px",
                }}
            >
                <Link to="/home">Home</Link> |{" "}
                <Link to="/mylist">My List</Link> |{" "}
                <Link to="/profile">Profile</Link>
                <input type="text" placeholder="Search" onChange={handleChange}></input>
                <button type="button" onClick={() => sendQuery()}><IoIosSearch /></button>

            </nav>
        </main>
    );
}