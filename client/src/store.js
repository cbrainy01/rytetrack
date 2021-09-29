import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./state/userSlice"

const store = configureStore({
    reducer: {
        // key value pairs of state variable and imported reducer
        user: userReducer,
    },
});

export default store

// to access current user: const user = useSelector( (state) => state.entities )