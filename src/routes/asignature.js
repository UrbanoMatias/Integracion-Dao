import express from "express";
import asignatureController from "../controllers/asignatureController.js";

const router = express.Router();

router.get("/", asignatureController.getAsignaures);
router.post("/createasignature", asignatureController.createAsignature);

export default router;
