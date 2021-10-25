import React from 'react'
import {useForm} from "react-hook-form"
import { useDispatch } from 'react-redux';
import { userLoginAsync } from '../state/userSlice';
// import { userLoginAsync } from './state/userSlice';
import { useSelector } from 'react-redux';
import { getExercisesAsync } from '../state/exerciseSlice';
import { getSessionsAsync } from '../state/sessionSlice';
import "../styling/login.css"

function Login() {
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm();
    const loginError = useSelector(state => state.user.loginError)

    
    return (
        <div className="bdy">
            <div className="center">
                <h1>Login</h1>
                <form onSubmit={handleSubmit( (data, e) => {
                    e.preventDefault();
                    console.log("LOGIn Data: ", data); 
                    dispatch( userLoginAsync(data) ); 
                    dispatch( getExercisesAsync(data) );
                    dispatch( getSessionsAsync(data) )  
                    } )}>
                    <div className="input_field"><input type="text" placeholder=" " name="username" {...register("username")}/><span></span><label>Username:</label> </div>
                    <div className="input_field"><input type="password" placeholder="" name="password" {...register("password")}/><span></span><label>Password:</label> </div>
                    
                    
                    <input className="key" type="submit" />
                </form>
                {loginError? <p style={{color: "red"}}>{loginError}</p>: null}
                <p>New to Rytetrack? <a>Sign up</a></p> 
            </div>
            
        </div>
    )
}

export default Login
