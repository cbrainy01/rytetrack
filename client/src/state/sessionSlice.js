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

const sessionSlice = createSlice({
    name: "session",
    initialState: initialState,
    reducers: {
        sessionLogout(state) { state = initialState }
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

    }


})

export const { sessionLogout } = sessionSlice.actions
export default sessionSlice.reducer 