import React from 'react'
import { Link, /**NavLink*/ } from "react-router-dom"
import { userLogout } from '../state/userSlice'
import { exerciseLogout } from '../state/exerciseSlice'
import { sessionLogout } from '../state/sessionSlice'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from "./NavbarElements"
import { fetchUserInfo } from '../state/userSlice'




function Navbar() {
    const history = useHistory()
    const dispatch = useDispatch()

    const isAuthorized = useSelector(state => state.user.isAuthorized)
    function handleStatisticsClick() {
        if(isAuthorized) { dispatch( fetchUserInfo(localStorage.token) ) }
    }

    return (
        <div>
                <Nav>
                    <NavLink to="/">
                        <h1 style={{fontSize: "3.5em"}}>Rytetrack</h1>
                    </NavLink>
                    
                    <Bars />
                    <NavMenu>
                        
                        {/* <NavLink to="/" activeStyle>
                            Home
                        </NavLink> */}
                        <NavLink to="/exercises" activeStyle>
                            Exercises
                        </NavLink>
                        <NavLink to="/sessions" activeStyle>
                            Sessions
                        </NavLink>
                        <NavLink onClick={handleStatisticsClick} to="/statistics" activeStyle>
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
      
        </div>
    )
}

export default Navbar
