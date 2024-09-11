import { createSlice } from "@reduxjs/toolkit";

export const courseSlice = createSlice({
    name: "course",
    initialState: [],
    reducers: {
        setCourses: (state, action) => {
            state = action.payload;
            return state;
        },
        // updateCourseLikes: (state,action)=>{

        // }
    }
})

export const courseActions = courseSlice.actions;