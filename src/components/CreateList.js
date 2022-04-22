import React, { useState, useEffect } from 'react'

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
        <div>
            <p>Create New List</p>
            <label htmlFor="listName">List Name:</label>
            <input name="listName" id="listName" type="text" placeholder='List Name' onChange={listNameHandle} value={listName}></input>
            <label htmlFor="listType">List Type:</label>
            <select name="listType" id="listType" onChange={listTypeHandle} value={listType}>
                <option value="">-- Select an Option --</option>
                <option value="Book">Book</option>
                <option value="Movie">Movie</option>
                <option value="TV">TV Show</option>
            </select>
            <button type="button" onClick={addListHandle}>Submit</button>
        </div>
    );
}