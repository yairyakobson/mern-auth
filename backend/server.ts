import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import { connectDB } from "./config/connection";
import { APP_ORIGIN, PORT, NODE_ENV } from "./constants/env";
import errorHandler from "./middleware/errorHandler";
import router from "./routes/index";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: APP_ORIGIN,
  credentials: true
}));
app.use(cookieParser());

app.get("/", (_, res: any) => {
  return res.status(200).json({
    status: "healthy",
  });
});

app.use("/api/v1", router);
app.use(errorHandler);

app.listen(4000, async() =>{
  console.log(`Running on port ${PORT} in ${NODE_ENV} environment`);
  await connectDB();
});