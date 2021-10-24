import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {v4 as uuid} from "uuid"
import { createWorkoutAsync } from "../../state/sessionSlice"
import { useDispatch } from 'react-redux'
import Loading from "../../Loading"
import {IoRemoveCircle} from "react-icons/io5"
import {IoAddCircle} from "react-icons/io5"
import "../../styling/createworkout.css"

function CreateWorkout({session_id}) {
    
    const userId = useSelector( state => state.user.user.id )
    const exercises = useSelector( state => state.exercise.exercises )
    const status = useSelector(state => state.session.status)
    const [exercise_id, setExercise_Id] = useState(null)
    const workoutErrors = useSelector( state => state.session.workoutErrors )    
    const exercisesDropdown = exercises.map( (exercise) => <option key={uuid()} value={exercise.id} >{exercise.name}</option>  )

    const initialFormData = {
    user_id: userId,
    session_id: session_id,
    exercise_id: exercise_id,
    birack: true,
    sets: "",
    reps: "",
    difficulty: "",
    bar: "",
    notes: "",
    avg_speed: "",
    avg_incline: "",
    miles: "",
    rest_time: "0:00",
    }
    const dispatch = useDispatch()
    const [formData, setFormData] = useState(initialFormData)
    const [plates, setPlates] = useState({
        "45": 0,
        "35": 0,
        "25": 0,
        "10": 0,
        "5": 0,
        "2.5": 0,
    })
    console.log("formData: ", formData)
    console.log("plates: ", plates)
    console.log("exercise_id: ", exercise_id)


    function handleSubmit(e) {
        e.preventDefault();
        const tStamp = convertTimestamp(formData.rest_time)
        if(exercise_id === null) { alert("must select an exercise")}
        else if( formData.rest_time !== "" && tStamp === false ) { alert("invalid rest time")}
        else {
            const isCardio = exercises.find( exercise => exercise.id === exercise_id ).is_cardio
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
            const finalWeight = weight === 0 ? "" : weight
            const finalFormData = {...formData, "weight": finalWeight, "rest_time": tStamp }
            // const finalFormData = {...formData, "weight": weight, "rest_time": tStamp }
            console.log("finalFormData: ", finalFormData)
            dispatch( createWorkoutAsync(finalFormData) )
            setFormData(initialFormData)
        }
        // dispatch action which creates a workout 
    }

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
    function handlePlateClick(e) {
        if(plates[e.target.name] >= 1 && e.target.value === "-") { setPlates( {...plates, [e.target.name]: plates[e.target.name] - 1 }) }
        else if(plates[e.target.name] === 0 && e.target.value === "-") { setPlates( {...plates}) }
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
    const renderWeightSelect = ['45', '35', '25', '10', '5', '2.5'].map( (num) => <div className="plate" key={uuid()}>
        <h2>{num}</h2>
        <p>{plates[num]}</p>
      
        <button className="circle_icon"  name={num} value="-" onClick={handlePlateClick }>-</button>
        <button className="circle_icon" style={{fontSize: "1.45em"}} name={num} value="+" onClick={handlePlateClick}>+</button>

    </div> )


    return (
        <div className="createworkout">
            { status === "loading" ?
                <Loading/>
                :
            <form onSubmit={handleSubmit}>
                <br/>
                <label>select exercise</label>
                <select onChange={(e) => { const iD = parseInt(e.target.value, 10); setExercise_Id(iD); setFormData({...formData, "exercise_id": iD}) } } value={exercise_id} >
                    <option value="" >select exercise</option>
                    {exercisesDropdown}
                </select>
               <div className="plate_layout">{renderWeightSelect}</div>

                <br/><p>are there plates on both sides? (default is yes)</p>
                <label>yes</label><input type="radio" name="birack" onChange={() => setFormData({...formData, "birack": true})} /**value={true}*/ />
                <label>no</label><input type="radio" name="birack" onChange={() => setFormData({...formData, "birack": false})} /*value={false}*/ /><br/>
                <br/><select name="bar" onChange={handleNumChange}>
                    <option value={0}>select barbell type</option>
                    <option value={0}>no bar</option>
                    <option value={45}>standard barbell</option>
                    <option value={35}>swiss bar</option>
                    <option value={50}>trap bar</option>
                    <option value={15}>curl bar</option>
                </select><br/>

                
               
                
                    {/* <input className="input" onChange={handleNumChange} name="difficulty" placeholder="" ></input><br/> */}
                <label className="label">degree of difficulti:</label>
                    <input className="input" onChange={handleNumChange} name="difficulty" placeholder="" ></input><br/>
                <label className="label">reps:</label>
                    <input className="input" onChange={handleNumChange} name="reps" placeholder="" ></input><br/>
                <label className="label">sets:</label>
                    <input className="input" onChange={handleNumChange} name="sets" placeholder="sets" ></input><br/>
                <label className="label">rest time:</label>
                    <input className="input" onChange={handleChange}    name="rest_time" placeholder="rest time(0:00)"></input><br/>
                <label className="label">average speed:</label>
                    <input className="input" onChange={handleDecimalChange} name="avg_speed" placeholder="average speed"></input><br/>
                <label className="label">average incline:</label>
                    <input className="input" onChange={handleDecimalChange} name="avg_incline" placeholder="average incline"></input><br/>
                <label className="label">miles:</label>
                    <input className="input" onChange={handleDecimalChange} name="miles" placeholder="miles"></input><br/>
                <label className="label">notes:</label>
                    <textarea className="input" name="notes" placeholder="notes" onChange={handleChange} value={formData.notes} /><br/>
                
                { workoutErrors ?  workoutErrors.map( (error) => <p key={uuid()} style={{color: "red"}}>-{error}</p> ): null}
                <br/><button className="add_workout">Add workout</button>
            </form>
            }
            
        </div>
    )
}

export default CreateWorkout
{/* <button onClick={() => { if(plates["45"] >= 1) { setPlates( {...plates, "45": plates["45"] - 1 }) } }  }>-</button>
                <button onClick={() => setPlates( {...plates, "45": plates["45"] + 1 } )}>+</button><br/> */}