import React from 'react'

function Workout({workout}) {
    return (
        <div>
            <p>exercise name: {workout.exercise_name}</p> 
            <p>sets: {workout.sets}</p> 
            <p>reps: {workout.reps}</p> 
            <p>weight: {workout.weight}</p> 
            <button>remove workout</button>
            <button>edit workout</button>
        </div>
    )
}

export default Workout
