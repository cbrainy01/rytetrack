import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    exercises: [],
    status: "idle",
    createErrors: [],
    rejectionError: [],
}

export const createExerciseAsync = createAsyncThunk("exercises/createExercise",
    async (newExerciseInfo, userToken) => {
        const response = await fetch("/exercises", {
            method: "POST",
            headers: {"Content-Type": "application/json", "Authorization": `Bearer ${userToken}`,},
            body: JSON.stringify(newExerciseInfo)
        })

        if(response.ok) {const rData = await response.json(); return rData}
        else { const badResponse = await response.json(); return badResponse }
    }

)

const exerciseSlice = createSlice({
    name: 'exercise',
    initialState: initialState,
    reducers: {

    },
    extraReducers: {
        [createExerciseAsync.fulfilled](state, action) {
            if(action.payload.errors) {state.createErrors = action.payload.errors; state.status = "idle"}
            else { state.exercises.push(action.payload.exercise); state.status = "idle" }
        },
        [createExerciseAsync.pending](state) {state.status = "loading"},
        [createExerciseAsync.rejected](state) {state.rejectionError.push("didnt work for some reason")}
    }


}) 

// export const {  } = exerciseSlice.actions 
export default exerciseSlice.reducer