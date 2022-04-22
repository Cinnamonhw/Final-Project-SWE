import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Searchbar from '../SearchBar';
import Logout from './Logout';
import CreateList from './CreateList';
import SharedLists from './SharedLists';
import MyLists from './MyLists';

export default function MyList() {

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    const [myLists, setMyLists] = useState([]);
    const [sharedLists, setSharedLists] = useState([]);

    useEffect(() => {
        const user_id = getCookie("user_id");
        const postData = { user_id: user_id };
        fetch("/getMyLists", {
            method: 'POST',
            headers: {
                'Content-Type': 'applicaton/json',
            },
            body: JSON.stringify(postData),
        }).then(
            res => res.json()
        ).then(
            data => {
                console.log(data)
                setMyLists([...data])
            }
        )
    }, [])

    // useEffect(() => {
    //     fetch("/getSharedLists")
    //         .then((res) => res.json())
    //         .then(data => {
    //             console.log(data);
    //             setSharedLists(data.results);
    //         })
    // }, [])



    function addListHandle(name, type) {
        var newList = {
            "id": 0,
            "list_name": name,
            "media_type": type,
            "list_content": []
        }
        const user_id = getCookie("user_id");
        var postData = {
            "user_id": user_id,
            "listName": name,
            "listType": type,
        }
        fetch("/addNewList", {
            method: 'POST',
            headers: {
                'Content-Type': 'applicaton/json',
            },
            body: JSON.stringify(postData),
        }).then(
            res => res.json()
        ).then(
            data => {
                newList["id"] = data;
                setMyLists([...myLists, newList]);
            }
        )
    }

    function deleteListHandle(id) {
        var list = myLists;
        for (var i = 0; i < list.length; i++) {
            if (list[i].id == id) {
                list.splice(i, 1);
                break;
            }
        }
        setMyLists([...list]);
    }

    function addToListHandle(list_id, name, media_id) {
        var newItem = {
            "id": -1,
            "name": name,
            "media_id": media_id,
        };

        var postData = {
            "list_id": list_id,
            "media_id": media_id,
        }
        fetch("/addNewItem", {
            method: 'POST',
            headers: {
                'Content-Type': 'applicaton/json',
            },
            body: JSON.stringify(postData),
        }).then(
            res => res.json()
        ).then(
            data => {
                if (data != -1) {
                    var list = myLists;
                    newItem["id"] = data
                    for (var i = 0; i < list.length; i++) {
                        if (list[i].id == list_id) {
                            list[i].list_content.push(newItem);
                        }
                    }
                    console.log(list)
                    setMyLists([...list]);
                }
            }
        )
    }

    function removeFromListHandle(list_id, content_id) {
        var list = myLists;
        var found = false;
        for (var i = 0; i < list.length; i++) {
            if (list[i].id == list_id) {
                for (var j = 0; j < list[i].list_content.length; j++) {
                    if (list[i].list_content[j].id == content_id) {
                        list[i].list_content.splice(j, 1)
                        found = true;
                        break;
                    }
                }
            }
            if (found) {
                break;
            }
        }

        setMyLists([...list]);
    }

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
            {typeof myLists == "undefined" && <p>Your list is empty</p>}
            <CreateList onAdd={addListHandle} />
            {typeof myLists != "undefined" && <MyLists list={myLists}
                onDeleteList={deleteListHandle}
                onAddToList={addToListHandle}
                onRemoveFromList={removeFromListHandle} />}
            {/* {typeof sharedLists == "undefined" && <p>Your list is empty</p>}
            {typeof sharedLists != "undefined" && <SharedLists list={sharedLists} />} */}
        </main >

    );
}