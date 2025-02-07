import express from "express";
import PostController from "./posts.controller.js";
import { uploadFile } from "../../middlewares/fileUpload.middleware_old.js";

const router = express.Router();

const postController = new PostController();

router.get("/all", (req, res) => {
  postController.getAllPosts(req, res);
});
router.get("/:id", (req, res) => {
  postController.getOnePost(req, res);
});
router.get("/", (req, res) => {
  postController.getUserPosts(req, res);
});
router.post("/", uploadFile.single("imagePath"), (req, res) => {
  console.log("hii");

  postController.createAPost(req, res);
});
router.delete("/:id", (req, res) => {
  postController.deleteAPost(req, res);
});
router.put("/:postId", uploadFile.single("imagePath"), (req, res) => {
  postController.updateAPost(req, res);
});
router.get("/user/:postId", (req, res) => {
  postController.getUserFromPost(req, res);
});
router.get("/user-posts/:userId", (req, res) => {
  postController.getOneUserPosts(req, res);
});

export default router;
