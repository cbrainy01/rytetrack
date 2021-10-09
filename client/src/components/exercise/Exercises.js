import React, {useState} from 'react'
import CreateExercise from './CreateExercise'
import { useSelector } from 'react-redux'
import {v4 as uuid} from "uuid"
import { useDispatch } from 'react-redux'
import { deletePicAsync } from '../../state/exerciseSlice'
import Exercise from './Exercise'

function Exercises() {

    const [currentPage, setCurrentPage] = useState(1)
    const [exercisesPerPage, setExercisesPerPage] = useState(10)

    const [filterValue, setFilterValue] = useState("all")
    const dispatch = useDispatch()

    function handlePicDelete() {
        dispatch( deletePicAsync(user.id))
    }

    const user = useSelector(state => state.user.user)
    const exercises = useSelector(state => state.exercise.exercises)

    // create sort function for exercises
    function filterExercises() {
        // make first if statement filter for a search by name
        if(filterValue === "all") {return exercises}
        else {return exercises.filter( (exercise) => exercise.section === filterValue )}
    }
    const filteredExercises = filterExercises()

    
    function pagination() {
        const indexOfLastExercise = currentPage * exercisesPerPage
        const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage
        const currentExercises = filteredExercises.slice(indexOfFirstExercise, indexOfLastExercise)
        return currentExercises    
    }

console.log("initial exercises are: ", exercises)
console.log("exercises are: ", pagination())
    const pageNumbers = []
    for( let i = 1; i <= Math.ceil( filteredExercises.length / exercisesPerPage); i++ ) {pageNumbers.push(i);}

    // const renderExercises = currentExercises.map((exercise) => <Exercise key={uuid()} exercise={exercise}/>)
    const renderExercises = pagination().map((exercise) => <Exercise key={uuid()} exercise={exercise}/>)
    // const renderExercises = filteredExercises.map( (exercise) => <Exercise key={uuid()} exercise={exercise}/>)
    // const renderExercises = filterExercises().map( (exercise) => <Exercise key={uuid()} exercise={exercise}/>)

    function changePage(number) {
        setCurrentPage(number)
    }

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
            <nav>
                <ul>
                    {pageNumbers.map( (number) => <>
                    <li key={number} >
                        <button  onClick={ () => changePage(number) }  >{number}</button>
                        {/* <a  onClick={ () => changePage(number) } href="!#">{number}</a> */}
                    </li>
                    </> )}
                </ul>
            </nav>
            {error? <p>{error}</p> : null}
            
            {/* Display Exercises */}

        </div>
    )
}

export default Exercises
