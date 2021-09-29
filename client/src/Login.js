import React from 'react'
import {useForm} from "react-hook-form"
import { useDispatch } from 'react-redux';
import { userLoginAsync } from './state/userSlice';

function Login() {
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm();
    // console.log("LS: ", localStorage)

    
    return (
        <div>
            <h1>Login page</h1>
            Enter credentials
            <form onSubmit={handleSubmit( (data, e) => {e.preventDefault(); console.log("LOGIn Data: ", data); dispatch( userLoginAsync(data) )  } )}>
                <input type="text" placeholder="userName" name="username" {...register("username")}/><br/>
                <input type="password" placeholder="password" name="password" {...register("password")}/><br/>
                <input type="submit" />
            </form>
        </div>
    )
}

export default Login
