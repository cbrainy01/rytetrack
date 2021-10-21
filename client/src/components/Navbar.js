import React from 'react'
import { Link, /**NavLink*/ } from "react-router-dom"
import { userLogout } from '../state/userSlice'
import { exerciseLogout } from '../state/exerciseSlice'
import { sessionLogout } from '../state/sessionSlice'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from "./NavbarElements"




function Navbar() {
    const history = useHistory()
    const dispatch = useDispatch()

    const isAuthorized = useSelector(state => state.user.isAuthorized)
    return (
        <div>
                <Nav>
                    <NavLink to="/">
                        <h1>Logo</h1>
                    </NavLink>
                    
                    <Bars />
                    <NavMenu>
                        {/* <NavLink to="/signup" activeStyle>
                            Signup
                        </NavLink>
                        <NavLink to="/login" activeStyle>
                            Login
                        </NavLink> */}
                        <NavLink to="/" activeStyle>
                            Home
                        </NavLink>
                        <NavLink to="/exercises" activeStyle>
                            Exercises
                        </NavLink>
                        <NavLink to="/sessions" activeStyle>
                            Sessions
                        </NavLink>
                        <NavLink to="/statistics" activeStyle>
                            Statistics
                        </NavLink>
                        {isAuthorized ? null : <NavBtn><NavBtnLink to="/signup">Sign up</NavBtnLink></NavBtn>}
                        {isAuthorized ? null : <NavBtn><NavBtnLink to="/login">Login</NavBtnLink></NavBtn>}
                        {isAuthorized ? 
                        <NavBtn
                        onClick={ () => { 
                            dispatch( exerciseLogout() );
                            dispatch( sessionLogout() );
                            dispatch( userLogout(history) );
                            } }
                        ><NavBtnLink to="/login">logout</NavBtnLink></NavBtn>
                        : null}
                        
                        
                    </NavMenu>
                </Nav>
             {/* <nav>
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
            <li>
                <Link  to="/statistics">Statistics</Link>
            </li>
            </nav> */}
            {/* add dispatch for sessionLogout */}
           
           {/* <button onClick={ () => { 
                dispatch( exerciseLogout() );
                dispatch( sessionLogout() );
                dispatch( userLogout(history) );
                } }>logout</button> */}
        </div>
    )
}

export default Navbar
