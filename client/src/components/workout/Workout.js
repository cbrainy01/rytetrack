import React from 'react'
import { deleteWorkoutAsync } from '../../state/sessionSlice'
import { useDispatch } from 'react-redux'

function Workout({workout}) {
    
    const dispatch = useDispatch()

    function handleWorkoutDelete() {
        dispatch( deleteWorkoutAsync(workout.id) )
    }
    
    return (
        <div>
            <p>exercise name: {workout.exercise_name}</p> 
            <p>sets: {workout.sets}</p> 
            <p>reps: {workout.reps}</p> 
            <p>weight: {workout.weight}</p> 
            <button onClick={handleWorkoutDelete}>remove workout</button>
            <button>edit workout</button>
        </div>
    )
}

export default Workout
