import React, { useState } from 'react'
import {v4 as uuid} from "uuid"
import { deleteWorkoutAsync } from '../../state/sessionSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { editWorkoutAsync } from '../../state/sessionSlice'
import { setEditMode } from '../../state/sessionSlice'

function Workout({workout}) {
    
    const workoutEditErrors = useSelector(state => state.session.workoutEditErrors)
    const editMode = useSelector(state => state.session.editMode)
    const initialFormData = {
        user_id: workout.user_id,
        session_id: workout.session_id, 
        exercise_id: workout.exercise_id,
        birack: workout.birack,
        sets: workout.sets,
        reps: workout.reps,
        difficulty: workout.difficulty,
        bar: workout.bar,
        notes: workout.notes,
        avg_speed: workout.avg_speed,
        avg_incline: workout.avg_incline,
        miles: workout.miles,
        rest_time: workout.rest_time_string
    }
    const [formData, setFormData] = useState(initialFormData)
    // const [editMode, setEditMode] = useState(false)
    const dispatch = useDispatch()
    const [plates, setPlates] = useState(workout.plate_arrangement)
    const exercises = useSelector( state => state.exercise.exercises )


    function handleWorkoutDelete() {
        dispatch( deleteWorkoutAsync(workout.id) )
    }

    function handleEditSubmit(e) {
        e.preventDefault();
        const tStamp = convertTimestamp(formData.rest_time)

        if(formData.exercise_id === null) { alert("must select an exercise")}
        else if( formData.rest_time !== "" && tStamp === false ) { alert("invalid rest time")}
        else {
            const isCardio = exercises.find( exercise => exercise.id === formData.exercise_id ).is_cardio
            console.log("iscardio: ", isCardio)
            let weightArray = []
            let barWeight = 0
            formData.bar !== "" ? barWeight = formData.bar : barWeight = 0
            weightArray.push(barWeight)

            // create if statement checking to see if workout is cardio. IF so, there cant be any values for reps, sets. Also, weight must be zero
            const keys = Object.keys(plates)
            keys.forEach( (plate) => {
                if(plate === "2.5" && formData.birack === true) {
                    const plateInt = parseFloat(plate, 10)
                    const val = plates[plate] * 2
                    weightArray.push(plateInt * val);
                }
                else if (plate === "2.5" && formData.birack === false) {
                    const plateInt = parseFloat(plate, 10)
                    const val = plates[plate]
                    weightArray.push(plateInt * val);
                }
                else if(formData.birack === true) {
                    const plateInt = parseInt(plate, 10)
                    const val = plates[plate] * 2
                    weightArray.push(plateInt * val);
                }
                else if(formData.birack === false) {
                    const plateInt = parseInt(plate, 10)
                    const val = plates[plate]
                    weightArray.push(plateInt * val);
                }
            })
            const weight = weightArray.reduce( (a, b) => a + b, 0 )
            console.log("weight is: ", weight)
            console.log("weight array is: ", weightArray)
            
            // dispatch action here
            const floats = convertFloats(formData.avg_speed, formData.avg_incline, formData.miles)
            const finalWeight = weight === 0 ? "" : weight
            const finalFormData = {...formData, "weight": finalWeight, "rest_time": tStamp, "avg_speed": floats.avg_speed, "avg_incline": floats.avg_incline, "miles": floats.miles }
            // const finalFormData = {...formData, "weight": weight, "rest_time": tStamp }
            console.log("finalFormData: ", finalFormData)
            // dispatch(setEditMode(false))
            dispatch( editWorkoutAsync({"editInfo": finalFormData, "workout_id": workout.id}) )
            setFormData(initialFormData)
        }
    }
    console.log("formdata: ", formData)

    function handleChange(event) {
        setFormData( {...formData, [event.target.name]: event.target.value})
    }
    function handleNumChange(e) {
        if(e.target.value !== "") {const num = parseInt(e.target.value, 10)
        setFormData( {...formData, [e.target.name]: num} )}
        else { setFormData({...formData, [e.target.name]: ""}) }
    }
    function handleDecimalChange(e) {
        const num = parseFloat(e.target.value)
        setFormData( {...formData, [e.target.name]: num} )
    }
    function convertFloats(speed, incline, miles) {
        const floats = {}
        if(isNaN(speed) || speed === null) { floats.avg_speed = null }
        else if(speed !== null) { const avg_speed = parseFloat(speed); floats.avg_speed = avg_speed } else {floats.avg_speed = null}
        if(isNaN(incline) || incline === null) { floats.avg_incline = null }
        else if(incline !== null) {const avg_incline = parseFloat(incline); floats.avg_incline = avg_incline} else {floats.avg_incline = null}
        if(isNaN(miles) || miles === null) { floats.miles = null }
        else if(miles !== null) {const milez = parseFloat(miles); floats.miles = milez} else {floats.miles = null}
        
        return floats
    }
    function handlePlateClick(e) {
        if(plates[e.target.name] >= 1 && e.target.value === "-") { setPlates( {...plates, [e.target.name]: plates[e.target.name] - 1 }) }
        else if( e.target.value === "+" ) { setPlates( {...plates, [e.target.name]: plates[e.target.name] + 1 }) }
    }
    function convertTimestamp(timestamp) {
        const parts = timestamp.split(":")
        const mins = parseInt(parts[0], 10)
        const secs = parseInt(parts[1], 10)
        if( secs > 59 || isNaN(mins) === true || isNaN(secs) === true) {return false}
        else {
            return (mins * 60) + secs
        }
    }
    const weightDropdown = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map( (num) => <option key={uuid()} value={num}>{num}</option> )
    const renderWeightSelect = ['45', '35', '25', '10', '5', '2.5'].map( (num) => <div key={uuid()}>
        <h2>{num}</h2>
        <p>{plates[num]}</p>
        <button name={num} value="-" onClick={handlePlateClick }>-</button>
        <button name={num} value="+" onClick={handlePlateClick}>+</button><br/>

    </div> )
    const exercisesDropdown = exercises.map( (exercise) => <option key={uuid()} value={exercise.id} >{exercise.name}</option>  )
    const displayPlateArrangement = Object.keys(workout.plate_arrangement).map( (key) => <div key={uuid()}>
         <h3>{key}: </h3><p>{workout.plate_arrangement[key]}</p>
     </div> )
    // console.log("plate arrangement: ", Object.keys(workout.plate_arrangement) )
    return (
        <div>
            {editMode === workout.id ? 
            <>
            <form onSubmit={handleEditSubmit}>
                <br/>
                <label>select exercise</label>
                <select onChange={(e) => { 
                    const iD = parseInt(e.target.value, 10); { isNaN(iD) ? setFormData({...formData, "exercise_id": null}) : setFormData({...formData, "exercise_id": iD}) } 
                    } } value={formData.exercise_id} >

                    <option value="" >select exercise</option>
                    {exercisesDropdown}
                </select>
               {renderWeightSelect}

                <p>are there plates on both sides? (default is yes)</p>
                <label>yes</label><input type="radio" name="birack" onChange={() => setFormData({...formData, "birack": true})} /**value={true}*/ />
                <label>no</label><input type="radio" name="birack" onChange={() => setFormData({...formData, "birack": false})} /*value={false}*/ /><br/>
                <select name="bar" onChange={handleNumChange}>
                    <option value={0}>select barbell type</option>
                    <option value={0}>no bar</option>
                    <option value={45}>standard barbell</option>
                    <option value={35}>swiss bar</option>
                    <option value={50}>trap bar</option>
                    <option value={15}>curl bar</option>
                </select><br/>

                <p>pics of what the bars look like</p>
                <input onChange={handleNumChange} name="difficulty" placeholder="degree of difficulty(0-10)" value={formData.difficulty}></input><br/>
                <input onChange={handleNumChange} name="reps" placeholder="reps" value={formData.reps}></input><br/>
                <input onChange={handleNumChange} name="sets" placeholder="sets" value={formData.sets}></input><br/>
                <input onChange={handleChange}    name="rest_time" placeholder="rest time(0:00)"></input><br/>
                <input onChange={handleChange} name="avg_speed" placeholder="average speed" value={formData.avg_speed}></input><br/>
                <input onChange={handleChange} name="avg_incline" placeholder="average incline" value={formData.avg_incline}></input><br/>
                <input onChange={handleChange} name="miles" placeholder="miles" value={formData.miles}></input><br/>
                <textarea name="notes" placeholder="notes" onChange={handleChange} value={formData.notes} /><br/>
                
                { workoutEditErrors ?  workoutEditErrors.map( (error) => <p key={uuid()} style={{color: "red"}}>-{error}</p> ): null}
                <button>save changes</button>
            </form>
            <button onClick={() => {setFormData(initialFormData); dispatch(setEditMode(false)); setPlates(workout.plate_arrangement) }}>exit edit</button>
            
            </>
            : 
            <>
            
            <p>exercise name: {workout.exercise_name}</p> 
            <p>sets: {workout.sets}</p> 
            <p>reps: {workout.reps}</p> 
            <p>weight: {workout.weight}</p> 
            <p>rest time btwn sets: {workout.rest_time_string}</p> 
            <p>difficulty: {workout.difficulty}</p> 
            <p>avg speed: {workout.avg_speed}</p> 
            <p>avg incline: {workout.avg_incline}</p> 
            <p>miles: {workout.miles}</p> 
            <p>notes: {workout.notes}</p>
            {displayPlateArrangement} 
            <button onClick={() => dispatch(setEditMode(workout.id))}>edit workout</button>

            </>
            }
            <button onClick={handleWorkoutDelete}>remove workout</button>
        </div>
    )
}

export default Workout
