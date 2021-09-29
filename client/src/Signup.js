// import React from 'react'
import React from 'react'
import {useForm} from "react-hook-form"
import {signUpUserAsync} from "./state/userSlice"
import {useDispatch, useSelector} from "react-redux"
import { Redirect } from "react-router-dom"

function Signup() {

    const user = useSelector(state => state.user.entities)
    console.log("USER: ", user)
    const dispatch = useDispatch()
    // const user = useSelector(state => state.user.entities)
    // console.log("USER IS: ", user)

    const {register, handleSubmit} = useForm();
    // console.log(errors)
    // const register = useForm().register
    // const handleSubmit = useForm().register

    // if(user.first === 'sucessfully signed up') {
    //     <Redirect from="/signup" to="/login"/>
    // }

    return (    
    <div>
        <form onSubmit={handleSubmit( (data, e) => {e.preventDefault(); console.log(data); dispatch( signUpUserAsync(data) );  } )}>
            <input type="text" placeholder="firstName" name="first_name" {...register("first_name", {required: true})}/><br/>
            <input type="text" placeholder="lastName" name="last_name" {...register("last_name")}/><br/>
            <input type="text" placeholder="userName" name="username" {...register("username")}/><br/>
            <input type="text" placeholder="email" name="email" {...register("email")}/><br/>
            <input type="password" placeholder="password" name="password" {...register("password")}/><br/>
            <input type="password" placeholder="passwordConfirmation" name="password_confirmation" {...register("password_confirmation")}/><br/>
            <input type="submit" />
        </form>
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
