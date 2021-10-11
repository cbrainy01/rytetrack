import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


const initialState = {
    exercises: [],
    status: "idle",
    createErrors: null,
    rejectionError: [],
    editErrors: null,
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

export const removePicAsync = createAsyncThunk("exercises/removePic",
    async (picInfo) => {
        // const stringy = JSON.stringify(picInfo.url)
        const response = await fetch(`/remove_pic/${picInfo.exercise_id}/${picInfo.picId}`, {
            method: "PATCH",
            headers: { "Authorization": `Bearer ${localStorage.token}`, },
            body: JSON.stringify({url: picInfo.url})
        })
        if(response.ok) {const rData = await response.json(); return rData}
        else { const badResponse = await response.json(); return badResponse }
    }
)

export const removeVideoAsync = createAsyncThunk("exercises/removeVideo",
    async (exerciseId) => {
        const response = await fetch(`/remove_vid/${exerciseId}`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.token}` },
        })
        if(response.ok) {const rData = await response.json(); return rData}
        else { const badResponse = await response.json(); return badResponse }
    }
)

export const deleteExerciseAsync = createAsyncThunk("exercises/deleteExercise",
    async (exerciseId) => {
        const response = await fetch(`/exercises/${exerciseId}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json", "Authorization": `Bearer ${localStorage.token}`,}            
        })
        if(response.ok) {const rData = await response.json(); return rData}
        else { const badResponse = await response.json(); return badResponse }
    }
)

export const createExerciseAsync = createAsyncThunk("exercises/createExercise",
    async (newExerciseInfo) => {
        const fData = new FormData()
        
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

export const editExerciseAsync = createAsyncThunk( "exercises/editExercise",
    async (editInfo) => {
        const response = await fetch(`exercises/${editInfo.id}`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.token}`,},
            body: JSON.stringify(editInfo.info)
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

        exerciseLogout(state, action) { state = initialState}
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
        },
        [deleteExerciseAsync.fulfilled](state, action) {
            if(action.payload.message) {
                state.exercises = state.exercises.filter( (exercise) => exercise.id !== action.payload.deletedId);
                state.status = "idle" 
            }
            else {state.rejectionError.push(action.payload)}
        },
        [deleteExerciseAsync.pending](state) { state.status = "loading"},
        [deleteExerciseAsync.rejected](state) { state.rejectionError.push("didnt delete sucessfully")},
        [removeVideoAsync.fulfilled](state, action) {
            if(action.payload.message) {
                const exercise = state.exercises.find( (exercise) => exercise.id === action.payload.updatedId )
                exercise.youtube_url = ""
            };
            state.status = "idle"
        },
        [removeVideoAsync.pending](state) { state.status = "loading"},
        [removeVideoAsync.rejected](state) { state.rejectionError.push("didnt delete vid sucessfully")},

        [removePicAsync.fulfilled](state, action) {
            if(action.payload.pic_id) {
                state.status = "idle";
                state.exercises = state.exercises.map( (exercise) => {
                    if(exercise.id === action.payload.exercise_id){
                        exercise.demos = exercise.demos.filter( (demo) => demo.id !== action.payload.pic_id )
                        return exercise
                    } 
                    else {return exercise}
                })
            }
        },
        [removePicAsync.pending](state) { state.status = "loading"},
        [removePicAsync.rejected](state) { state.rejectionError.push("didnt delete pic sucessfully")},

        [editExerciseAsync.fulfilled](state, action) {
            if(action.payload.name) { 
                state.status = "idle";
                state.editErrors = null
                state.exercises = state.exercises.map( (exercise) => {
                    if(exercise.id === action.payload.id) {return action.payload}
                    else {return exercise}
                } )
            }
            else {state.editErrors = action.payload.errors}
            // else {state.editErrors = action.payload.errors}
        },
        [editExerciseAsync.pending](state) { state.status = "loading"},


    }


}) 

export const { exerciseLogout } = exerciseSlice.actions 
export default exerciseSlice.reducer