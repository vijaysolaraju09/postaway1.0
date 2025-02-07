import LikeModel from "./likes.model.js";
import LikeRepository from "./likes.repository.js";

export default class LikesController {
  constructor() {
    this.likesRepository = new LikeRepository();
  }

  async getLikes(req, res, next) {
    try {
      const postId = req.params.postId;
      const likes = await this.likesRepository.getLikesByPost(postId);
      if (likes && likes.length > 0) {
        res.status(200).send(likes);
      } else {
        res.status(404).send("This post has received 0 likes");
      }
    } catch (err) {
      console.error("Error fetching likes for a post:", err);
      res.status(500).send("Internal server error");
    }
  }

  async toggleLike(req, res, next) {
    try {
      const userId = req.userId;
      const postId = req.params.postId;
      const likeResult = await this.likesRepository.toggleStatus(
        userId,
        postId
      );
      if (likeResult.found) {
        res.status(201).send(likeResult.liked);
      } else {
        res.status(404).send("Post not found");
      }
    } catch (err) {
      console.error("Error toggling like status:", err);
      res.status(500).send("Internal server error");
    }
  }

  async getLikesForAPost(req, res, next) {
    try {
      const postId = req.params.postId;
      const likes = await this.likesRepository.likesForAPost(postId);
      res.status(200).send(likes);
    } catch (err) {
      console.error("Error fetching likes for a post:", err);
      res.status(500).send("Internal server error");
    }
  }

  async getPostIdsLikedByUser(req, res, next) {
    try {
      const userId = req.params.userId;
      const likes = await this.likesRepository.postsLikedByUser(userId);
      res.status(200).send(likes);
    } catch (err) {
      console.error("Error fetching post IDs liked by user:", err);
      res.status(500).send("Internal server error");
    }
  }

  async getIsLikedByUser(req, res, next) {
    try {
      const userId = req.cookies.userId;
      const postId = req.params.postId;
      const liked = await this.likesRepository.isLikedByUser(userId, postId);
      res.status(200).send(liked);
    } catch (err) {
      console.error("Error checking if post is liked by user:", err);
      res.status(500).send("Internal server error");
    }
  }
}
