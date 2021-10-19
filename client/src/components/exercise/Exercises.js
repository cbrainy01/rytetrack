import React, {useState} from 'react'
import CreateExercise from './CreateExercise'
import { useSelector } from 'react-redux'
import {v4 as uuid} from "uuid"
import { useDispatch } from 'react-redux'
import { deletePicAsync } from '../../state/exerciseSlice'
import Exercise from './Exercise'
import { deleteExerciseAsync } from '../../state/exerciseSlice'
import { removeVideoAsync } from '../../state/exerciseSlice'
import { removePicAsync } from '../../state/exerciseSlice'

function Exercises() {

    const [currentPage, setCurrentPage] = useState(1)
    const [exercisesPerPage] = useState(10)

    const [filterValue, setFilterValue] = useState("all")
    const [searchValue, setSearchValue] = useState("")
    const dispatch = useDispatch()

    function handlePicDelete() {
        dispatch( deletePicAsync(user.id))
    }

    const user = useSelector(state => state.user.user)
    const exercises = useSelector(state => state.exercise.exercises)



    function filterExercises() {
        // make first if statement filter for a search by name
        if(searchValue !== "") { return exercises.filter( (exercise) => { if(exercise.name.toLowerCase().includes(searchValue.toLowerCase())) {return exercise} }) }
        else if(filterValue === "all") {return exercises}
        else if(filterValue === "cardio") { return exercises.filter( (exercise) => exercise.is_cardio === true )/**return exercises where is_cardio is true */}
        else {return exercises.filter( (exercise) => exercise.section === filterValue )}
    }
    const filteredExercises = filterExercises()

    
    function pagination() {
        const indexOfLastExercise = currentPage * exercisesPerPage
        const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage
        const currentExercises = filteredExercises.slice(indexOfFirstExercise, indexOfLastExercise)
        return currentExercises    
    }

    function handleExerciseDelete(exerciseId) {
        // dispatch an action which deletes exercise in backend and updates state accordingly
        dispatch( deleteExerciseAsync(exerciseId) )
    }
    function handleRemoveVideo(exerciseId) {
        dispatch( removeVideoAsync(exerciseId) )
    }

console.log("initial exercises are: ", exercises)
console.log("exercises are: ", pagination())
    const pageNumbers = []
    for( let i = 1; i <= Math.ceil( filteredExercises.length / exercisesPerPage); i++ ) {pageNumbers.push(i);}

    const renderExercises = pagination().map((exercise) => <Exercise key={uuid()} onRemoveVideo={handleRemoveVideo} onExerciseDelete={handleExerciseDelete} exercise={exercise}/>)

    function changePage(number) {
        setCurrentPage(number)
    }

    const error = useSelector( state => state.exercise.error )
    return (
        <div>
            <h3>Exercises page</h3>
            <CreateExercise/>

            <br/><input onChange={ (e) => setSearchValue(e.target.value) } placeholder="search exercises" type="text" value={searchValue}/>
            <br/><label>filter</label>
            <select onChange={(e) => setFilterValue(e.target.value)}>
                <option value="all">all</option>
                <option value="upper">upper body</option>
                <option value="lower">lower body</option>
                <option value="full">full body</option>
                <option value="core">core</option>
                <option value="cardio">cardio</option>
            </select>
            <p>Created exercises: </p>
            <ul>{renderExercises}</ul>
            <nav>
                <ul>
                    {pageNumbers.map( (number) => <div key={uuid()}>
                    <li key={number} >
                        <button  onClick={ () => changePage(number) }  >{number}</button>
                    </li>
                    </div> )}
                </ul>
            </nav>
            {error? <p>{error}</p> : null}
            

        </div>
    )
}

export default Exercises
