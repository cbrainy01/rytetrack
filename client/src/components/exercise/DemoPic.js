import React from 'react'

function DemoPic({url, onRemovePic, exercise_id}) {
    
    const stringified = `${url}`
    function handleClick() {
        onRemovePic(stringified, exercise_id)
    }
    
    
    
    return (
        <div>
    {/* add click event listener on pic whichll lead to a patch of exercise which removes the pic */}
    
            <img alt="" src={url} />
            <button onClick={handleClick}>delete pic</button>
        </div>
    )
}

export default DemoPic
