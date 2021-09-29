import React from 'react'
import { Link } from "react-router-dom"
import { userLogout } from './state/userSlice'
import { useDispatch } from 'react-redux'

function Navbar() {
    
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
            </nav>
            <button onClick={() => dispatch( userLogout() )}>logout</button>
        </div>
    )
}

export default Navbar
