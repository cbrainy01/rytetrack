import React, {useState} from 'react'
import {useForm} from "react-hook-form"
import { useDispatch } from 'react-redux'
import { createExerciseAsync } from './state/exerciseSlice'

function CreateExercise() {
    
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        is_cardio: false,
    })
    
    function handleSubmit(e) {
        e.preventDefault()
        console.log("Exercise form data: ", formData)
        dispatch( createExerciseAsync(formData, localStorage.token) )
    }

    function handleChange(event) {
        setFormData( {...formData, [event.target.name]: event.target.value})
    }

     function handleRadioChange(event) {
         setFormData({ ...formData, [event.target.name]: event.target.value === "true" ? true : false })
    }

    return (
        <div>
            Create Exercise
            <form onSubmit={handleSubmit}>
            <input type="text" placeholder="exercise name" name="name" onChange={handleChange} value={formData.name}/><br/>
            <textarea name="description" placeholder="description" onChange={handleChange} value={formData.description} /><br/>
            <input type="file" name="demo_pic"/><br/>
            <label>Is this a cardiovascular exercise?</label><br/>
            <label>yes</label><input type="radio" name="is_cardio" onChange={handleRadioChange} value={true} />
            <label>no</label><input type="radio" name="is_cardio" onChange={handleRadioChange} value={false} /><br/>
            <input type="submit"/>
            </form>
        </div>
    )
}

export default CreateExercise
