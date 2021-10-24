import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    workouts = [],
}

export const getWorkoutsAsync = createAsyncThunk( "workouts/getWorkouts",
    async (loginData) => {
        const response = await fetch("/my_workouts", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(loginData)
        }) 

        if(response.ok) {const rData = await response.json(); return rData}
        else { const badResponse = await response.json(); return badResponse }
   }
    
)

export const persistWorkoutsAsync = createAsyncThunk( "workouts/persistWorkouts",
   async (userToken) => {
        const response = await fetch("/persist_workouts", {
            method: "GET",
            headers: {"Content-Type": "application/json", "Authorization": `Bearer ${userToken}`,}
        })
        if(response.ok) {const rData = await response.json(); return rData}
        else { const badResponse = await response.json(); return badResponse }
   }

)