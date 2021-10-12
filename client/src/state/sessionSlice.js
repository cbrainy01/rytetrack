import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    sessions: [],
    status: "idle",
    createErrors: null,
    editErrors: null,
    showErrors: null,
    rejectionErrors: [],
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
        }
    },
    extraReducers: {
        [persistSessionsAsync.fulfilled](state, action) {
            if(action.payload.length > 0) {state.sessions = action.payload}
        },

        [createSessionAsync.fulfilled](state, action) {
            if(action.payload.errors) { state.createErrors = action.payload.errors }
            else { state.sessions.push(action.payload) }
            state.status = "idle"
        },
        [createSessionAsync.pending](state) {state.status = "loading"},
        [createSessionAsync.rejected](state) {state.rejectionErrors.push("didnt go through")},

        [getSessionsAsync.fulfilled](state, action) {
            if(action.payload.error) {state.rejectionErrors = action.payload.error}
            else { state.sessions = action.payload }
        },

        [persistSessionsAsync.fulfilled](state, action) {
            if(action.payload.length > 0) { state.sessions = action.payload }
        }, 

        [deleteSessionAsync.fulfilled](state, action) {
            if(action.payload.message) {
                // filter sessions and leave out one which id matches deletedId
                state.sessions = state.sessions.filter( (session) => session.id !== action.payload.deletedId )
            }
            else { state.rejectionErrors.push("did not delete sucessfully") }
        },
        [deleteSessionAsync.pending](state) { state.status = "loading" },
        [deleteSessionAsync.rejected](state) { state.rejectionErrors.push("didnt go through") }

    }


})

export const { sessionLogout } = sessionSlice.actions
export default sessionSlice.reducer 