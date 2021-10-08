import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


const initialState = {
    exercises: [],
    status: "idle",
    createErrors: null,
    rejectionError: [],
}
// state.exercises
export const deletePicAsync = createAsyncThunk("exercises/deletePic",
    async (exerciseId) => {
        const response = await fetch(`/purge/${exerciseId}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${localStorage.token}`, },
        })
        if(response.ok) {const rData = await response.json(); return rData}
        // response should be the exercise but without the deleted demo pic
        else { const badResponse = await response.json(); return badResponse }
    }
)

export const createExerciseAsync = createAsyncThunk("exercises/createExercise",
    async (newExerciseInfo) => {
        const fData = new FormData()
        
        // REFACTOR!!!!!!!!!
        const details = Object.keys(newExerciseInfo)
        details.forEach( (detail) => {
            if(detail !== "demos") { fData.append(`${detail}`, newExerciseInfo[detail]) }
            else {  if(newExerciseInfo[detail].length > 0 ) { newExerciseInfo[detail].forEach( (demo) => fData.append('demos[]', demo) ) }  }
        } )
        
        const response = await fetch("/exercises", {
            method: "POST",
            headers: { "Authorization": `Bearer ${localStorage.token}`,},
            body: fData,
        })

        if(response.ok) {const rData = await response.json(); return rData}
        else { const badResponse = await response.json(); return badResponse }
    }

)

export const getExercisesAsync = createAsyncThunk("exercises/my_exercises",
    async (loginData) => {
        const response = await fetch("/my_exercises", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(loginData)
        }) 

        if(response.ok) {const rData = await response.json(); return rData}
        else { const badResponse = await response.json(); return badResponse }
    }
)

export const persistExercisesAsync = createAsyncThunk("exercises/persist_exercises",
    async (userToken) => {
        const response = await fetch("/persist_exercises", {
            method: "GET",
            headers: {"Content-Type": "application/json", "Authorization": `Bearer ${userToken}`,}
        })
        if(response.ok) {
            const rData = await response.json();
            return rData;
        }
        else { const unauthorizedMessage = await response.json(); return unauthorizedMessage}
    }

)

const exerciseSlice = createSlice({
    name: 'exercise',
    initialState: initialState,
    reducers: {

        exerciseLogout(state, action) { state.exercises = []}
    },
    extraReducers: {
        [createExerciseAsync.fulfilled](state, action) {
            if(action.payload.errors) {state.createErrors = action.payload.errors; state.status = "idle"}
            else { state.exercises.push(action.payload); state.status = "idle" }
        },
        [createExerciseAsync.pending](state) {state.status = "loading"},
        [createExerciseAsync.rejected](state) {state.rejectionError.push("didnt work for some reason")},

        [deletePicAsync.fulfilled](state, action) {
            if(action.payload.exercise) { state.exercises.push(action.payload.exercise); state.status = "idle"}
            else {state.rejectionError.push(action.payload.error); state.status = "idle"}
        },
        [deletePicAsync.pending](state) {state.status = "loading"; state.exercises = []},
        [deletePicAsync.rejected](state) {state.rejectionError.push("didnt work for some reason")},

        [getExercisesAsync.fulfilled](state, action) {
            if(action.payload.error) {state.rejectionError = action.payload.error}
            else {state.exercises = action.payload}
        },
        [persistExercisesAsync.fulfilled](state, action) {
            if(action.payload.length > 0) {state.exercises = action.payload}
        }

    }


}) 

export const { exerciseLogout } = exerciseSlice.actions 
export default exerciseSlice.reducer