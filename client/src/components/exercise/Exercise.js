import React, {useState} from 'react'
import {v4 as uuid} from "uuid"
import DemoPic from './DemoPic'
import { useDispatch } from 'react-redux'
import { editExerciseAsync } from '../../state/exerciseSlice'
import { useSelector } from 'react-redux'


function Exercise({onRemovePic, onExerciseDelete, onRemoveVideo, exercise}) {
    
    const editErrors = useSelector(state => state.exercise.editErrors)
    const dispatch = useDispatch()
    const [editMode, setEditMode] = useState(false)
    const [formDataEdit, setFormDataEdit] = useState({
        name: exercise.name,
        description: exercise.description,
        is_cardio: exercise.is_cardio,
        youtube_url: exercise.youtube_url,
        timestamp: "0:00",
        section: exercise.section,
        user_id: exercise.user_id
    })
    function getId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
    
        return (match && match[2].length === 11) ? match[2] : null;     
    }
    
    function renderVid() {
        if (exercise.youtube_url.length > 0) {
            const vidId = getId(exercise.youtube_url)
            return <><iframe width="560" height="315" title={`${exercise.name} video demonstration`} src={`//www.youtube.com/embed/${vidId}?start=${exercise.timestamp}`} frameBorder="0" allowFullScreen></iframe>
            <button onClick={handleRemoveVideo}>remove video</button></>
        } 
        else {return null}
    }

    function handleDeleteClick() {
        onExerciseDelete(exercise.id)
    }
    function handleRemoveVideo() {
        onRemoveVideo(exercise.id)
    }

    ///------------------------------------------------------------------------
    // EDIT STUFF
    function handleChange(event) {
        setFormDataEdit( {...formDataEdit, [event.target.name]: event.target.value})
    }
    function handleRadioChange(event) {
        setFormDataEdit({ ...formDataEdit, [event.target.name]: event.target.value === "true" ? true : false })
   }
   function handleSubmit(e) {
    e.preventDefault()
    const tStamp = convertTimestamp(formDataEdit.timestamp)
    if(validateYouTubeUrl(formDataEdit.youtube_url) === false && formDataEdit.youtube_url !== "") {alert("invalid youtube url!")}
    else if(tStamp === false) { alert("invalid timestamp!") }
    else {
        /**dispatch action for patch request */
        dispatch( editExerciseAsync({info: formDataEdit, id: exercise.id}) )
        console.log("---", formDataEdit, "exID: ", exercise.id)
    }// reset formData
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
    function convertTimestamp(timestamp) {
        const parts = timestamp.split(":")
        const mins = parseInt(parts[0], 10)
        const secs = parseInt(parts[1], 10)
        if( secs > 59 || isNaN(mins) === true || isNaN(secs) === true) {return false}
        else {
            return (mins * 60) + secs
        }
    }
    function exitEdit() {
        setEditMode(false)
        // reset formDataEdit
    }

    return (
        <div>

            
        {editMode ? 
        <>
        <form onSubmit={handleSubmit}>
        <input type="text" placeholder="exercise name" name="name" onChange={handleChange} value={formDataEdit.name}/><br/>
        <select name="section" value={formDataEdit.section} onChange={handleChange}>
            <option value="none">none</option>
            <option value="upper">upper body</option>
            <option value="lower">lower body</option>
            <option value="full">full body</option>
            <option value="core">core</option>
        </select><br/>
        <textarea name="description" placeholder="description" onChange={handleChange} value={formDataEdit.description} /><br/>
        {/* <input onChange={handleDemo1Select} type="file" name="demo_1" /><br/>
        <input onChange={handleDemo2Select} type="file" name="demo_2" /><br/> */}
        <label>Is this a cardiovascular exercise?(default is no)</label><br/>
        <label>yes</label><input type="radio" name="is_cardio" onChange={handleRadioChange} value={true} />
        <label>no</label><input type="radio" name="is_cardio" onChange={handleRadioChange} value={false} /><br/>
        <input name="youtube_url" type="text" placeholder="youtube url" onChange={handleChange} value={formDataEdit.youtube_url} />
        <input name="timestamp" type="text" placeholder="youtube timestamp (0:00)" onChange={handleChange} value={formDataEdit.timestamp}/><br/>
        <button >save changes</button>
        </form>
        {editErrors ? editErrors.map( (error) => <p key={uuid()} style={{color: "red"}}>{error}</p> ) : null}
        <button onClick={exitEdit}>exit edit</button>
        </>
        :
        <>
         <h3>{exercise.name}</h3>
            {exercise.demos.length > 0 ? exercise.demos.map( (url) => <DemoPic key={uuid()} url={url} exercise_id={exercise.id} onRemovePic={onRemovePic} /> ) : null}  
            <br/>
            {renderVid()}
            <p>Description: {exercise.description}</p>
            <button onClick={handleDeleteClick} >delete exercise</button><br/>
            <button onClick={() => setEditMode(true)}>edit exercise</button>
        </>
        }

            

        </div>
    )
}

export default Exercise
