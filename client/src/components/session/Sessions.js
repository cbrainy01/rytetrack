import React from 'react'
import CreateSession from './CreateSession'
import { useSelector } from 'react-redux'

function Sessions() {
    
    // SET UP ROUTES WHICH SET SESSIONS UPON LOGGING IN
    // const sessions = useSelector(state => state.session.sessions)
    
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
