import React from 'react'
import {v4 as uuid} from "uuid"
import { useDispatch } from 'react-redux'
import { deleteSessionAsync } from '../../state/sessionSlice'
import Workout from '../workout/Workout'
import CreateWorkout from '../workout/CreateWorkout'
import { useSelector } from 'react-redux'

function Session({session, onBack}) {
    
    const dispatch = useDispatch()
    function handleDelete() {
        dispatch( deleteSessionAsync(session.id) )
        onBack()
    }

    console.log("sesh: ", session)

    // const renderWorkouts = session.workouts.map( (workout) => <Workout key={uuid()} workout={workout} /> )
    // const renderTemplate = workoutsTemplate.map( (workout) => <Workout key={uuid()} workout={workout} /> )
    return (
        <div className="li">
             <h2>THe DEEtS</h2>
            <br/><button onClick={onBack}> go back</button><br/>
            {session.date}
            <CreateWorkout session_id={session.id} />
            <h1>Workouts</h1>
            {session.workouts.length > 0 ? session.workouts.map( (workout) => <Workout key={uuid()} workout={workout} />) : null}

            
            
            <button onClick={handleDelete}>delete session</button><br/>
        </div>
    )
}

export default Session
