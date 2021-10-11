import React from 'react'
import { useDispatch } from 'react-redux'
import { removePicAsync } from '../../state/exerciseSlice'

function DemoPic({picInfo, onRemovePic, exercise_id}) {
    const dispatch = useDispatch()
    function handleClick() {
        // dispatch( removePicAsync({url: url, id: exercise_id}) )
    }
    
    
    
    return (
        <div>
    {/* add click event listener on pic whichll lead to a patch of exercise which removes the pic */}
    
            <img alt="" src={picInfo.url} />
            <button onClick={handleClick}>delete pic</button>
        </div>
    )
}

export default DemoPic
