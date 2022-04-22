import Logout from './Logout';
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import Tv from '../Tv';
import Movie from '../Movies';
import Books from '../Books';
import Searchbar from '../SearchBar';
import './components.css';

export default function Home() {
    const [content, setContent] = useState([]);
    const [movies, setMovies] = useState([]);
    const [books, setBooks] = useState([]);
    // const navigate = useNavigate()

    // function search(query) {
    //     const urlEncodedQuery = encodeURI(query);
    //     navigate('/search');
    // }


    useEffect(() => {
        fetch("/trending")
            .then((res) => res.json())
            .then(data => {
                console.log(data);
                setContent(data.results);
            })
    }, [])

    useEffect(() => {
        fetch("/trendingMovies")
            .then((res) => res.json())
            .then(data => {
                console.log(data);
                setMovies(data.items);
            })
    }, [])

    useEffect(() => {
        fetch("/bestSellers")
            .then((res) => res.json())
            .then(data => {
                console.log(data);
                setBooks(data.results.books);
            })
    }, [])

    return (
        <main className="main" style={{ padding: "1rem 0" }}>
            {/* // <main> */}
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
                <Link to="/home">Home</Link> |{" "}
                <Link to="/trending_page">Trending</Link> |{" "}
                <Link to="/mylist">My Lists</Link> |{" "}
                <Link to="/profile">Profile</Link> |{" "}
                <Link to="/contactForm">Contact Form</Link> |{" "}
                <Link to="/search">Search</Link>
                {/* <Searchbar search={search} /> */}
            </nav >
            <div>
                <p className="pageTitle">Trending</p>
            </div>
            <div className="trending">
                {movies.map((movieReq) =>
                    <Movie key={movieReq.id} {...movieReq} />)}
            </div>
            <div className="trending">
                {content.map((tvReq) =>
                    <Tv key={tvReq.id} {...tvReq} />)}
            </div>
            <div className="trending">
                {books.map((bookReq) =>
                    <Books key={bookReq.rank} {...bookReq} />)}
            </div>
        </main >
    );
}