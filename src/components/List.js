import React, { useState, useEffect } from 'react'
import ListContent from './ListContent'
import ResultCard from './ResultCard'
import './List.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faAdd } from "@fortawesome/free-solid-svg-icons"

export default function List({ onAddItem, onDeleteList, onDeleteItem, listId, listName, listType, listContent }) {

    const [newItemName, setNewItemName] = useState('');
    const [newMediaId, setNewMediaId] = useState('');
    const [results, setResults] = useState([]);

    function deleteListHandle() {
        onDeleteList(listId);
    }

    function updateNameHandle(event) {
        var query = event.target.value;
        setNewItemName(query);
        if (query.length > 3) {
            var postData = { query: event.target.value };
            if (listType == "Movie") {
                fetch('/search', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postData),
                }
                ).then(
                    (res) => res.json()
                ).then(
                    (data) => {
                        if (!data.errors) {
                            var resultList = [];
                            for (var i = 0; i < data.results.length; i++) {
                                var newResult = {
                                    "title": data.results[i].title,
                                    "id": data.results[i].id
                                }
                                resultList.push(newResult);
                                if (resultList.length >= 10) {
                                    break;
                                }
                            }
                            setResults([...resultList]);
                        } else {
                            setResults([]);
                        }
                    }
                )
            } else if (listType == "TV") {
                fetch('/search1', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postData),
                }
                ).then(
                    (res) => res.json()
                ).then(
                    (data) => {
                        console.log(data)
                        var resultList = [];
                        for (var i = 0; i < data.results.length; i++) {
                            var newResult = {
                                "title": data.results[i].name,
                                "id": data.results[i].id
                            }
                            resultList.push(newResult);
                            if (resultList.length >= 10) {
                                break;
                            }
                        }
                        setResults([...resultList]);
                    }
                )
            } else if (listType == "Book") {
                fetch('/search2', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postData),
                }
                ).then(
                    (res) => res.json()
                ).then(
                    (data) => {
                        var resultList = [];
                        for (var i = 0; i < data.items.length; i++) {
                            var newResult = {
                                "title": data.items[i].volumeInfo.title,
                                "id": data.items[i].id
                            }
                            resultList.push(newResult);
                            if (resultList.length >= 10) {
                                break;
                            }
                        }
                        setResults([...resultList]);
                    }
                )
            }
        }
    }

    function updateName(name, id) {
        setNewItemName(name);
        setNewMediaId(id);
        setResults([]);
    }

    function addItemHandle() {
        if (newItemName == '' || newMediaId == '') {
            alert("Please select an item from the dropdown before adding");
            return;
        }
        onAddItem(listId, newMediaId);
        setNewItemName('');
        setNewMediaId('');
    }

    function deleteItemHandle(itemId) {
        onDeleteItem(listId, itemId);
    }

    return (
        <div className="list-contents rounded">
            <div className="flex-container center rounded-top list-title">
                <div className="list-title">
                    {listName} - {listType}
                </div>
                <div>
                    <button onClick={deleteListHandle}><FontAwesomeIcon icon={faTrash} /></button>
                </div>
            </div>
            <div className="header flex-container">
                <div className="flex-child-input">
                    <div className="flex-container">
                        <div className="dd-wrapper flex-child-list">
                            <div className="dd-header">
                                <input name="itemName" id="itemName" type="text" className="input" value={newItemName} placeholder={"Search for " + listType + " Title"} onChange={updateNameHandle} autoComplete="off"></input>
                            </div>
                            <div className="dd-list">
                                {results.length > 0 && (
                                    <ResultCard results={results} updateName={updateName} />
                                )}
                            </div>
                        </div>
                        <button className="flex-child-add" onClick={addItemHandle}><FontAwesomeIcon icon={faAdd} /></button>
                    </div>
                </div>
            </div>
            <div className="content rounded">
                {listContent.map((content) => (
                    <ListContent key={content.id}
                        onDeleteItem={deleteItemHandle}
                        itemId={content.id}
                        media_id={content.media_id}
                        media_type={listType}
                    />
                ))}
            </div>
        </div>
    );
}