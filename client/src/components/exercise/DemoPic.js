import React from 'react'

function DemoPic({url}) {
    
    
    
    return (
        <div>
    {/* add click event listener on pic whichll lead to a patch of exercise which removes the pic */}
    
            <img alt="" src={url} />
            <button>delete pic</button>
        </div>
    )
}

export default DemoPic
