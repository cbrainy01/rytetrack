import React from 'react'
import { useDispatch } from 'react-redux'
import { removePicAsync } from '../../state/exerciseSlice'
import {IoTrashOutline} from "react-icons/io5"
import "../../styling/exercise.css"

function DemoPic({picInfo, exercise_id}) {
    const dispatch = useDispatch()
    function handleClick() {
        dispatch( removePicAsync({picId: picInfo.id, exercise_id: exercise_id}) )
    }
    
    
    
    return (
        <div>
    {/* add click event listener on pic whichll lead to a patch of exercise which removes the pic */}
    
            <img style={{marginLeft: "10px"}} alt="" src={picInfo.url} width="225" height="200" />

            <IoTrashOutline className="trash" onClick={handleClick}/>
            {/* <button onClick={handleClick}>delete pic</button> */}
        </div>
    )
}

export default DemoPic
