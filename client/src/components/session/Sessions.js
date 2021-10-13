import React, {useState} from 'react'
import CreateSession from './CreateSession'
import { useSelector } from 'react-redux'
import {v4 as uuid} from "uuid"
import Session from './Session'

function Sessions() {
    
    const [currentPage, setCurrentPage] = useState(1)
    const [sessionsPerPage] = useState(7)
    const [selectedSession, setSelectedSession] = useState(null)
    const [filterValue, setFilterValue] = useState("all")

    const sessions = useSelector(state => state.session.sessions)
    function filteredSessions() {
        if(filterValue === "all") {return sessions}
        else {
            return sessions.filter( (session) => {
            const month = session.date.split("-")[1]
            if(month === filterValue) {return true}
            else {return false}
            })  
            
        }
    }

    function pagination() {
        const indexOfLastSession = currentPage * sessionsPerPage
        const indexOfFirstSession = indexOfLastSession - sessionsPerPage
        const currentSessions = filteredSessions().slice( indexOfFirstSession, indexOfLastSession )
        return currentSessions
    }
    const pageNumbers = []
    for( let i = 1; i <= Math.ceil( filteredSessions().length / sessionsPerPage); i++ ) {pageNumbers.push(i);}
    
    const renderSessions = pagination().map( (session) => <li  key={uuid()} onClick={() => setSelectedSession(session)} >{session.date}</li> )
    // const renderSessions = pagination().map( (session) => <Session key={uuid()} session={session} onClick={() => {setSelectedSession(session); console.log("adjustment") }} /> )

    function changePage(number) {
        setCurrentPage(number)
    }
    
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const renderMonths = months.map( (month, index) => <option value={index < 9 ? `0${index + 1}` : index + 1} key={uuid()}>{month}</option> )
    return (
        <div>
            SESSIONS PAGE
            <CreateSession/>

            {selectedSession ? 
            <> 
                <Session session={selectedSession} onBack={() => setSelectedSession(null)} />
            </> 
            :
            <>
            <h3>Sessions</h3>
            <button>create session from scratch</button><br/>
            <select onChange={ (e) => setFilterValue(e.target.value) } value={filterValue}>
                <option value="all">all</option>
                {renderMonths}
            </select>
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
            </>
            }
            
        </div>
    )
}

export default Sessions
