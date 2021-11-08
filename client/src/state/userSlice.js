import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

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
        else { const unauthorizedMessage = await response.json(); return unauthorizedMessage}
        //  else if(response.status === 401) {
        //      console.log("TEST: ", response)
        //     return response.error
        // }

    }
                     // GOOD RESPONSE LOOKS LIKE THIS
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
        // WHAT Good RESPONSE LOOKS LIKE
        // {
        //     "token": "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMX0.5zOZGKbQcwKG-NTPOwQFUGAqqRDoaL79zRzUM4X22ck"
        // }
        // WHAT BAD RESPONSE LOOKS LIKE
        // { error: "Invalid username or password" }
        if(response.ok) {
            const rData = await response.json();
            return rData;
        }
        else { const rData = await response.json() ; return rData }
    }    
)

export const signUpUserAsync = createAsyncThunk("users/signUpUserAsync", 
    async (signupData) => {

        const response = await fetch('/users', {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify(/**signupData which should be an object */signupData)
        });
        // WHAT GOOD RESPONSE LOOKS LIKE
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
        else {const errors = await response.json(); return errors}
    }
)

const initialState = {
    entities: [],
    user: null,
    status: "idle",
    errors: [],
    loginError: null,
    signupErrors: null,
    isAuthorized: false,
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
            state.loginError = null
            state.signupErrors = null
            state.isAuthorized = false
          
        }



    },
    extraReducers: {
        // [fetchUser.pending](state) {state.status = "loading"},
        // [fetchUser.fulfilled](state, action) {
        //     // state.status = "idle",
        //     state.entities = action.payload
        // },
    
        [signUpUserAsync.fulfilled](state, action) {
            if(action.payload.token) {localStorage.setItem("token", action.payload.token); state.status = "idle"; delete action.payload["token"]; state.user = action.payload; state.signupErrors = null; state.isAuthorized = true }
            // if(action.payload.token) {state.entities.push("sucessfully signed up"); localStorage.setItem("token", action.payload.token); state.status = "idle"; state.user = action.payload.user}
            // if(action.payload.user) {state.entities.push("sucessfully signed up"); localStorage.setItem("token", action.payload.token); state.status = "idle"; state.user = action.payload.user}
            else {state.signupErrors = action.payload.errors; state.status = "idle"}          
        },
        [signUpUserAsync.pending](state) {state.status = "loading"},
        [signUpUserAsync.rejected](state) {state.errors.push("rejected for some reason") },

        [userLoginAsync.fulfilled](state, action) {
            // its gonna be: action.payload.meta.token with conditional being if action.payload.meta.token
            // if(action.payload.meta.token) { localStorage.setItem("token", action.payload.meta.token); state.status = "idle"; state.user = action.payload.user; state.loginError = null; state.isAuthorized = true}
            // if(action.payload) {state.entities.push(action.payload)}

            if(action.payload.token) {localStorage.setItem("token", action.payload.token); state.status = "idle"; delete action.payload["token"]; state.user = action.payload; state.loginError = null; state.isAuthorized = true }
            else {state.loginError = action.payload.error; state.status = "idle"; }
        },
        [userLoginAsync.pending](state) {state.status = "loading"},
        [userLoginAsync.rejected](state) {state.errors.push("rejected for some reason") },

        [fetchUserInfo.fulfilled](state, action) { 
            // if(action.payload.error) {state.errors.push(action.payload.error); state.status = "idle" }
            // else { state.user = action.payload.user; state.status = "idle" } 
            if(action.payload.username) { state.user = action.payload; state.status = "idle"; state.isAuthorized = true}
             else {state.isAuthorized = false; state.status = "idle"}
        },
        [fetchUserInfo.pending](state) {state.status = "loading"},
        [fetchUserInfo.rejected](state) { state.status = "idle"; state.errors.push("rejected for some reason") },
    }
})

export const { userLogout } = userSlice.actions
export default userSlice.reducer