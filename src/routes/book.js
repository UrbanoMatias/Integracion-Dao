import express from "express";
import bookController from "../controllers/bookController.js";

const router = express.Router();

router.get("/", bookController.getBooks);
router.get("/book/:id", bookController.getBook);
router.post("/createbook", bookController.craeteBook);

export default router;
