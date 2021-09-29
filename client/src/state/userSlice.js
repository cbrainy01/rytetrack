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
            // console.log("JSON RESP: ", response.json())
            const rData = await response.json();
            return rData;
        }
    }
)

const initialState = {
    entities: [],
    status: "idle",
    page: "/",
    reject_status: ""
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {  
        
        // userSignUp(state, action) {
        //     state.entities = action.payload
        //     state.page = "/"
        // }

    },
    extraReducers: {
        // [fetchUser.pending](state) {state.status = "loading"},
        // [fetchUser.fulfilled](state, action) {
        //     // state.status = "idle",
        //     state.entities = action.payload
        // },
        [signUpUserAsync.fulfilled](state, action) {state.entities.push("sucessfully signed up"); state.status = "idle"},
        [signUpUserAsync.pending](state) {state.status = "loading"},
        [signUpUserAsync.rejected](state) {state.reject_status = "rejected for some reason"},
    }
})

// export const { userSignUp } = userSlice.actions
export default userSlice.reducer