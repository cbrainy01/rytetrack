import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Switch, Route, useHistory } from "react-router";
import Login from "./Login"
import Signup from "./Signup"
import Home from "./Home"
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo } from './state/userSlice';
import Loader from 'react-spinners/RingLoader';


function App() {

  const user = useSelector(state => state.user.user)
  console.log("CURRENT USER: ", user)
  const dispatch = useDispatch()
  useEffect( () => {
    dispatch( fetchUserInfo(localStorage.token) )
  }, [dispatch])

  return (
    <>
      <p>Rytetrack</p>
      <Navbar/>
      {/* <Loader/> */}
      <Switch>
        <Route exact path="/signup">
          <Signup /*onSignUp={handleSignUp}*/ />
        </Route>
        <Route exact path="/login">
          <Login /*onLogin={handleLogin}*/ />
        </Route>
        <Route exact path="/">
          {/* <Home/> */}
        </Route>
      </Switch>
    </>
  )
}

export default App
 