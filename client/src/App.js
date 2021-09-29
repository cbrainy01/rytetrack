import React from 'react'
import Navbar from './Navbar'
import { Switch, Route, useHistory } from "react-router";
import Login from "./Login"
import Signup from "./Signup"
import Home from "./Home"

function App() {
  return (
    
    
    <>
      <p>Rytetrack</p>
      <Navbar/>
      <Switch>
        <Route exact path="/signup">
          <Signup /*onSignUp={handleSignUp}*/ />
        </Route>
      
        <Route exact path="/">
          {/* <Home/> */}
        </Route>
      </Switch>
    </>
  )
}

export default App
  // <Route exact path="/login">
  //         <Login /*onLogin={handleLogin}*/ />
  //       </Route>