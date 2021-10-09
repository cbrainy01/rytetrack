import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { createExerciseAsync } from '../../state/exerciseSlice'
import {v4 as uuid} from "uuid"
import { useSelector } from 'react-redux'

function CreateExercise() {
    
    const createErrors = useSelector( state => state.exercise.createErrors )
    const userId = useSelector( state => state.user.user.id )
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        is_cardio: false,
        youtube_url: "",
        timestamp: "0:00",
        section: "none",
        user_id: userId,
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
        console.log("---test: ", {...formData, demos: demos, })
        console.log("userId: ", userId)
        const tStamp = convertTimestamp(formData.timestamp)
        if(validateYouTubeUrl(formData.youtube_url) === false && formData.youtube_url !== "") {alert("invalid youtube url!")}
        else if(tStamp === false ) { alert("invalid timestamp!")}
        else { dispatch( createExerciseAsync({...formData, demos: demos, timestamp: tStamp, }) )}
        
        setFormData({name: "", description: "", is_cardio: false, youtube_url: "", section: "none", timestamp: "0:00", user_id: userId}); setDemo1(null); setDemo2(null)
    }

    function handleChange(event) {
        setFormData( {...formData, [event.target.name]: event.target.value})
    }

     function handleRadioChange(event) {
         setFormData({ ...formData, [event.target.name]: event.target.value === "true" ? true : false })
    }

    function handleDemo1Select(e) { setDemo1(e.target.files[0])}
    function handleDemo2Select(e) { setDemo2(e.target.files[0])}

    function convertTimestamp(timestamp) {
        const parts = timestamp.split(":")
        const mins = parseInt(parts[0], 10)
        const secs = parseInt(parts[1], 10)
        if( secs > 59 || isNaN(mins) === true || isNaN(secs) === true) {return false}
        else {
            return (mins * 60) + secs
        }
    }

    function validateYouTubeUrl(url) {
        if (url !== undefined || url !== '') {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            const match = url.match(regExp);
            if (match && match[2].length === 11) {
                return url
            }
            else { return false }
        }
    }

    return (
        <div>
            Create Exercise
            <form onSubmit={handleSubmit}>
            <input type="text" placeholder="exercise name" name="name" onChange={handleChange} value={formData.name}/><br/>
            <select name="section" value={formData.section} onChange={handleChange}>
                <option value="none">none</option>
                <option value="upper">upper body</option>
                <option value="lower">lower body</option>
                <option value="full">full body</option>
                <option value="core">core</option>
            </select><br/>
            <textarea name="description" placeholder="description" onChange={handleChange} value={formData.description} /><br/>
            <input onChange={handleDemo1Select} type="file" name="demo_1" /><br/>
            <input onChange={handleDemo2Select} type="file" name="demo_2" /><br/>
            <label>Is this a cardiovascular exercise?</label><br/>
            <label>yes</label><input type="radio" name="is_cardio" onChange={handleRadioChange} value={true} />
            <label>no</label><input type="radio" name="is_cardio" onChange={handleRadioChange} value={false} /><br/>
            <input name="youtube_url" type="text" placeholder="youtube url" onChange={handleChange} value={formData.youtube_url} />
            <input name="timestamp" type="text" placeholder="youtube timestamp (0:00)" onChange={handleChange} value={formData.timestamp}/><br/>
            <input type="submit"/>
            </form>
            {createErrors ? createErrors.map( (error) => <p key={uuid()} style={{color: "red"}} >-{error}</p> ) : null}
        </div>
    )
}

export default CreateExercise
