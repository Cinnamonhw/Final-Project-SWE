import React, { useState, useEffect } from 'react'
import List from './List'

export default function MyLists({ list, onDeleteList, onAddToList, onRemoveFromList }) {

    function deleteListHandle(id) {
        onDeleteList(id);
    }

    function addItemHandle(list_id, name, media_id) {
        onAddToList(list_id, name, media_id);
    }

    function deleteItemHandle(list_id, itemId) {
        onRemoveFromList(list_id, itemId);
    }

    return (
        <div>
            {list.map((item) => (
                <List key={item.id}
                    onAddItem={addItemHandle}
                    onDeleteList={deleteListHandle}
                    onDeleteItem={deleteItemHandle}
                    listId={item.id}
                    listName={item.list_name}
                    listType={item.media_type}
                    listContent={item.list_content}
                />
            ))}
        </div>
    );
}