import React from 'react'
import Navbar from './Navbar'
import { Switch, Route, useHistory } from "react-router";

function App() {
  return (
    <>
      <p>Rytetrack</p>
      <Navbar/>
      {/* <Switch>
        <Route exact path="/signup">
          <Signup onSignUp={handleSignUp}/>
        </Route>
        <Route exact path="/login">
          <Login onLogin={handleLogin}/>
        </Route>
        <Route exact path="/">
          <Home/>
        </Route>
      </Switch> */}
    </>
  )
}

export default App
