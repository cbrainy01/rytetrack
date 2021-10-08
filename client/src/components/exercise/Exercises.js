import React, {useState} from 'react'
import CreateExercise from './CreateExercise'
import { useSelector } from 'react-redux'
import {v4 as uuid} from "uuid"
import { useDispatch } from 'react-redux'
import { deletePicAsync } from '../../state/exerciseSlice'
import Exercise from './Exercise'

function Exercises() {

    const [filterValue, setFilterValue] = useState("all")
    const dispatch = useDispatch()
    function handlePicDelete() {
        dispatch( deletePicAsync(user.id))
    }

    const user = useSelector(state => state.user.user)
    const exercises = useSelector(state => state.exercise.exercises)

    // create sort function for exercises
    function filterExercises() {
        if(filterValue === "all") {return exercises}
        else {return exercises.filter( (exercise) => exercise.section === filterValue )}
    }
    
    console.log("exercises are: ", exercises)
    const renderExercises = filterExercises().map( (exercise) => <Exercise key={uuid()} exercise={exercise}/>)

    const error = useSelector( state => state.exercise.error )
    return (
        <div>
            <h3>Exercises page</h3>
            <CreateExercise/>

            <br/><label>filter</label>
            <select onChange={(e) => setFilterValue(e.target.value)}>
                <option value="all">all</option>
                <option value="upper">upper body</option>
                <option value="lower">lower body</option>
                <option value="full">full body</option>
                <option value="core">core</option>
            </select>
            <p>Created exercises: </p>
            <ul>{renderExercises}</ul>
            {error? <p>{error}</p> : null}
            
            {/* Display Exercises */}

        </div>
    )
}

export default Exercises
