import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    exercises: [],
    status: "idle",
    createErrors: null,
    rejectionError: [],
}

export const createExerciseAsync = createAsyncThunk("exercises/createExercise",
    async (newExerciseInfo, token) => {
        const fData = new FormData()
        fData.append("demo_pic", newExerciseInfo.demo_pic)
        fData.append("name", newExerciseInfo.name)
        fData.append("description", newExerciseInfo.description)
        fData.append("is_cardio", newExerciseInfo.is_cardio)
        const response = await fetch("/exercises", {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}`,},
            body: fData,
            // body: JSON.stringify(newExerciseInfo)
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
            if(action.payload.error) {state.createErrors = action.payload.error; state.status = "idle"}
            else { state.exercises.push(action.payload); state.status = "idle" }
        },
        [createExerciseAsync.pending](state) {state.status = "loading"},
        [createExerciseAsync.rejected](state) {state.rejectionError.push("didnt work for some reason")}
    }


}) 

// export const {  } = exerciseSlice.actions 
export default exerciseSlice.reducer