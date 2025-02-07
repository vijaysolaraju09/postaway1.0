import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

import userRouter from "./features/users/users.routes.js";
import postRouter from "./features/posts/posts.routes.js";
import commentRouter from "./features/comments/comments.routes.js";
import likesRouter from "./features/likes/likes.routes.js";
import jwtAuth from "./middlewares/jwt.middleware.js";
import { connectUsingMongoose } from "./config/mongoose.js";
import cloudinary from "cloudinary";

const server = express();

const PORT = process.env.PORT || 3001;

server.use(express.urlencoded({ extended: true }));
server.use(cors());

server.use(bodyParser.json());
server.use(cookieParser());
server.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);
server.use("/api/comments", jwtAuth, commentRouter);
server.use("/api/likes", jwtAuth, likesRouter);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

server.listen(PORT, () => {
  console.log(`Server is up and running at Port: ${PORT}`);

  connectUsingMongoose();
});
