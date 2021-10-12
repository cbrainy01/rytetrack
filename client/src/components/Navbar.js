import React from 'react'
import { Link } from "react-router-dom"
import { userLogout } from '../state/userSlice'
import { exerciseLogout } from '../state/exerciseSlice'
import { sessionLogout } from '../state/sessionSlice'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

function Navbar() {
    const history = useHistory()
    const dispatch = useDispatch()
    
    return (
        <div>
             <nav>
             <li>
                <Link to="/signup"> Signup</Link>
            </li>
            <li>
                <Link  to="/login"> Login</Link>
            </li>
            <li>
                <Link  to="/"> Home</Link>
            </li>
            <li>
                <Link  to="/exercises">Exercises</Link>
            </li>
            <li>
                <Link  to="/sessions">Sessions</Link>
            </li>
            </nav>
            {/* add dispatch for sessionLogout */}
            <button onClick={ () => { 
                dispatch( exerciseLogout() );
                dispatch( sessionLogout() );
                dispatch( userLogout(history) );
                } }>logout</button>
        </div>
    )
}

export default Navbar
