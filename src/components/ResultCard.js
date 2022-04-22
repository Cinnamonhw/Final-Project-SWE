import React from 'react'

export default function ResultCard({ results, updateName }) {

    function onClick(event) {
        var input = event.target.innerText;
        updateName(input);
    }

    return (
        <ul>
            {results.map((result) => {
                return (
                    <li key={result.id} onClick={onClick}>
                        {result.title} - {result.id}
                    </li>
                )
            })}
        </ul>
    )
}