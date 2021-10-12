import React from 'react'
import CreateSession from './CreateSession'

function Sessions() {
    return (
        <div>
            SESSIONS PAGE
            <CreateSession/>
            {/* <p>previous session</p><button>use this session as template</button>
            <p>previous session</p>
            <p>previous session</p>
            <p>previous session</p> */}
            <button>Create new session from scratch</button>
        </div>
    )
}

export default Sessions
