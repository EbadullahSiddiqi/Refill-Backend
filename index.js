import express from "express";
import connectDB from "./db.js";
import userRouter from "./routes/user.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT;

connectDB();

// Middlewares
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`Server running`);
});

/**
 
    gOusOud7HPoISgl2
  
 */
