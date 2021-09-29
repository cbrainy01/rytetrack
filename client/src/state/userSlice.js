import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
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
    async (signupData, history) => {

        const response = await fetch('/users', {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify(/**signupData which should be an object */signupData)
        });
        // WHAT RESPONSE LOOKS LIKE
        // {
        //     "message": "user sucessfully signed up",
        //     "created_user": {
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


        if(response.ok) {
            const rData = await response.json();
            return rData;
        }
    }
)

const initialState = {
    entities: [],
    user: [],
    status: "idle",
    errors: []
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {  
        
        userLogout(state, action) {
            localStorage.removeItem("token")
        }

    },
    extraReducers: {
        // [fetchUser.pending](state) {state.status = "loading"},
        // [fetchUser.fulfilled](state, action) {
        //     // state.status = "idle",
        //     state.entities = action.payload
        // },
        [signUpUserAsync.fulfilled](state, action) {state.entities.push("sucessfully signed up"); state.status = "idle"},
        [signUpUserAsync.pending](state) {state.status = "loading"},
        [signUpUserAsync.rejected](state) {state.errors.push("rejected for some reason") },

        [userLoginAsync.fulfilled](state, action) {localStorage.setItem("token", action.payload.token); state.status = "idle"},//!!!!!!!!
        [userLoginAsync.pending](state) {state.status = "loading"},
        [userLoginAsync.rejected](state) {state.errors.push("rejected for some reason") },

        [fetchUserInfo.fulfilled](state, action) { /*push user info into entities*/state.user.push(action.payload.user) },
        [fetchUserInfo.pending](state) {state.status = "idle"},
        [fetchUserInfo.rejected](state) {state.errors.push("rejected for some reason") },
    }
})

export const { userLogout } = userSlice.actions
export default userSlice.reducer