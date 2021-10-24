// import React from 'react'
import React from 'react'
import {useForm} from "react-hook-form"
import { signUpUserAsync } from '../state/userSlice'
import {useDispatch, useSelector} from "react-redux"
import { v4 as uuid } from "uuid"

function Signup() {

    // const user = useSelector(state => state.user.entities)
    const signupErrors = useSelector(state => state.user.signupErrors)
    const dispatch = useDispatch()

    const {register, handleSubmit} = useForm();

    return (    
    <div>
        <h1>Signup</h1>
        <form onSubmit={handleSubmit( (data, e) => {e.preventDefault(); console.log(data); dispatch( signUpUserAsync(data) ); } )}>
            <input type="text" placeholder="firstName" name="first_name" {...register("first_name", {required: true})}/><br/>
            <input type="text" placeholder="lastName" name="last_name" {...register("last_name")}/><br/>
            <input type="text" placeholder="userName" name="username" {...register("username")}/><br/>
            <input type="text" placeholder="email" name="email" {...register("email")}/><br/>
            <input type="password" placeholder="password" name="password" {...register("password")}/><br/>
            <input type="password" placeholder="passwordConfirmation" name="password_confirmation" {...register("password_confirmation")}/><br/>
            <input type="submit" />
        </form>
        {signupErrors? signupErrors.map( (error) => <p key={uuid()} style={{color: "red"}}>-{error}</p> ) : null }
    </div>
        // <div>
        //     <form onSubmit={handleSubmit(onSubmit)}>
        //         <input type="text" placeholder="firstName" name="first_name" {...register("first_name", {required: true})}/><br/>
        //         <input type="text" placeholder="lastName" name="last_name" {...register("last_name")}/><br/>
        //         <input type="text" placeholder="userName" name="username" {...register("username")}/><br/>
        //         <input type="text" placeholder="email" name="email" {...register("email")}/><br/>
        //         <input type="password" placeholder="password" name="password" {...register("password")}/><br/>
        //         <input type="password" placeholder="passwordConfirmation" name="passwordConfirmation" {...register("passwordConfirmation")}/><br/>
        //         <input type="submit" />
        //     </form>
        // </div>
    )
}
// value="sign up"
export default Signup
