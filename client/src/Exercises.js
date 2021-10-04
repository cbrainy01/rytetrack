import React from 'react'
import CreateExercise from './CreateExercise'
import { useSelector } from 'react-redux'
import {v4 as uuid} from "uuid"

function Exercises() {
    
    const exercises = useSelector(state => state.exercise.exercises)
    console.log("exercises are: ", exercises)
    const renderExercises = exercises.map( (exercise) => (<ul key={uuid()}><p>{exercise.name}</p><img src={exercise.demo_pic} alt=""/></ul>))
    const error = useSelector( state => state.exercise.error )
    return (
        <div>
            <h3>Exercises page</h3>
            <p>Created exercises: </p>
            <ul>{renderExercises}</ul>
            {error? <p>{error}</p> : null}
            <CreateExercise/>
            {/* Display Exercises */}

        </div>
    )
}

export default Exercises
