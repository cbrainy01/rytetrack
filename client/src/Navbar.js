import React from 'react'
import { Link } from "react-router-dom"
import { userLogout } from './state/userSlice'
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
                <Link  to="/workouts">Workouts</Link>
            </li>
            </nav>
            <button onClick={() => dispatch( userLogout(history) )}>logout</button>
        </div>
    )
}

export default Navbar
