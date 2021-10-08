import React from 'react'
import CreateExercise from './CreateExercise'
import { useSelector } from 'react-redux'
import {v4 as uuid} from "uuid"
import { useDispatch } from 'react-redux'
import { deletePicAsync } from '../../state/exerciseSlice'
import Exercise from './Exercise'

function Exercises() {

    const dispatch = useDispatch()
    function handlePicDelete() {
        dispatch( deletePicAsync(user.id))
    }

    const user = useSelector(state => state.user.user)
    const initialExercises = useSelector(state => state.user.user.exercises)
    console.log("initial exercises are: ", initialExercises)
    const exercises = useSelector(state => state.exercise.exercises)
    
    // eventually, wed like to get exercises from state.user.exercises
    // const exercises = useSelector( state => state.user.exercises )
    // const renderExercises = exercises.map( (exercise) => <Exercise key={uuid()} exercise={exercise} /> )
    console.log("exercises are: ", exercises)
    const renderExercises = exercises.map( (exercise) => <Exercise key={uuid()} exercise={exercise}/>)
    // const renderExercises = exercises.map( (exercise) => <Exercise key={uuid()} exercise={exercise}/>)

    const error = useSelector( state => state.exercise.error )
    return (
        <div>
            <h3>Exercises page</h3>
            <CreateExercise/>
            <p>Created exercises: </p>
            <ul>{renderExercises}</ul>
            {error? <p>{error}</p> : null}
            
            {/* Display Exercises */}

        </div>
    )
}

export default Exercises
