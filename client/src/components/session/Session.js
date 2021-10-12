import React from 'react'

function Session({session}) {
    return (
        <div>
            <p>{session.date}</p>
            <p>workout info</p>
            <button>delete session</button>
            <button>edit session</button>
        </div>
    )
}

export default Session
