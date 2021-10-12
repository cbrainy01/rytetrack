import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteSessionAsync } from '../../state/sessionSlice'

function Session({session, onBack}) {
    
    const dispatch = useDispatch()
    function handleDelete() {
        dispatch( deleteSessionAsync(session.id) )
        onBack()
    }

    return (
        <div>
             <h2>THe DEEtS</h2>
            {session.date}
            <button onClick={onBack}> go back</button>
            <button onClick={handleDelete}>delete session</button>
            <button>edit session</button>
        </div>
    )
}

export default Session
