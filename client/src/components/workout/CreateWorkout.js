import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {v4 as uuid} from "uuid"

function CreateWorkout({session_id}) {
    
    const userId = useSelector( state => state.user.user.id )
    const exercises = useSelector( state => state.exercise.exercises )
    const [exercise_id, setExercise_Id] = useState(null)
    const workoutErrors = useSelector( state => state.session.workoutErrors )    
    const exercisesDropdown = exercises.map( (exercise) => <option key={uuid()} value={exercise.id} >{exercise.name}</option>  )
    
    function handleSubmit(e) {
        e.preventDefault();
        // dispatch action which creates a workout 
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <br/><select onChange={(e) => setExercise_Id(e.target.value)} value={exercise_id} >
                    <option value="" >select exercise</option>
                    {exercisesDropdown}
                </select>
                
                <br/><br/><button>Add workout</button>
            </form>
        </div>
    )
}

export default CreateWorkout
