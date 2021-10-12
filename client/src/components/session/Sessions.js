import React, {useState} from 'react'
import CreateSession from './CreateSession'
import { useSelector } from 'react-redux'
import {v4 as uuid} from "uuid"
import Session from './Session'

function Sessions() {
    
    const [currentPage, setCurrentPage] = useState(1)
    const [sessionsPerPage] = useState(7)

    const sessions = useSelector(state => state.session.sessions)
    
    function pagination() {
        const indexOfLastSession = currentPage * sessionsPerPage
        const indexOfFirstSession = indexOfLastSession - sessionsPerPage
        const currentSessions = sessions.slice( indexOfFirstSession, indexOfLastSession )
        return currentSessions
    }
    const pageNumbers = []
    for( let i = 1; i <= Math.ceil( sessions.length / sessionsPerPage); i++ ) {pageNumbers.push(i);}
    
    const renderSessions = pagination().map( (session) => <Session key={uuid()} session={session} /> )

    function changePage(number) {
        setCurrentPage(number)
    }

    return (
        <div>
            SESSIONS PAGE
            <CreateSession/>
            <h3>Sessions</h3>
            {renderSessions}
           
            {/* <button>Create session from scratch</button> */}
            <nav>
                <ul>
                    {pageNumbers.map( (number) => <div key={uuid()}>
                    <li key={number} >
                        <button  onClick={ () => changePage(number) }  >{number}</button>
                    </li>
                    </div> )}
                </ul>
            </nav>
        </div>
    )
}

export default Sessions
