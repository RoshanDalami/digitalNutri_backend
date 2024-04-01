import express from "express";
import userRouter from "./routes/user.routes.js";
import calorieRouter from "./routes/calorie.routes.js";
import activityRouter from './routes/acitivity.routes.js';
import foodRouter from './routes/foodComposition.routes.js';
import mealRouter from './routes/meal.routes.js';
import logRouter from './routes/log.food.routes.js'
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/user", userRouter);
app.use("/api/v1/bmr", calorieRouter);
app.use("/api/v1/activity", activityRouter);
app.use("/api/v1/food", foodRouter);
app.use("/api/v1/meals", mealRouter);
app.use("/api/v1/log", logRouter)

export { app };
