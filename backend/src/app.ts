import express, { Application, Request, Response } from "express";
import router from "./routes/router";
const cookieParser = require("cookie-parser");

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
router(app);

export default app;