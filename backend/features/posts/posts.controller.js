import PostRepository from "./posts.repository.js";
import cloudinary from "cloudinary";

export default class PostController {
  constructor() {
    this.postRepository = new PostRepository();
  }

  async getAllPosts(req, res, next) {
    try {
      const posts = await this.postRepository.getAllPosts();
      if (posts) {
        res.status(200).send(posts);
      } else {
        res.status(404).send("No posts found");
      }
    } catch (err) {
      console.error("Error fetching all posts:", err);
      res.status(500).send("Internal server error");
    }
  }

  async getOnePost(req, res, next) {
    try {
      const postId = req.params.id;
      const post = await this.postRepository.getPostById(postId);
      if (post) {
        res.status(200).send(post);
      } else {
        res.status(404).send("No such post found");
      }
    } catch (err) {
      console.error("Error fetching post by id:", err);
      res.status(500).send("Internal server error");
    }
  }

  async getUserPosts(req, res, next) {
    try {
      const userId = req.cookies.userId;
      const posts = await this.postRepository.getPostsByUserId(userId);
      console.log(posts);
      if (posts) {
        res.status(200).send(posts);
      } else {
        res.status(404).send("Looks like it's time to create your first post");
      }
    } catch (err) {
      console.error("Error fetching user posts:", err);
      res.status(500).send("Internal server error");
    }
  }

  async createAPost(req, res, next) {
    try {
      console.log("Starting post creation...");

      // Parse user info
      const userInfo = req.cookies.userInfo;
      const parsedInfo = JSON.parse(userInfo);
      const userId = parsedInfo._id;

      const { caption } = req.body;

      // Default image path
      let imagePath =
        "https://boschbrandstore.com/wp-content/uploads/2019/01/no-image.png";

      // Upload image to Cloudinary if file is provided
      if (req.file) {
        console.log("Uploading file to Cloudinary...");
        const uploadedObj = await cloudinary.uploader.upload(req.file.path);
        imagePath = uploadedObj.secure_url;
        console.log("Image uploaded successfully:", imagePath);
      }

      // Save post to the database
      console.log("Creating post in the database...");
      await this.postRepository.createPost(userId, caption, imagePath);

      console.log("Post created successfully!");
      res.status(201).redirect("/");
    } catch (error) {
      // Catch and log the error
      console.error("Error creating post:", error);

      // Send a meaningful error response
      res.status(500).send({
        message: "Failed to create post",
        error: error.message || error, // Include the error message for debugging
      });
    }
  }

  async deleteAPost(req, res, next) {
    try {
      const postId = req.params.id;
      const deleteResult = await this.postRepository.deletePost(postId);
      if (deleteResult) {
        res.status(200).send("Post deleted successfully");
      } else {
        res.status(404).send("Post not found");
      }
    } catch (err) {
      console.error("Error deleting post:", err);
      res.status(500).send("Internal server error");
    }
  }

  async updateAPost(req, res, next) {
    try {
      const userId = req.cookies.userId;
      const postId = req.params.postId;
      const { caption } = req.body;
      let imagePath = req.body.imagePath;
      if (req.file) {
        imagePath = req.file.path;
      }
      const updateResult = await this.postRepository.updatePost(
        userId,
        postId,
        caption,
        imagePath
      );
      if (updateResult) {
        res.status(200).send(updateResult);
      } else {
        res.status(404).send("Post not found");
      }
    } catch (err) {
      console.error("Error updating post:", err);
      res.status(500).send("Internal server error");
    }
  }

  async getUserFromPost(req, res, next) {
    try {
      const postId = req.params.postId;
      const user = await this.postRepository.getUsersByPost(postId);
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send("User not found for this post");
      }
    } catch (err) {
      console.error("Error fetching user by post:", err);
      res.status(500).send("Internal server error");
    }
  }

  async getOneUserPosts(req, res, next) {
    try {
      const userId = req.params.userId;
      const posts = await this.postRepository.getPostsByUserId(userId);
      if (posts) {
        res.status(200).send(posts);
      } else {
        res.status(404).send("No posts found for this user");
      }
    } catch (err) {
      console.error("Error fetching posts by user id:", err);
      res.status(500).send("Internal server error");
    }
  }
}
