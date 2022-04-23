import React, { useState, useEffect } from 'react'
import './CreateList.css'

export default function CreateList({ onAdd }) {

    const [listName, setListName] = useState('');
    const [listType, setListType] = useState('');

    function listNameHandle(event) {
        setListName(event.target.value);
    }

    function listTypeHandle(event) {
        setListType(event.target.value);
    }

    function addListHandle() {
        onAdd(listName, listType);
        setListName('');
        setListType('');
    }

    return (
        <div className="create-list rounded">
            <div className="text-center">
                <h2>Create New List</h2>
            </div>
            <div className="flex-container center">
                <div className="pad-right">
                    <label htmlFor="listName">List Name:</label>
                    <input name="listName" id="listName" type="text" placeholder='List Name' onChange={listNameHandle} value={listName}></input>
                </div>
                <div className="pad-left">
                    <label htmlFor="listType">List Type:</label>
                    <select name="listType" id="listType" onChange={listTypeHandle} value={listType}>
                        <option value="">-- Select an Option --</option>
                        <option value="Book">Book</option>
                        <option value="Movie">Movie</option>
                        <option value="TV">TV Show</option>
                    </select>
                    <button type="button" onClick={addListHandle}>Add</button>
                </div>
            </div>
        </div>
    );
}