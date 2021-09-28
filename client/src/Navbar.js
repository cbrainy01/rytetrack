import React from 'react'
import { Link } from "react-router-dom"

function Navbar() {
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
        </div>
    )
}

export default Navbar
