import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        setCourses: (state, action) => {
            state = action.payload;
            return state;
        },
        updateCompletedCourses: (state, action) => {
            state.completedCourses.push(action.payload);

            return state;
        }
    }
});


export const userActions = userSlice.actions;