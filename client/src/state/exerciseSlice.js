import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    exercises: [],
    status: "idle",
    createErrors: null,
    rejectionError: [],
}

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
        // fData.append("demo_pic", newExerciseInfo.demo_pic)
        // newExerciseInfo.forEach( (bitOfInfo) => fData.append(`${bitOfInfo}`, bitOfInfo) ) !!refactor
        
     
        // REFACTOR!!!!!!!!!
        const details = Object.keys(newExerciseInfo)
        details.forEach( (detail) => {
            if(detail !== "demos") { fData.append(`${detail}`, newExerciseInfo[detail]) }
            else {  if(newExerciseInfo[detail].length > 0 ) { newExerciseInfo[detail].forEach( (demo) => fData.append('demos[]', demo) ) }  }
        } )
        
        // if(newExerciseInfo.demos.length > 0 ) { newExerciseInfo.demos.forEach( (demo) => fData.append('demos[]', demo) ) }
        // fData.append("name", newExerciseInfo.name)
        // fData.append("description", newExerciseInfo.description)
        // fData.append("is_cardio", newExerciseInfo.is_cardio)
        // fData.append("timestamp", newExerciseInfo.timestamp)
        // fData.append("youtube_url", newExerciseInfo.youtube_url)
        // fData.append("section", newExerciseInfo.section)
        const response = await fetch("/exercises", {
            method: "POST",
            headers: { "Authorization": `Bearer ${localStorage.token}`,},
            body: fData,
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
        [createExerciseAsync.rejected](state) {state.rejectionError.push("didnt work for some reason")},

        [deletePicAsync.fulfilled](state, action) {
            if(action.payload.exercise) { state.exercises.push(action.payload.exercise); state.status = "idle"}
            else {state.rejectionError.push(action.payload.error); state.status = "idle"}
        },
        [deletePicAsync.pending](state) {state.status = "loading"; state.exercises = []},
        [deletePicAsync.rejected](state) {state.rejectionError.push("didnt work for some reason")},

    }


}) 

// export const {  } = exerciseSlice.actions 
export default exerciseSlice.reducer