import mongoose from "mongoose";

let courseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    instructor: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    enrollmentStatus: {
        type: String,
        enum: ["Open", "Closed", "In Progress"],
    },
    duration: {
        type: String,
        required: true
    },
    schedule: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    prerequisites: [{
        type: String,
        required: true
    }],
    syllabus: [{
        week: {
            type: Number,
            required: true,
        },
        topic: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    }],
    likes: {
        type: Number,
        default: 0,
        required: true
    },
    dueDate: Date,
    imgUrl: String
})

export const Course = mongoose.model("courses", courseSchema);