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


    return (
        <main>
            <div className="hero-image">
                <div className="text">
                    <p className="icons">Welcome To PersonalPix</p>
                    <p className="icons">A multi-media tracking app</p>
                    <div className="button">
                        <a href="/trending_page"><button>Go to App!</button></a>
                    </div>
                </div>
            </div>
            <div className="function">
                <div className="child">
                    <b>Functionality:</b>
                    <p>This app gives users the ability to explore/search through movies, books, and tv shows in order to find media that caters to them.
                        Users can create a profile in order to store lists of their choices. Users can then share these lists of content to other people
                        outside of the app.
                    </p>
                </div>
                <div>
                    <b>Why it matters?</b>
                    <p>This app is different from other apps because it gives users the ability to search multiple media streams from the same app.
                        This provides ease of convience for our users.
                    </p>
                </div>
                <div>
                    <b>Creators:</b>
                    <p>Sung Kim, Alani Wight, Lornah Okoth, Brianna Hill</p>
                </div>
            </div>

        </main>


    );
}