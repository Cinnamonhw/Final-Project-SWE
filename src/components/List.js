import React, { useState, useEffect } from 'react'
import ListContent from './ListContent'
import ResultCard from './ResultCard'

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

    function updateName(input) {
        var inputArr = input.split(" - ");
        var name = inputArr[0];
        var media_id = inputArr[1];
        setNewItemName(name);
        setNewMediaId(media_id);
        setResults([]);
    }

    function addItemHandle() {
        if (newItemName == '') {
            return;
        }
        onAddItem(listId, newItemName, newMediaId);
        setNewItemName('');
    }

    function deleteItemHandle(itemId) {
        onDeleteItem(listId, itemId);
    }

    return (
        <div>
            <p>{listName} - {listType}</p>
            <button onClick={deleteListHandle}>Delete List</button>
            <ul>
                {listContent.map((content) => (
                    <ListContent key={content.id}
                        onDeleteItem={deleteItemHandle}
                        itemId={content.id}
                        media_id={content.media_id}
                        media_type={listType}
                    />
                ))}
            </ul>
            <input name="itemName" id="itemName" type="text" value={newItemName} placeholder="Name" onChange={updateNameHandle}></input>
            {results.length > 0 && (
                <ResultCard results={results} updateName={updateName} />
            )}
            <button onClick={addItemHandle}>Add To List</button>
            <hr></hr>
        </div>
    );
}