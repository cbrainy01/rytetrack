import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { createExerciseAsync } from '../../state/exerciseSlice'

function CreateExercise() {
    
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        is_cardio: false,
        // demo_pic: "",
    })
    
    const [demo1, setDemo1] = useState(null)
    const [demo2, setDemo2] = useState(null)
    
    function handleSubmit(e) {
        e.preventDefault()
        let demos = []
        if(demo1 === null && demo2 === null) {demos = []}
        else if(demo1 === null ) {demos = [demo2]}
        else if(demo2 === null) {demos = [demo1]}
        else { demos = [demo1, demo2] }

        console.log("Exercise form data: ", formData)
        console.log("---test: ", {...formData, demos: demos})
        dispatch( createExerciseAsync({...formData, demos: demos }) )
       
        setFormData({name: "", description: "", is_cardio: false,}); setDemo1(null); setDemo2(null)
    }

    function handleChange(event) {
        setFormData( {...formData, [event.target.name]: event.target.value})
    }

     function handleRadioChange(event) {
         setFormData({ ...formData, [event.target.name]: event.target.value === "true" ? true : false })
    }

    function handleDemo1Select(e) { setDemo1(e.target.files[0])}
    function handleDemo2Select(e) { setDemo2(e.target.files[0])}

    return (
        <div>
            Create Exercise
            <form onSubmit={handleSubmit}>
            <input type="text" placeholder="exercise name" name="name" onChange={handleChange} value={formData.name}/><br/>
            <textarea name="description" placeholder="description" onChange={handleChange} value={formData.description} /><br/>
            <input onChange={handleDemo1Select} type="file" name="demo_1" /><br/>
            <input onChange={handleDemo2Select} type="file" name="demo_2" /><br/>
            <label>Is this a cardiovascular exercise?</label><br/>
            <label>yes</label><input type="radio" name="is_cardio" onChange={handleRadioChange} value={true} />
            <label>no</label><input type="radio" name="is_cardio" onChange={handleRadioChange} value={false} /><br/>
            <input type="submit"/>
            </form>
        </div>
    )
}

export default CreateExercise
