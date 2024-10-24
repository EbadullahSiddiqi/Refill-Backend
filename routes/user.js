import express from "express";
import { getAllUsers, createNewUser } from "../controllers/user.js";

const router = express.Router();

router.get("/", getAllUsers);

router.post("/", createNewUser);

export default router;
