import mongoose from "mongoose";
import { Course } from "./courseSchema.js";

let userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    enrolledCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courses'
    }],
    completedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courses'
    }],

})

export const User = mongoose.model("users", userSchema);