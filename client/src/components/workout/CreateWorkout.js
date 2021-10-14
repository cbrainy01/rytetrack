import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {v4 as uuid} from "uuid"

function CreateWorkout({session_id}) {
    
    const userId = useSelector( state => state.user.user.id )
    const exercises = useSelector( state => state.exercise.exercises )
    const [exercise_id, setExercise_Id] = useState(null)
    const workoutErrors = useSelector( state => state.session.workoutErrors )    
    const exercisesDropdown = exercises.map( (exercise) => <option key={uuid()} value={exercise.id} >{exercise.name}</option>  )
    
    // const [bar, setBar] = useState(0)
    // const [biRack, setBiRack] = useState(true)

    const [formData, setFormData] = useState({
    birack: true,
    sets: null,
    reps: null,
    difficulty: null,
    bar: null,
    notes: null,
    avg_speed: null,
    avg_incline: null,
    miles: null,
    rest_time: "0:00",
    })
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

    function handleSubmit(e) {
        e.preventDefault();
        // dispatch action which creates a workout 
    }
    function handleWeightChange(e) {
        let finalWeight;
        const plates = {
            "45": 0,
            "35": 0,
            "25": 0,
            "10": 0,
            "5": 0,
            "2.5": 0,
        }
        // if(birack === true) {}
    }
    function handleChange(event) {
        setFormData( {...formData, [event.target.name]: event.target.value})
    }
    function handleNumChange(e) {
        const num = parseInt(e.target.value, 10)
        setFormData( {...formData, [e.target.name]: num} )
    }
    function handleDecimalChange(e) {
        const num = parseFloat(e.target.value)
        setFormData( {...formData, [e.target.name]: num} )
    }
    function handlePlateClick(e) {
        if(plates[e.target.name] >= 1 && e.target.value === "-") { setPlates( {...plates, [e.target.name]: plates[e.target.name] - 1 }) }
        else if( e.target.value === "+" ) { setPlates( {...plates, [e.target.name]: plates[e.target.name] + 1 }) }
    }

    const weightDropdown = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map( (num) => <option key={uuid()} value={num}>{num}</option> )
    

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <br/>
                <select onChange={(e) => setExercise_Id(e.target.value)} value={exercise_id} >
                    <option value="" >select exercise</option>
                    {exercisesDropdown}
                </select>
                <h2>45lbs</h2>
                <p>{plates["45"]}</p>
                <button name="45" value="-" onClick={handlePlateClick }>-</button>
                <button name="45" value="+" onClick={handlePlateClick}>+</button><br/>
                
                <select name="45" onChange={(e) => handleWeightChange()}>
                    <option value="" >select number of plates</option>
                    {weightDropdown}
                </select>
                <h2>35lbs</h2>
                <select name="35" onChange={(e) => handleWeightChange()}>
                    <option value="" >select number of plates</option>
                    {weightDropdown}
                </select>
                <h2>25lbs</h2>
                <select name="25" onChange={(e) => handleWeightChange()}>
                    <option value="" >select number of plates</option>
                    {weightDropdown}
                </select>
                <h2>10lbs</h2>
                <select name="10" onChange={(e) => handleWeightChange()}>
                    <option value="" >select number of plates</option>
                    {weightDropdown}
                </select>
                <h2>5lbs</h2>
                <select name="5" onChange={(e) => handleWeightChange()}>
                    <option value="" >select number of plates</option>
                    {weightDropdown}
                </select>
                <h2>2.5lbs</h2>
                <select name="2.5" onChange={(e) => handleWeightChange()}>
                    <option value="" >select number of plates</option>
                    {weightDropdown}
                </select>
                <p>are there plates on both sides of the bar? (default is yes)</p>
                <label>yes</label><input type="radio" name="birack" onChange={() => setFormData({...formData, "birack": true})} value={true} />
                <label>no</label><input type="radio" name="birack" onChange={() => setFormData({...formData, "birack": false})} value={false} /><br/>
                <select name="bar" onChange={handleNumChange}>
                    <option value={0}>select barbell type</option>
                    <option value={0}>no bar</option>
                    <option value={45}>standard barbell</option>
                    <option value={35}>swiss bar</option>
                    <option value={50}>trap bar</option>
                    <option value={15}>curl bar</option>
                </select><br/>

                <p>pics of what the bars look like</p>
                <p>onsubmit, take into account all this stuff to determine the weight being sent to backend</p>
                <input onChange={handleNumChange} name="difficulty" placeholder="degree of difficulty(0-10)" ></input><br/>
                <input onChange={handleNumChange} name="reps" placeholder="reps" ></input><br/>
                <input onChange={handleNumChange} name="sets" placeholder="sets" ></input><br/>
                <input onChange={handleChange}    name="rest_time" placeholder="rest time(0:00)"></input><br/>
                <input onChange={handleDecimalChange} name="avg_speed" placeholder="average speed"></input><br/>
                <input onChange={handleDecimalChange} name="avg_incline" placeholder="average incline"></input><br/>
                <input onChange={handleDecimalChange} name="miles" placeholder="miles"></input><br/>
                <textarea name="notes" placeholder="notes" onChange={handleChange} value={formData.notes} /><br/>
                
                { workoutErrors ? workoutErrors.map( (error) => <p key={uuid()} style={{color: "red"}}>-{error}</p> ): null}
                <br/><br/><button>Add workout</button>
            </form>
        </div>
    )
}

export default CreateWorkout
{/* <button onClick={() => { if(plates["45"] >= 1) { setPlates( {...plates, "45": plates["45"] - 1 }) } }  }>-</button>
                <button onClick={() => setPlates( {...plates, "45": plates["45"] + 1 } )}>+</button><br/> */}