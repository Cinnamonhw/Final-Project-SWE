import React, { useState, useEffect } from 'react';
// import Searchbar from '../SearchBar';
import { Link } from "react-router-dom";
import { IoIosSearch, IoMdReturnRight } from 'react-icons/io';
import SearchResults from '../SearchResults';
import SearchTv from '../SearchTv';
import Logout from './Logout';
// import SearchBooks from '../SearchBooks';
import './components.css'


export default function Search() {
    const [data, setData] = useState([]);
    const [tv, setTv] = useState([]);
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");

    function handleChange(e) {
        setSearch(e.target.value)
        console.log(search)
    }

    function sendQuery() {
        console.log(search)
        var postData = { query: search }
        fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        }).then(
            res => res.json()
        ).then(
            data => {
                setData(data.results)
                console.log(data)
            }
        )
        fetch('/search1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        }).then(
            res1 => res1.json()
        ).then(
            data1 => {
                setTv(data1.results)
                console.log(data1)
            }
        )
        fetch('/search2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        }).then(
            res1 => res1.json()
        ).then(
            data2 => {
                setBooks(data2.items)
                console.log(data2.items)
            }
        )
    }

    return (
        <main className="main" style={{ padding: "1rem 0" }}>
            <header
                style={{
                    color: '#6765c7',
                }}
            >
                <div class="logout">
                    <Logout />
                </div>
                <h1>
                    PersonalPix
                </h1>
            </header>
            <nav id="navbar"
                style={{
                    color: '#6765c7',
                    border: "solid 10px",
                    padding: "10px",
                }}
            >
                <Link className="Home" to="/home">Home</Link> |{" "}
                <Link to="/trending_page">Trending</Link> |{" "}
                <Link className="MyList" to="/mylist">My Lists</Link> |{" "}
                <Link className="Profile" to="/profile">Profile</Link> |{" "}
                {/* <form className="search"> */}
                <Link to="/contactForm">Contact Form</Link > | {" "}
                <input type="text" placeholder="Search" onChange={handleChange}></input>
                <button type="button" onClick={() => sendQuery()}><IoIosSearch /></button>
                {/* </form> */}

            </nav>
            <div className="trending">
                {data.map((searchRes) =>
                    <SearchResults key={searchRes.id} {...searchRes} />)}
            </div>
            <div className="trending">
                {tv.map((searchTv) =>
                    <SearchTv key={searchTv.id} {...searchTv} />)}
            </div>
            <div className="trending">
                {books.map(searchBooks => (
                    <div className="container1">
                        {typeof searchBooks.volumeInfo.imageLinks != "undefined" && <img className="image" src={searchBooks.volumeInfo.imageLinks.thumbnail} alt={searchBooks.title} />}
                        <b className="title">{searchBooks.volumeInfo.title}</b>
                        <p className="info1">{searchBooks.volumeInfo.subtitle}</p>
                        <p className="info1">{searchBooks.volumeInfo.authors}</p>
                    </div>
                ))}
            </div>
        </main >
    );
}