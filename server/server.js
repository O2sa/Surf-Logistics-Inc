import "express-async-errors";

import * as dotenv from "dotenv";

dotenv.config();
import express from "express";
const app = express();

import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import rateLimiter from "express-rate-limit";
import cors from "cors";

// database
import connectDB from "./configs/connect.js";

//  routers

import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import quoteRouter from "./routes/quoteRouter.js";
import messageRouter from "./routes/messageRouter.js";
import consultationRouter from "./routes/consultationRouter.js";

// public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

// middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import {
  authenticateUser,
  authorizePermissions,
} from "./middleware/authMiddleware.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}



const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      `http://${process.env.CLIENT_ORIGIN}`,
      `https://${process.env.CLIENT_ORIGIN}`,
    ];
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

// app.use(cors(corsOptions));
// CSP configuration with helmet

// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       connectSrc: [
//         "'self'",

//       ],

//     },
//   })
// );

// Parse cookies
app.use(cookieParser());

// app.set("trust proxy", 1);

// // Rate limiting
// const limiter = rateLimiter({
//   windowMs: 5 * 60 * 1000, // 5 minutes
//   max: 1000, // limit each IP to 1000 requests per windowMs
// });

// app.use(limiter);
app.use(express.json());
app.use(mongoSanitize());
app.get("/api/v1/test", (req, res) => {
  res.send("system up!");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1", authenticateUser);

app.use("/api/v1/current-user", userRouter);

app.use("/api/v1/quotes", authorizePermissions(["admin"]), quoteRouter);
app.use(
  "/api/v1/consultations",
  authorizePermissions(["admin"]),
  consultationRouter
);
app.use(
  "/api/v1/messages",
  authorizePermissions(["admin"]),
  messageRouter
);

// app.use(express.static(path.resolve(__dirname, "./client/dist")));

// if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  // Serve the frontend for any other route
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
  });
// }

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;

const server = app.listen(port, () =>
  console.log(`Server is listening on port ${port}...`)
);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
  } catch (error) {
    console.log(error);
  }
};

start();
