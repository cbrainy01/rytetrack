import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {v4 as uuid} from "uuid"

function CreateWorkout({session_id}) {
    
    const userId = useSelector( state => state.user.user.id )
    const exercises = useSelector( state => state.exercise.exercises )
    const [exercise_id, setExercise_Id] = useState(null)
    
    console.log("exid: ", exercise_id)
    
    const exercisesDropdown = exercises.map( (exercise) => <option key={uuid()} value={exercise.id} >{exercise.name}</option>  )
    return (
        <div>
            <br/><select onChange={(e) => setExercise_Id(e.target.value)} value={exercise_id} >
                <option value="" >select exercise</option>
                {exercisesDropdown}            
            </select>
            
            <br/><br/><button>Add workout</button>
        </div>
    )
}

export default CreateWorkout
