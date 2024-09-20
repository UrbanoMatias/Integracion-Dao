import express from "express";
import courseController from "../controllers/courseController.js";

const router = express.Router();

router.get("/", courseController.getCourses);
router.post("/createcourse", courseController.createCourse);

export default router;
