import './App.css';
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { useState, useEffect } from 'react';
import Login from './components/Login';

function App() {
  const [data, setData] = useState({})
  const [search, setSearch] = useState("");


  useEffect(() => {
    fetch("/endpoint").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])


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
    <div className="App">
      <header className="App-header">
        <h1>PersonalPix</h1>
        <navbar id="navbar">
          <Link to="/home">Home</Link> |{" "}
          <Link to="/mylist">My List</Link> |{" "}
          <Link to="/profile">Profile</Link>
          <input type="text" placeholder="Search" onChange={handleChange}></input>
          <button type="button" onClick={() => sendQuery()}><IoIosSearch /></button>
        </navbar>
        <Login />
        {(typeof data.names === 'undefined') ? (
          <p>Loading...</p>
        ) : (
          data.names.map((nam, i) => (
            <p key={i}>{nam}</p>
          ))
        )}
      </header>
    </div>
  );
}



export default App;
