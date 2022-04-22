import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import Login from './components/Login';
import './Login.css';
// import Searchbar from '../SearchBar';
import Logout from './components/Logout';
import CreateList from './components/CreateList';
import MyLists from './components/MyLists';

function App() {
    const [data, setData] = useState({})
    const [search, setSearch] = useState("");

    useEffect(() => {
        // fetch("/localhost:3000/endpoint").then(
        fetch("/endpoint").then(
            res => res.json()
        ).then(
            data => {
                setData(data)
                console.log(data)
            }
        )
    }, [])


    return (
        <main className="main" style={{ padding: "1rem 0" }}>
        <header
            style={{
                color: '#6765c7',
            }}
        >
            <div className="logout">
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
            <Link to="/mylist">My Lists</Link> | {" "}
            < Link to="/profile" > Profile</Link > | {" "}
            < Link to="/contactForm" > Contact Form</Link > | {" "}
            <Link to="/search">Search</Link>

        </nav >
         <div>
            <div class="box">
                <h1>Personalpix</h1>

                <h2>Login with:</h2>
                <Login />
            </div>
        </div>
    </main >
       
    )
}

export default App
