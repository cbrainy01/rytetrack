import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { createExerciseAsync } from './state/exerciseSlice'

function CreateExercise() {
    
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        is_cardio: false,
        // demo_pic: "",
    })
    const [selectedFile, setSelectedFile] = useState("")
    const fData = new FormData();
    
    function handleSubmit(e) {
        e.preventDefault()

        console.log("Exercise form data: ", formData)
        console.log("current token: ", localStorage.token)
        console.log("selected file: ", selectedFile)
        console.log("fData: ", fData.get("demo_pic"))
        fData.append("demo_pic", selectedFile)
        dispatch( createExerciseAsync({...formData, demo_pic: selectedFile}, localStorage.token) )
        // dispatch( createExerciseAsync(selectedFile, localStorage.token) )
        // dispatch( createExerciseAsync(formData, localStorage.token) )
        // dispatch separate action which takes care of selected image
        setFormData({name: "", description: "", is_cardio: false,}); setSelectedFile(null)
    }

    function handleChange(event) {
        setFormData( {...formData, [event.target.name]: event.target.value})
    }

     function handleRadioChange(event) {
         setFormData({ ...formData, [event.target.name]: event.target.value === "true" ? true : false })
    }

    function handleFileSelect(e) {
        // setSelectedFile({...formData, [e.target.name]: e.target.value})
        setSelectedFile( e.target.files[0] )
    }

    return (
        <div>
            Create Exercise
            <form onSubmit={handleSubmit}>
            <input type="text" placeholder="exercise name" name="name" onChange={handleChange} value={formData.name}/><br/>
            <textarea name="description" placeholder="description" onChange={handleChange} value={formData.description} /><br/>
            <input onChange={handleFileSelect} type="file" name="demo_pic" /><br/>
            <label>Is this a cardiovascular exercise?</label><br/>
            <label>yes</label><input type="radio" name="is_cardio" onChange={handleRadioChange} value={true} />
            <label>no</label><input type="radio" name="is_cardio" onChange={handleRadioChange} value={false} /><br/>
            <input type="submit"/>
            </form>
        </div>
    )
}

export default CreateExercise
