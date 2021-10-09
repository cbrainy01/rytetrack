import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function CreateSession() {
    
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); 
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

    console.log("todays date is: ", today)
    
    const userId = useSelector(state => state.user.user.id)
    
    const [formData, setFormData] = useState({
        date: today,
        user_id: userId,
    })
    
    

    function handleChange(event) {
        setFormData( {...formData, [event.target.name]: event.target.value})
    }
    function handleSubmit(e) {
        e.preventDefault();
        // dispatch action which creates a session then reset formData
        setFormData({ date: today, user_id: userId })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} type="date" name="date" value={formData.date}></input>
            </form>
        </div>
    )
}

export default CreateSession
