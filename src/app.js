import express from "express";
import authRouter from "./router/auth.router.js";
import musicRouter from "./router/music.router.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/music", musicRouter);

export default app;