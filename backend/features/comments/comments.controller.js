import CommentModel from "./comments.model.js";
import CommentRepository from "./comments.repository.js";

export default class CommentController {
  constructor() {
    this.commentRepository = new CommentRepository();
  }

  async getAllComments(req, res, next) {
    // console.log("get all comments");

    try {
      const postId = req.params.postId;
      const comments = await this.commentRepository.getComments(postId);
      //   console.log(comments);

      //   if (comments && comments.length > 0) {

      res.status(200).send(comments);
      //   } else {
      //     res.status(404).send("No comments found");
      //   }
    } catch (err) {
      console.error("Error fetching comments:", err);
      res.status(500).send("Internal server error");
    }
  }

  async createComment(req, res, next) {
    try {
      const userId = req.userId;
      const postId = req.params.postId;
      const content = req.body.content;
      const newComment = await this.commentRepository.addComment(
        userId,
        postId,
        content
      );
      if (newComment) {
        res.status(201).send(newComment);
      } else {
        res.status(500).send("Failed to post comment");
      }
    } catch (err) {
      console.error("Error creating comment:", err);
      res.status(500).send("Internal server error");
    }
  }

  async updateComment(req, res, next) {
    try {
      const userId = req.userId;
      const content = req.body.content;
      const commentId = req.params.id;
      const updateResult = await this.commentRepository.updateComment(
        userId,
        commentId,
        content
      );
      if (updateResult) {
        res.status(200).send(updateResult);
      } else {
        res.status(404).send("Comment not found");
      }
    } catch (err) {
      console.error("Error updating comment:", err);
      res.status(500).send("Internal server error");
    }
  }

  async deleteComment(req, res, next) {
    try {
      const userId = req.userId;
      const commentId = req.params.id;
      const deleteResult = await this.commentRepository.deleteComment(
        commentId,
        userId
      );
      if (deleteResult) {
        res.status(200).send("Comment deleted successfully");
      } else {
        res.status(404).send("Comment not found");
      }
    } catch (err) {
      console.error("Error deleting comment:", err);
      res.status(500).send("Internal server error");
    }
  }

  async getCommentsForAPost(req, res, next) {
    try {
      const postId = req.params.postId;
      const comments = await this.commentRepository.commentsForAPost(postId);
      res.status(200).send(comments);
    } catch (err) {
      console.error("Error fetching comments for a post:", err);
      res.status(500).send("Internal server error");
    }
  }
}
