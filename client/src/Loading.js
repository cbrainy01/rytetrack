import React, { useState } from 'react'
import RingLoader from "react-spinners/RingLoader"


function Loading() {
    
    const [color, setColor] = useState("blue")
    const [loading, setLoading] = useState(true);

    return (
        <div>
            <RingLoader color={color} loading={loading}/>
        </div>
    )
}

export default Loading
