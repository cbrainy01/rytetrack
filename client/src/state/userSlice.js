import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { Redirect } from "react-router";
// Reducer
// export const fetchUser = createAsyncThunk("user/signup", (signupData) => {
// console.log(signupData)
//    return fetch("/users", {
//         method: "POST",
//         headers: {"Content-Type": "application/json",},
//         body: JSON.stringify(/**signupData which should be an object */signupData)
//       })
//       .then( r => r.json() )
//       .then( rData => { console.log("RDATA IS: ", rData); return rData} )
// })
export const fetchUserInfo = createAsyncThunk("me/fetchUserInfo",
    async (userToken) => {
        const response = await fetch("/me", {
            method: "GET",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${userToken}`,}
        })
        if(response.ok) {
            const rData = await response.json();
            return rData;
        }

    }
                     // RESPONSE SHOULD LOOK LIKE THIS
    // {
    //     "user": {
    //         "id": 11,
    //         "first_name": "lilly",
    //         "last_name": "sing",
    //         "username": "lillysing",
    //         "email": "lsing@gmail.com",
    //         "password_digest": "$2a$12$EohBRP5EMvP3n1wRZKCmzestQMysVMgz9PwPu6tEOuarFW9OsERxi",
    //         "created_at": "2021-09-29T03:25:41.158Z",
    //         "updated_at": "2021-09-29T03:25:41.158Z"
    //     }
    // }
)

export const userLoginAsync = createAsyncThunk("login/userLoginAsync",
    async (loginData) => {

        const response = await fetch("/login", {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify(loginData)
        })
        // WHAT RESPONSE LOOKS LIKE
        // {
        //     "token": "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMX0.5zOZGKbQcwKG-NTPOwQFUGAqqRDoaL79zRzUM4X22ck"
        // }
        if(response.ok) {
            const rData = await response.json();
            return rData;
        }
    }    
)

export const signUpUserAsync = createAsyncThunk("users/signUpUserAsync", 
    async (signupData) => {

        const response = await fetch('/users', {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify(/**signupData which should be an object */signupData)
        });
        // WHAT RESPONSE LOOKS LIKE
        // {
        //     "message": "user sucessfully signed up",
        //     "user": {
        //         "id": 32,
        //         "first_name": "Susy",
        //         "last_name": "Mai",
        //         "username": "susymai",
        //         "email": "smai@gmail.com",
        //         "password_digest": "$2a$12$xUsrP2B7FkS/pFkyPIkg8exL2s89EaVj1glYVzoqGX.Td14LR70mO",
        //         "created_at": "2021-09-29T20:32:54.795Z",
        //         "updated_at": "2021-09-29T20:32:54.795Z"
        //     },
        //     "token": "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozMn0.NElbt0IC7WJaw9S2a7AW-ySJnJxf9h3aLsBqI-D1NKU"
        // }


        if(response.ok) {
            const rData = await response.json();
            return rData;
        }
    }
)

const initialState = {
    entities: [],
    user: null,
    status: "idle",
    errors: []
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {  
        
        userLogout(state, action) {
            localStorage.removeItem("token")
            state.user = null
            state.status = "idle"
            state.entities = []
            state.errors = []
          
        }

    },
    extraReducers: {
        // [fetchUser.pending](state) {state.status = "loading"},
        // [fetchUser.fulfilled](state, action) {
        //     // state.status = "idle",
        //     state.entities = action.payload
        // },
    
        [signUpUserAsync.fulfilled](state, action) {state.entities.push("sucessfully signed up"); localStorage.setItem("token", action.payload.token); state.status = "idle"; state.user = action.payload.user},
        [signUpUserAsync.pending](state) {state.status = "loading"},
        [signUpUserAsync.rejected](state) {state.errors.push("rejected for some reason") },

        [userLoginAsync.fulfilled](state, action) {localStorage.setItem("token", action.payload.token); state.status = "idle"; state.user = action.payload.user},
        [userLoginAsync.pending](state) {state.status = "loading"},
        [userLoginAsync.rejected](state) {state.errors.push("rejected for some reason") },

        [fetchUserInfo.fulfilled](state, action) { state.user = action.payload.user; state.status = "idle" },
        [fetchUserInfo.pending](state) {state.status = "loading"},
        [fetchUserInfo.rejected](state) {state.errors.push("rejected for some reason") },
    }
})

export const { userLogout } = userSlice.actions
export default userSlice.reducer