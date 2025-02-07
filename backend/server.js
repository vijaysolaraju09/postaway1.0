// import './../env.js';
import dotenv from "dotenv";
// dotenv.config({ path: './../.env' });
dotenv.config();

import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";

import userRouter from "./features/users/users.routes.js";
import postRouter from "./features/posts/posts.routes.js";
import commentRouter from "./features/comments/comments.routes.js";
import likesRouter from "./features/likes/likes.routes.js";
import jwtAuth from "./middlewares/jwt.middleware.js";
import { connectUsingMongoose } from "./config/mongoose.js";

const server = express();

const PORT = process.env.PORT || 3001;

server.use(express.urlencoded({ extended: true }));
server.use(cors());

// const _dirname = path.dirname("");
// const buildpath = path.join(_dirname, "../frontend/build");
// server.use(express.static(buildpath));

// server.use("/uploads", express.static("./../public/uploads"));
// server.use(express.static(path.join(`${path.resolve()}`, "../public")));

// server.use(
//   "/public/uploads",
//   express.static(path.join(path.resolve(), "./../public/uploads"))
// );

server.use(bodyParser.json());
server.use(cookieParser());
server.use(
  session({
    secret: "aditya",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);
server.use("/api/comments", jwtAuth, commentRouter);
server.use("/api/likes", jwtAuth, likesRouter);

server.get("*", (req, res) => {
  res.sendFile(path.join(path.resolve(), "../frontend/build", "index.html"));
});

server.listen(PORT, () => {
  console.log(`Server is up and running at Port: ${PORT}`);

  connectUsingMongoose();
});
