import React from 'react'
import {v4 as uuid} from "uuid"
import DemoPic from './DemoPic'


function Exercise({exercise}) {
    return (
        <div>

            {/*eventually, an actions will be created for deleting and editing exercise */}
            
            <h3>{exercise.name}</h3>
            {exercise.demos.length > 0 ? exercise.demos.map( (url) => <DemoPic url={url} /> ) : null}    
            <p>Description: {exercise.description}</p>
            <button>delete exercise</button><br/>
            <button>edit exercise</button>

        </div>
    )
}

export default Exercise
{/* <img key={uuid()} src={url} alt=""/> */}
// const renderExercises = exercises.map( (exercise) => (
    
//     <ul key={uuid()}>
    
//     {/* <img src={exercise.demos[0]} alt=""/>  
//     <img src={exercise.demos[1]} alt=""/>   */}
//     <button onClick={handlePicDelete}>remove pic</button>
//     </ul>
// ))