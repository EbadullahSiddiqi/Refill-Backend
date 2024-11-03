import express from "express";
import { createPatient, showAllPatients } from "../controllers/patient.js";

const router = express.Router();

router.get("/", showAllPatients);
router.post("/", createPatient);

export default router;
