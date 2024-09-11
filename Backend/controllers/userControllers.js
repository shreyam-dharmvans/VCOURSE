import { User } from "../models/userSchema.js";
import { compare, hash } from "bcrypt";
import { createToken } from "../utils/token.js";
import { Course } from "../models/courseSchema.js";

export const login = async (req, res) => {

    try {
        let { email, password } = req.body;

        let user = await User.findOne({ email }).populate('enrolledCourses').populate('completedCourses');

        if (user) {
            let result = await compare(password, user.password);

            if (result) {

                res.clearCookie("auth_token", { //removing previous token of user if stored
                    httpOnly: true,
                    signed: true,
                    sameSite: 'none',
                    secure: true
                });

                let expiresIn = "7d";


                let token = createToken(user._id, email, expiresIn);
                res.cookie("auth_token", token, {
                    expiresIn,
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true,
                    signed: true
                })


                //----------------------------------------------------------
                // for (let i = 0; i < courses.length; i++) {
                //     let newCourse = new Course(courses[i]);
                //     let res = await newCourse.save();
                //     console.log(res);
                // }

                //--------------------------------------------------



                return res.status(200).json({
                    success: true,
                    messsage: "user is successfully logged in",
                    user
                })
            } else {
                return res.status(400).json({
                    success: false,
                    message: "incorrect password"
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                message: "No user exist with this email"
            })
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }

}

export const signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exist with this email"
            });
        }

        let hashedPassword = await hash(password, 10);

        let dueDate = new Date()
        dueDate.setMonth(dueDate.getMonth() + 6)
        // let courses = await Course.updateMany({ dueDate: { $exists: false } }, { $set: { dueDate } })
        // console.log(courses)

        // let coursesId = [];

        let courses = await Course.find();





        // for (let i = 0; i < courses.length; i++) {
        //     coursesId.push(courses[i]._id)
        // }

        // await courses.save()


        let newUser = new User({
            username,
            email,
            password: hashedPassword,
            enrolledCourses: courses || [],
            completedCourses: []
        })

        await newUser.save();

        res.clearCookie("auth_token", { //removing previous token of user if stored
            httpOnly: true,
            signed: true,
            sameSite: 'none',
            secure: true
        });

        let expiresIn = "7d";


        let token = createToken(res._id, email, expiresIn);
        res.cookie("auth_token", token, {
            expiresIn,
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            signed: true
        })

        newUser = await User.findOne({ email }).populate('enrolledCourses').populate('completedCourses');

        return res.status(200).json({
            success: true,
            message: "user successfully registered",
            user: newUser
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }


}

export const logout = (req, res) => {
    try {
        res.clearCookie("auth_token", {
            httpOnly: true,
            signed: true,
            sameSite: 'none',
            secure: true
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

}

export const updateCompletedCourses = async (req, res) => {
    try {
        let { id } = res.locals.jwtData;
        let { courseId } = req.body;

        let user = await User.findById(id).populate('completedCourses');

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Unable to find user"
            })
        }

        let flag = false;

        user.completedCourses.map((course) => {
            if (course.id == courseId) {
                flag = true;
            }
        })

        if (flag) {
            return res.status(400).json({
                success: false,
                message: "Course already completed"
            })
        }

        user.completedCourses.push(courseId);
        await user.save();

        let course = await Course.findById(courseId);

        if (!course) {
            return res.status(400).json({
                success: false,
                message: "Course Not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Course completed successfully",
            course
        })


    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}




// let courses = [
//     {
//         name: "Introduction to React Native",
//         instructor: "John Doe",
//         description: "Learn the basics of React Native development and build your first mobile app.",
//         enrollmentStatus: "Open",
//         duration: "8 weeks",
//         schedule: "Tuesdays and Thursdays, 6:00 PM - 8:00 PM",
//         location: "Online",
//         prerequisites: ["Basic JavaScript knowledge", "Familiarity with React"],
//         syllabus: [
//             {
//                 week: 1,
//                 topic: "Introduction to React Native",
//                 content: "Overview of React Native, setting up your development environment."
//             },
//             {
//                 week: 2,
//                 topic: "Building Your First App",
//                 content: "Creating a simple mobile app using React Native components."
//             }
//         ],
//         likes: 120
//     },
//     {
//         name: "Full Stack Web Development Bootcamp",
//         instructor: "Jane Smith",
//         description: "Become a full stack web developer by learning HTML, CSS, JavaScript, Node.js, and MongoDB.",
//         enrollmentStatus: "In Progress",
//         duration: "12 weeks",
//         schedule: "Mondays, Wednesdays, and Fridays, 7:00 PM - 9:00 PM",
//         location: "Online",
//         prerequisites: ["Basic programming knowledge", "Familiarity with web development concepts"],
//         syllabus: [
//             {
//                 week: 1,
//                 topic: "Introduction to Web Development",
//                 content: "Overview of web technologies and development setup."
//             },
//             {
//                 week: 2,
//                 topic: "Front-End Basics",
//                 content: "HTML, CSS, and JavaScript basics."
//             }
//         ],
//         likes: 340
//     },
//     {
//         name: "Data Structures & Algorithms with Java",
//         instructor: "Emily Davis",
//         description: "Master data structures and algorithms in Java and prepare for coding interviews.",
//         enrollmentStatus: "Open",
//         duration: "10 weeks",
//         schedule: "Saturdays and Sundays, 4:00 PM - 6:00 PM",
//         location: "Online",
//         prerequisites: ["Basic knowledge of Java programming"],
//         syllabus: [
//             {
//                 week: 1,
//                 topic: "Introduction to Data Structures",
//                 content: "Overview of arrays, linked lists, and stacks."
//             },
//             {
//                 week: 2,
//                 topic: "Sorting Algorithms",
//                 content: "Understanding bubble sort, merge sort, and quick sort."
//             }
//         ],
//         likes: 450
//     },
//     {
//         name: "UI/UX Design Fundamentals",
//         instructor: "Michael Brown",
//         description: "Learn the fundamentals of user interface and user experience design with hands-on projects.",
//         enrollmentStatus: "Closed",
//         duration: "6 weeks",
//         schedule: "Tuesdays and Thursdays, 5:00 PM - 7:00 PM",
//         location: "Online",
//         prerequisites: ["Basic understanding of design principles"],
//         syllabus: [
//             {
//                 week: 1,
//                 topic: "Introduction to UI/UX Design",
//                 content: "Overview of design principles and tools."
//             },
//             {
//                 week: 2,
//                 topic: "User Research",
//                 content: "Conducting user research and creating personas."
//             }
//         ],
//         likes: 280
//     },
//     {
//         name: "Machine Learning with Python",
//         instructor: "Sarah Lee",
//         description: "Get hands-on experience with machine learning algorithms using Python.",
//         enrollmentStatus: "In Progress",
//         duration: "8 weeks",
//         schedule: "Wednesdays and Fridays, 6:30 PM - 8:30 PM",
//         location: "Online",
//         prerequisites: ["Basic Python programming knowledge", "Familiarity with statistics"],
//         syllabus: [
//             {
//                 week: 1,
//                 topic: "Introduction to Machine Learning",
//                 content: "Overview of machine learning concepts and setup."
//             },
//             {
//                 week: 2,
//                 topic: "Supervised Learning",
//                 content: "Understanding regression and classification algorithms."
//             }
//         ],
//         likes: 520
//     }
// ]

