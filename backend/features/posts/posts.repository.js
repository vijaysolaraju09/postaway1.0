import { UserModel } from "../users/users.schema.js";
import { PostModel } from "./posts.schema.js";

export default class PostRepository {
  async getAllPosts() {
    try {
      const posts = await PostModel.find().populate("commentIds").exec();
      return posts;
    } catch (err) {
      console.error("Error while fetching posts:", err);
      throw err;
    }
  }

  async getPostById(id) {
    try {
      const post = await PostModel.findById(id).populate("commentIds").exec();
      return post;
    } catch (err) {
      console.error("Error while fetching post by id:", err);
      throw err;
    }
  }

  async getPostsByUserId(userId) {
    try {
      const posts = await PostModel.find({ userId })
        .populate("commentIds")
        .exec();
      return posts;
    } catch (err) {
      console.error("Error while fetching posts by user id:", err);
      throw err;
    }
  }

  async createPost(userId, caption, imagePath) {
    try {
      const newPost = new PostModel({
        userId,
        caption,
        imagePath,
        commentIds: [],
      });
      await newPost.save();
      console.log("Post created");

      return newPost;
    } catch (err) {
      console.error("Error while creating post:", err);
      throw err;
    }
  }

  async deletePost(postId) {
    try {
      const result = await PostModel.deleteOne({ _id: postId });
      if (result.deletedCount === 0) {
        return null;
      }
      return result;
    } catch (err) {
      console.error("Error while deleting the post:", err);
      throw err;
    }
  }

  async updatePost(userId, postId, caption, imagePath) {
    try {
      const updatedPost = await PostModel.updateOne(
        { _id: postId, userId },
        { caption, imagePath },
        { new: true }
      )
        .populate("commentIds")
        .exec();
      return updatedPost;
    } catch (err) {
      console.error("Error while updating post:", err);
      throw err;
    }
  }

  async doesPostExist(postId) {
    try {
      const count = await PostModel.countDocuments({ _id: postId });
      return count > 0;
    } catch (err) {
      console.error("Error while checking if post exists:", err);
      throw err;
    }
  }

  async getUsersByPost(postId) {
    try {
      const post = await PostModel.findById(postId);
      if (post) {
        const user = await UserModel.findById(post.userId);
        return user;
      }
      return null;
    } catch (err) {
      console.error("Error while getting user by post:", err);
      throw err;
    }
  }
}
