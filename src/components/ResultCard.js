import React from 'react'

export default function ResultCard({ results, updateName }) {

    function onClick(id, event) {
        var name = event.target.innerText;
        updateName(name, id);
    }

    return (
        <ul>
            {results.map((result) => {
                return (
                    <div key={result.id} onClick={(e) => onClick(result.id, e)} value={result.id}>
                        {result.title}
                    </div>
                )
            })}
        </ul>
    )
}