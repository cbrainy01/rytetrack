import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./state/userSlice"
import exerciseReducer from "./state/exerciseSlice"
import sessionReducer from "./state/sessionSlice"

const store = configureStore({
    reducer: {
        // key value pairs of state variable and imported reducer
        user: userReducer,
        exercise: exerciseReducer,
        session: sessionReducer,
    },
});

export default store

// to access current user: const user = useSelector( (state) => state.entities )