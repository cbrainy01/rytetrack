import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    sessions: [],
    status: "idle",
    createErrors: null,
    editErrors: null,
    showErrors: null,
    rejectionErrors: [],
    selectedSession: null,
    workoutErrors: null,
    workoutEditErrors: null,
    editDateMode: false,
    editMode: false,
}

export const persistSessionsAsync = createAsyncThunk("sessions/persist_sessions",
    async () => {
        const response = await fetch("/persist_sessions", {
            method: "GET",
            headers: {"Content-Type": "application/json", "Authorization": `Bearer ${localStorage.token}`,}
        })
        if(response.ok) {
            const rData = await response.json();
            return rData;
        }
        else { const unauthorizedMessage = await response.json(); return unauthorizedMessage}
    }

)

export const createSessionAsync = createAsyncThunk("sessions/createSession",
    async (createData) => {
        const fData = new FormData()
        fData.append("date", createData.date)
        fData.append("user_id", createData.user_id)
        const response = await fetch("/sessions", {
            method: "POST",
            headers: { "Authorization": `Bearer ${localStorage.token}`,},
            body: fData
        })

        if(response.ok) {const rData = await response.json(); return rData}
        else { const badResponse = await response.json(); return badResponse }
    }

)

export const getSessionsAsync = createAsyncThunk("sessions/getSessions", 
    async (loginData) => {
        const response = await fetch("/my_sessions", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(loginData)
        }) 

        if(response.ok) {const rData = await response.json(); return rData}
        else { const badResponse = await response.json(); return badResponse }
    }

)


export const deleteSessionAsync = createAsyncThunk("sessions/deleteSession",
    async(deleteId) => {
        const response = await fetch(`/sessions/${deleteId}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${localStorage.token}`,},
        })

        if(response.ok) {const rData = await response.json(); return rData}
        else { const badResponse = await response.json(); return badResponse }
    }

)

export const updateSessionDate = createAsyncThunk( "sessions/updateDate",
    async(updateInfo) => {
        // const fData = new FormData()
        // fData.append("date", updateInfo.newDate )
        const response = await fetch(`/sessions/${updateInfo.id}`, { 
        method: "PATCH",
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${localStorage.token}`,},
        body: JSON.stringify({date: updateInfo.newDate}),
        })

        if(response.ok) {const rData = await response.json(); return rData}
        else { const badResponse = await response.json(); return badResponse }
    }
)

export const createFromTemplate = createAsyncThunk( "sessions/createFromTemplate",
    async(createInfo) => {
        const response = await fetch("/template_create", {
            method: "POST",
            headers: {"Content-Type": "application/json", "Authorization": `Bearer ${localStorage.token}`,},
            body: JSON.stringify(createInfo),
        })

        if(response.ok) {const rData = await response.json(); return rData}
        else { const badResponse = await response.json(); return badResponse }
    } 

)

export const deleteWorkoutAsync = createAsyncThunk( "workouts/deleteWorkout",
    async(deleteId) => {
        const response = await fetch( `/workouts/${deleteId}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json", "Authorization": `Bearer ${localStorage.token}`,},
        })
        
        if(response.ok) {const rData = await response.json(); return rData}
        else { const badResponse = await response.json(); return badResponse }
    }

)

export const createWorkoutAsync = createAsyncThunk( "workouts/createWorkout",
    async(workoutInfo) => {
        const response = await fetch( "/workouts", {
            method: "POST",
            headers: {"Content-Type": "application/json", "Authorization": `Bearer ${localStorage.token}`,},
            body: JSON.stringify(workoutInfo),
        })
        
        if(response.ok) {const rData = await response.json(); return rData}
        else { const badResponse = await response.json(); return badResponse }
    }

)

export const editWorkoutAsync = createAsyncThunk( "workouts/editWorkout",
    async(editInfo) => {
        const response = await fetch( `/workouts/${editInfo["workout_id"]}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json", "Authorization": `Bearer ${localStorage.token}`,},
            body: JSON.stringify(editInfo["editInfo"]),
        })

        if(response.ok) {const rData = await response.json(); return rData}
        else { const badResponse = await response.json(); return badResponse }
    }
)


const sessionSlice = createSlice({
    name: "session",
    initialState: initialState,
    reducers: {
        sessionLogout(state) { 
            state.sessions = [];
            state.status = "idle";
            state.createErrors = null;
            state.editErrors = null;
            state.showErrors = null;
            state.rejectionErrors = [];
            state.selectedSession = null;
            state.workoutEditErrors = null;
            state.workoutErrors = null;
            state.editMode = false;
            state.editDateMode = false;
        }, 

        setSelectedSession(state, session) {
            if(session.payload === null) {state.selectedSession = null; state.workoutErrors = null; state.workoutEditErrors = null}
            else { state.selectedSession = session }
        },

        // ALTERNATIVE setEditMode( bool) {
        setEditMode(state, action) {
            state.rejectionErrors.push(action.payload)
            state.editMode = action.payload
        },
        setEditDateMode(state, action) {
            state.editDateMode = action.payload
        }

    },
    extraReducers: {
        [persistSessionsAsync.fulfilled](state, action) {
            if(action.payload.length > 0) {state.sessions = action.payload}
        },

        [createSessionAsync.fulfilled](state, action) {
            if(action.payload.errors) { state.createErrors = action.payload.errors }
            else { state.sessions.push(action.payload); state.selectedSession = action }
            state.status = "idle"
        },
        [createSessionAsync.pending](state) {state.status = "loading"},
        [createSessionAsync.rejected](state) {state.rejectionErrors.push("didnt go through")},

        [getSessionsAsync.fulfilled](state, action) {
            if(action.payload.message) {state.rejectionErrors = action.payload.message}
            else { state.sessions = action.payload }
        },

        [persistSessionsAsync.fulfilled](state, action) {
            if(action.payload.length > 0) { state.sessions = action.payload }
        }, 

        [deleteSessionAsync.fulfilled](state, action) {
            if(action.payload.message) {
                // filter sessions and leave out one which id matches deletedId
                state.sessions = state.sessions.filter( (session) => session.id !== action.payload.deletedId )
                state.selectedSession = null
                state.status = "idle"
            }
            else { state.rejectionErrors.push("did not delete sucessfully") }
        },
        [deleteSessionAsync.pending](state) { state.status = "loading" },
        [deleteSessionAsync.rejected](state) { state.rejectionErrors.push("didnt go through") },

        [updateSessionDate.fulfilled](state, action) {
            if(action.payload.message) {
                // payload looks like { message: "...sdf", updateId: id, newDate: "2015-03-06" }
                // change state so that the updated session has new date
                state.sessions = state.sessions.map( (session) => {
                    if(session.id === action.payload.updateId) { session.date = action.payload.newDate; return session }
                    else {return session}
                } )
                state.selectedSession.payload.date = action.payload.newDate
                state.editDateMode = false;
            }
        },

        [createFromTemplate.fulfilled](state, action) {
            // set current session to what was returned
            // change state to include the newly created session
            state.status = "idle";
            state.sessions.push(action.payload)
            state.selectedSession = action
        },
        [createFromTemplate.pending](state) {state.status = "loading"},
        [createFromTemplate.rejected](state, action) {state.rejectionErrors.push("didnt go through")},

        [deleteWorkoutAsync.fulfilled](state, action) {
            state.status = "idle";
            if(action.payload.message) {
                state.sessions.map( (session) => {
                    if(session.id === action.payload.session_id) {
                        session.workouts = session.workouts.filter( (workout) => workout.id !== action.payload.deletedId )
                        return session
                    }
                    else {return session}
                } )
            
                state.selectedSession.payload.workouts = state.selectedSession.payload.workouts.filter( (workout) => workout.id !== action.payload.deletedId )
            }
            // state.rejectionErrors.push(action.payload)
        },
        [deleteWorkoutAsync.pending](state) {state.status = "loading"},
        [deleteWorkoutAsync.rejected](state, action) {state.rejectionErrors.push("didnt delete")},

        [createWorkoutAsync.fulfilled](state, action) {
            state.status = "idle";
            
            if(action.payload.id) { 
                /**go to selected session and push action.payload to workouts */
                // state.selectedSession.workouts.push(action.payload)
               const x = state.selectedSession.payload
                x.workouts.push(action.payload)
                state.selectedSession.payload = x
                state.workoutEditErrors = null
                state.workoutErrors = null
                // also modify sessions to include added workout
               state.sessions = state.sessions.map( (session) => {
                    if(session.id === x.id) {
                        session.workouts.push(action.payload)
                        return session
                    }
                    else {return session}
                } )
            }
            else { state.workoutErrors = action.payload.errors }
        },
        [createWorkoutAsync.pending](state) {state.status = "loading"},
        [createWorkoutAsync.rejected](state, action) { state.rejectionErrors.push("didnt go through") },

        [editWorkoutAsync.fulfilled](state, action) {
            state.status = "idle";
            if(action.payload.id) {
                

                const x = state.selectedSession.payload
                const updatedWorkouts = x.workouts.map( (workout) => {
                    if(workout.id === action.payload.id) {return action.payload}
                    else return workout
                })
                x.workouts = updatedWorkouts
                state.selectedSession.payload = x
                state.workoutErrors = null
                state.editMode = false
                state.createErrors = null
                state.workoutEditErrors = null

                // modify sessions and add new workout to workouts of selected session
                state.sessions = state.sessions.map( (session) => {
                    if(session.id === state.selectedSession.payload.id) {
                        session.workouts = session.workouts.map( (workout) => {
                            if(workout.id === action.payload.id) {return action.payload}
                            else {return workout}
                        } )
                        return session
                    }
                    else {return session}
                } )
            }
            else { state.workoutEditErrors = action.payload.errors; }
        },
        [editWorkoutAsync.pending](state) {state.status = "loading"},
        [editWorkoutAsync.rejected](state, action) {state.rejectionErrors.push(action.payload)},

    }


})

export const { sessionLogout, setSelectedSession, setEditMode, setEditDateMode } = sessionSlice.actions
export default sessionSlice.reducer 

