import React from 'react'
import CreateExercise from './CreateExercise'
import { useSelector } from 'react-redux'

function Exercises() {
    
    const exercises = useSelector(state => state.exercise.exercises)
    const renderExercises = exercises.map( (exercise) => <ul>{exercise.name}</ul>)
    return (
        <div>
            <h3>Exercises page</h3>
            <p>Created exercises: </p>
            <ul>{renderExercises}</ul>
            <CreateExercise/>
            {/* Display Exercises */}
        </div>
    )
}

export default Exercises
