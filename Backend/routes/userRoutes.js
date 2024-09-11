import { Router } from "express";
import { login, logout, signup, updateCompletedCourses } from "../controllers/userControllers.js";
import { verifyToken } from "../utils/token.js";

const userRouter = Router();

userRouter.post("/login", login);
userRouter.post("/signup", signup);
userRouter.get("/logout", verifyToken, logout);

userRouter.put("/completed-courses", verifyToken, updateCompletedCourses);


export default userRouter;