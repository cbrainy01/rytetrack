import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Switch, Route, useHistory, Redirect } from "react-router";
import Login from "./Login"
import Signup from "./Signup"
import Home from "./Home"
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo } from './state/userSlice';
import Loader from 'react-spinners/RingLoader';


function App() {

  const userInfo = useSelector(state => state.user)
  const isAuthorized = useSelector( state => state.user.isAuthorized )
  const errors = useSelector( state => state.user.errors )
  const status = useSelector( state => state.user.status )

  console.log("CURRENT USER INFO: ", userInfo)
  const dispatch = useDispatch()

  useEffect( () => {
    dispatch( fetchUserInfo(localStorage.token) )
  }, [dispatch])

  return (
    <>
      <p>Rytetrack</p>
      <p>{userInfo.user ? userInfo.user.username : "nobody" } is logged in</p>
      <Navbar/>
      {/* <Loader/> */}
      {status === "loading" ? <Loader/> : 
      <Switch>
        <Route exact path="/signup">
          {/* check local storage. if theres a token, go to home */}
          {isAuthorized ? <Redirect to="/"/> : <Signup/> }
          {/* <Signup /> */}
        </Route>
        <Route exact path="/login">
        {isAuthorized ? <Redirect to="/"/> : <Login/> }
          {/* <Login  /> */}
        </Route>
        <Route exact path="/">
          {isAuthorized ? <Home /> : <Redirect to="/login"/>}
        </Route>
      </Switch>}
    </>
  )
}

export default App
 