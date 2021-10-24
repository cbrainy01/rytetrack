import React, {useState} from 'react'
import {v4 as uuid} from "uuid"
import { useDispatch } from 'react-redux'
import { deleteSessionAsync } from '../../state/sessionSlice'
import Workout from '../workout/Workout'
import CreateWorkout from '../workout/CreateWorkout'
import {IoArrowBackCircle} from "react-icons/io5"
import { updateSessionDate } from '../../state/sessionSlice'
import { setEditDateMode } from '../../state/sessionSlice'
import { useSelector } from 'react-redux'
import "../../styling/sessions.css"
import "../../styling/workout.css"
import { MdOutlineEditCalendar } from "react-icons/md"



function Session({session, onBack}) {
    
    const editDateMode = useSelector(state => state.session.editDateMode)
    const [currentDate, setCurrentDate] = useState(session.date)
    const dispatch = useDispatch()
    function handleDelete() {
        dispatch( deleteSessionAsync(session.id) )
        onBack()
    }

    function handleDateChange(e) {
        dispatch( updateSessionDate( {id: session.id, newDate: currentDate}) )  
    }
    console.log("sesh: ", session)

    // const renderWorkouts = session.workouts.map( (workout) => <Workout key={uuid()} workout={workout} /> )
    // const renderTemplate = workoutsTemplate.map( (workout) => <Workout key={uuid()} workout={workout} /> )
    return (
        <div className="li">
            <br/><IoArrowBackCircle className="arrow_back" onClick={onBack}/><br/>
            {editDateMode === true ? 
            <div style={{textAlign: "center"}} ><input onChange={(e) => {setCurrentDate(e.target.value)}} type="date" value={currentDate} /><button onClick={handleDateChange}>save date</button><button onClick={() => {dispatch(setEditDateMode(false))}}>exit edit</button> </div> 
            :
            <div style={{textAlign: "center"}}><h2>{session.date}</h2> <MdOutlineEditCalendar className="date_edit" onClick={ () => {dispatch( setEditDateMode(true) )} }/> </div>}
            {/* <div style={{textAlign: "center"}}><h2>{session.date}</h2><button onClick={ () => {dispatch( setEditDateMode(true) )} }>edit date</button></div>} */}
            
            <CreateWorkout session_id={session.id} />
            <h1>Workouts</h1>
            <div className="wrapper">
                {session.workouts.length > 0 ? session.workouts.map( (workout) => <Workout key={uuid()} workout={workout} />) : null}
            </div>
            
            
            <button onClick={handleDelete}>delete session</button><br/>
        </div>
    )
}

export default Session
