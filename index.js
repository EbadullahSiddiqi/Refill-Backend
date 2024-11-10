import express from "express";
import connectDB from "./db.js";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import patientRouter from "./routes/patient.js";
import dotenv from "dotenv";
import { authenticate } from "./middlewares/auth.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

connectDB();

// Middlewares
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/user", userRouter);
app.use("/api/user", authRouter);
app.use("/api/patient", authenticate, patientRouter);

app.listen(port, () => {
  console.log(`Server running`);
});
