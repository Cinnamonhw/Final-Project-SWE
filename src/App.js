import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import Login from './components/Login';
import './Login.css';
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
        <div>
            <div class="box">
                <h1>Personalpix</h1>

                <h2>Login with:</h2>
                <Login />
            </div>
        </div>
    )
}

export default App
