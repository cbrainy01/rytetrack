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
            <br/><button onClick={onBack}> go back</button><br/>
            <button onClick={handleDelete}>delete session</button><br/>
            <button>edit session</button><br/>
            <button>use this session as a template</button>
        </div>
    )
}

export default Session
