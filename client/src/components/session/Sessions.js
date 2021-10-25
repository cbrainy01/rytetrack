import React, {useState} from 'react'
import CreateSession from './CreateSession'
import { useSelector } from 'react-redux'
import {v4 as uuid} from "uuid"
import Session from './Session'
import { setSelectedSession } from '../../state/sessionSlice'
import { useDispatch } from 'react-redux'
import { createFromTemplate } from '../../state/sessionSlice'
import "../../styling/body.css"
import "../../styling/sessions.css"
import {IoReturnDownForwardOutline} from "react-icons/io5"

function Sessions() {
    
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1)
    const [sessionsPerPage] = useState(7)
    const selectedSession = useSelector( state => state.session.selectedSession )
    console.log("selcted session: ", selectedSession)
    // const [selectedSession, setSelectedSession] = useState(null)
    const [filterValue, setFilterValue] = useState("all")

    const userId = useSelector(state => state.user.user.id)
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); 
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

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
    
    

    function changePage(number) {
        setCurrentPage(number)
    }
    
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const renderMonths = months.map( (month, index) => <option value={index < 9 ? `0${index + 1}` : index + 1} key={uuid()}>{month}</option> )
    
    const renderSessions = pagination().map( (session) => <div className="li" key={uuid()} >
        <div  >
            <p className="date">{session.date}</p>
            <p className="preview">{workoutsPreview(session)}</p>
        </div>
        
        <button className="button1" onClick={() => templateCreate(session.workouts)}>use session as template</button>
        <IoReturnDownForwardOutline onClick={() => dispatch( setSelectedSession(session) )} className="enter_icon"/>
    </div> )

    function workoutsPreview(session) {
        // if there are more than 45 characters when workouts are c
        const characterLength = session.workouts.map( (workout) => workout.exercise_name.length ).reduce( (a, b) => a + b, 0 )
        if(characterLength > 70) { 
            const preview = [];
            let characterCount = 0;
            for (let i = 0; i < session.workouts.length; i++) {
                characterCount += session.workouts[i].exercise_name.length
                if(characterCount > 70) {break}
                else { preview.push(session.workouts[i].exercise_name) }
            }
            return preview.join(",  ") + "..."
        }
        else { 
            const workouts = session.workouts.map( (workout) => workout.exercise_name )
            return workouts.join(",  ")
        }
    }

    function templateCreate(workouts) {
        const template = { workouts: workouts, date: today, user_id: userId }
        dispatch( createFromTemplate(template) )
        // dispatch an action which creates a session as well as workouts for that session
    }


    
    
    
    return (
        <div className="body">
            {/* <CreateSession/> */}

            {selectedSession ? 
            <> 
                <Session session={selectedSession.payload} onBack={() => dispatch( setSelectedSession(null) )} />
            </> 
            :
            <>
            {/* <h3>Sessions</h3> */}
            <h1 className="header">Sessions</h1>
            <CreateSession/><br/><br/>
            {/* <button onClick={scratchCreate}>create session from scratch</button><br/> */}
            <label style={{fontSize: "1.3em"}}>Filter by month</label>
            <select style={{fontSize: "1.3em"}} onChange={ (e) => setFilterValue(e.target.value) } value={filterValue}>
                <option value="all">all</option>
                {renderMonths}
            </select>
            <div className="ul">{renderSessions}</div>
            
           
            <nav >
                <div className="paginator">
                    {pageNumbers.map( (number) => <div key={uuid()}>
                    <p key={number} >
                        <button  onClick={ () => changePage(number) }  >{number}</button>
                    </p>
                    </div> )}
                </div>
            </nav>
            </>
            }
            
        </div>
    )
}

export default Sessions
