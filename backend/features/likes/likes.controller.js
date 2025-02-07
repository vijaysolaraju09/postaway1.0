import LikeModel from "./likes.model.js";
import LikeRepository from "./likes.repository.js";

export default class LikesController {
  constructor() {
    this.likesRepository = new LikeRepository();
  }

  async getLikes(req, res, next) {
    const postId = req.params.postId;
    const likes = await this.likesRepository.getLikesByPost(postId);
    if (likes) {
      res.status(200).send(likes);
    } else {
      res.status(500).send("This post has received 0 likes");
    }
  }

  async toggleLike(req, res, next) {
    const userId = req.userId;
    const postId = req.params.postId;
    const likeResult = await this.likesRepository.toggleStatus(userId, postId);
    if (likeResult.found) {
      res.status(201).send(likeResult.liked);
    } else {
      res.status(500).send("Post not found");
    }
  }

  async getLikesForAPost(req, res, next) {
    const postId = req.params.postId;
    const likes = await this.likesRepository.likesForAPost(postId);
    res.status(200).send(likes);
  }

  async getPostIdsLikedByUser(req, res, next) {
    const userId = req.params.userId;
    const likes = await this.likesRepository.postsLikedByUser(userId);
    res.status(200).send(likes);
  }

  async getIsLikedByUser(req, res, next) {
    const userId = req.cookies.userId;
    const postId = req.params.postId;
    // console.log(userId);
    // console.log(req.cookies);
    // console.log(postId);
    const liked = await this.likesRepository.isLikedByUser(userId, postId);
    res.status(200).send(liked);
  }
}
