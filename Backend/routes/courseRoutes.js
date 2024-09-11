import { Router } from "express";
import { getAllCourses, updateCourseLikeCount, insertCourse } from "../controllers/courseController.js";
import { verifyToken } from "../utils/token.js";




let courseRouter = Router();

courseRouter.get("/all-courses", getAllCourses);
courseRouter.put("/like-course", updateCourseLikeCount);





export default courseRouter;