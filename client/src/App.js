import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Switch, Route, Redirect } from "react-router";
import Login from './components/Login';
import Signup from "./components/Signup"
import Home from "./components/Home"
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo } from './state/userSlice';
import { persistExercisesAsync } from './state/exerciseSlice';
import { persistSessionsAsync } from './state/sessionSlice';
import Loader from 'react-spinners/RingLoader';
import Exercises from './components/exercise/Exercises';
import Sessions from './components/session/Sessions';
import BarChart from "./components/BarChart"


function App() {

  const userInfo = useSelector(state => state.user)
  const isAuthorized = useSelector( state => state.user.isAuthorized )
  // const errors = useSelector( state => state.user.errors )
  const status = useSelector( state => state.user.status )

  console.log("CURRENT USER INFO: ", userInfo)
  const dispatch = useDispatch()

  useEffect( () => {
    dispatch( fetchUserInfo(localStorage.token) )
    dispatch( persistExercisesAsync(localStorage.token) )
    dispatch( persistSessionsAsync() )
    // dispatch action for persisting exercises
    
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
          {isAuthorized ? <Redirect to="/sessions"/> : <Signup/> }
        </Route>
        <Route exact path="/login">
        {isAuthorized ? <Redirect to="/sessions"/> : <Login/> }
        </Route>
        <Route exact path="/exercises">
        {isAuthorized ? <Exercises/> : <Redirect to="/login"/> }
        </Route>
        <Route exact path="/sessions">
        {isAuthorized ? <Sessions/> : <Redirect to="/login"/> }
        </Route>
        <Route exact path="/statistics">
        {isAuthorized ? <BarChart/> : <Redirect to="/login"/> }
        </Route>
        <Route exact path="/">
        {isAuthorized ? <Home /> : <Redirect to="/login"/>}
        </Route>
      </Switch>}
    </>
  )
}

export default App
 