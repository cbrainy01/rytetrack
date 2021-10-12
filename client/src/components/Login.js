import React from 'react'
import {useForm} from "react-hook-form"
import { useDispatch } from 'react-redux';
import { userLoginAsync } from '../state/userSlice';
// import { userLoginAsync } from './state/userSlice';
import { useSelector } from 'react-redux';
import { getExercisesAsync } from '../state/exerciseSlice';
import { getSessionsAsync } from '../state/sessionSlice';

function Login() {
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm();
    const loginError = useSelector(state => state.user.loginError)

    
    return (
        <div>
            <h1>Login page</h1>
            Enter credentials
            {/* add dispatch for getsessions */}
            <form onSubmit={handleSubmit( (data, e) => {
                e.preventDefault();
                console.log("LOGIn Data: ", data); 
                dispatch( userLoginAsync(data) ); 
                dispatch( getExercisesAsync(data) );
                dispatch( getSessionsAsync(data) )  
                } )}>
                <input type="text" placeholder="userName" name="username" {...register("username")}/><br/>
                <input type="password" placeholder="password" name="password" {...register("password")}/><br/>
                <input type="submit" />
            </form>
            {loginError? <p style={{color: "red"}}>{loginError}</p>: null}
        </div>
    )
}

export default Login
