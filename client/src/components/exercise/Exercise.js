import React, {useState} from 'react'
import {v4 as uuid} from "uuid"
import DemoPic from './DemoPic'
import { useDispatch } from 'react-redux'
import { editExerciseAsync } from '../../state/exerciseSlice'
import { useSelector } from 'react-redux'
import { setEditMode } from '../../state/exerciseSlice'
import { addPicAsync } from '../../state/exerciseSlice'
import {IoTrashOutline} from "react-icons/io5"
import "../../styling/exercise.css"

function Exercise({ onExerciseDelete, onRemoveVideo, exercise}) {
    
    const editErrors = useSelector(state => state.exercise.editErrors)
    const initialFormData = {
        name: exercise.name,
        description: exercise.description,
        is_cardio: exercise.is_cardio,
        youtube_url: exercise.youtube_url,
        timestamp: "0:00",
        section: exercise.section,
        user_id: exercise.user_id,
        // newDemo: null,
    }
    const dispatch = useDispatch()
    // const [editMode, setEditMode] = useState(false)
    const [formDataEdit, setFormDataEdit] = useState(initialFormData)
    const editMode = useSelector(state => state.exercise.editMode)
    const [demo, setDemo] = useState(null)
    // console.log("formDataEdit: ", formDataEdit)
    console.log("demos: ", exercise.demos)
    function getId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
    
        return (match && match[2].length === 11) ? match[2] : null;     
    }
    
    function renderVid() {
        if (exercise.youtube_url.length > 0) {
            const vidId = getId(exercise.youtube_url)
            return <><iframe className="vid" width="450" height="260" title={`${exercise.name} video demonstration`} src={`//www.youtube.com/embed/${vidId}?start=${exercise.timestamp}`} frameBorder="0" allowFullScreen></iframe>
            <IoTrashOutline className="trash_vid" onClick={handleRemoveVideo}/></>
            {/* <br/><button className="remove_vid" onClick={handleRemoveVideo}>remove video</button></> */}
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
            setFormDataEdit(initialFormData)
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
        dispatch( setEditMode(false) )
        setFormDataEdit(initialFormData)
    }
    function handleDemoSelect(e) {
        setDemo( e.target.files[0] )
    }
    function handleAddPicture() {
        console.log("in the works")
        const picInfo = {exercise_id: exercise.id, new_demo: demo}

        if( exercise.demos.length >= 2) { alert("you can only have 2 demo pics") }
        else if( exercise.demos.length === 1 && demo === null ) {alert("no file selected")}
        // if(demo !== null && exercise.demos.length >= 2) { alert("you can only have 2 demo pics") }
        else { dispatch( addPicAsync({exercise_id: exercise.id, new_demo: demo}) ) }
    }

    return (
        <div className="exercise">

            
        {editMode === exercise.id? 
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
        <label>Is this a cardiovascular exercise?</label><br/>
        <label>yes</label><input type="radio" name="is_cardio" onChange={handleRadioChange} value={true} />
        <label>no</label><input type="radio" name="is_cardio" onChange={handleRadioChange} value={false} /><br/>
        <input name="youtube_url" type="text" placeholder="youtube url" onChange={handleChange} value={formDataEdit.youtube_url} />
        <input name="timestamp" type="text" placeholder="youtube timestamp (0:00)" onChange={handleChange} value={formDataEdit.timestamp}/><br/>
        <button >save changes</button>
        </form>
        <input onChange={handleDemoSelect} type="file" name="demo_1" /><button onClick={handleAddPicture}>add picture</button><br/>
        {editErrors ? editErrors.map( (error) => <p key={uuid()} style={{color: "red"}}>{error}</p> ) : null}
        <button onClick={exitEdit}>exit edit</button>
        </>
        :
        <>
         <h3 className="exercise_name">{exercise.name}</h3>
            <p>Description: {exercise.description}</p>
            <section className="media">
                <div style={{display: "flex"}}>
                    {exercise.demos ? exercise.demos.map( (demo) => <DemoPic key={uuid()} picInfo={demo} exercise_id={exercise.id} /> ) : null}  
                </div>
                {renderVid()}
            </section>
            <br/><button  onClick={handleDeleteClick} >delete exercise</button>
            <button style={{marginLeft: "50px"}} onClick={() => dispatch( setEditMode(exercise.id) )}>edit exercise</button>
        </>
        }

            

        </div>
    )
}

export default Exercise
