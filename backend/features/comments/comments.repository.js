import { CommentsModel } from "./comments.schema.js";

export default class CommentRepository {
  async getComments(postId) {
    try {
      const comments = await CommentsModel.find({ postId });
      return comments;
    } catch (err) {
      console.error("Error while fetching comments:", err);
      throw err;
    }
  }

  async addComment(userId, postId, content) {
    try {
      const newComment = new CommentsModel({
        userId,
        postId,
        content,
      });
      await newComment.save();
      return newComment;
    } catch (err) {
      console.error("Error while adding comment:", err);
      throw err;
    }
  }

  async updateComment(userId, commentId, content) {
    try {
      const updatedComment = await CommentsModel.findOneAndUpdate(
        { _id: commentId, userId },
        { content },
        { new: true }
      );
      return updatedComment;
    } catch (err) {
      console.error("Error while updating comment:", err);
      throw err;
    }
  }

  async deleteComment(commentId, userId) {
    try {
      const result = await CommentsModel.deleteOne({ _id: commentId, userId });
      return result.deletedCount > 0;
    } catch (err) {
      console.error("Error while deleting comment:", err);
      throw err;
    }
  }

  async commentsForAPost(postId) {
    try {
      const comments = await CommentsModel.find({ postId });
      return comments;
    } catch (err) {
      console.error("Error while fetching comments for a post:", err);
      throw err;
    }
  }
}
