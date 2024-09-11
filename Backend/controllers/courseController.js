import { Course } from "../models/courseSchema.js"


export const getAllCourses = async (req, res) => {
    try {
        let allCourses = await Course.find();

        return res.status(200).json({
            success: "true",
            message: "All courses fetched successfully",
            allCourses
        })
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            success: "false",
            message: error.message
        })
    }

}

export const updateCourseLikeCount = async (req, res) => {
    try {
        let { courseId } = req.body;
        let course = await Course.findById(courseId);

        if (!course) {
            return res.status(200).json({
                success: false,
                message: "Course not found",
            })
        }

        course.likes = course.likes + 1;

        await course.save();

        let result = await Course.find()

        return res.status(200).json({
            success: true,
            message: "Course updated successfully",
            allCourses: result
        })


    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }

}

export const insertCourse = async (req, res) => {

    try {
        let { course } = req.body;

        let newCourse = new Course(course);
        await newCourse.save();


        return res.status(200).json({
            success: true,
            message: "Courses saved in db"
        })
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            success: false,
            message: error
        })
    }


    // courses.map(async (course) => {
    //     let newCourse = new Course(course);
    //     await newCourse.save();
    // })
}