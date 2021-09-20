import express, { json } from "express";
import { API_VERSION } from "../sql/config.js";
import morgan from "morgan";

const app = express();

// load routes...
import usersRoutes from "./routes/users.js";
import tasksRoutes from "./routes/tasks.js";
import authRoutes from "./routes/auth.js";

// middlewares...
app.use(morgan("dev"));
app.use(json());

// Configure Headers HTTP...
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// router basic..
app.use(`/api/${API_VERSION}`, usersRoutes);
app.use(`/api/${API_VERSION}`, tasksRoutes);
app.use(`/api/${API_VERSION}`, authRoutes);

export default app;