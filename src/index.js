import React from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Search from "./components/search";
import Home from "./components/home";
import MyList from "./components/mylist";
import Profile from "./components/profile";

import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './components/Login';
import ContactUs from './components/contactForm';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/mylist" element={<MyList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contactForm" element={<ContactUs />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
