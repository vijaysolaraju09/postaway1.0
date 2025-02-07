import express from 'express';
import LikesController from './likes.controller.js';

const router = express.Router();

const likeController = new LikesController();

router.get('/posts-liked-by-user/:userId',(req,res)=>{
    likeController.getPostIdsLikedByUser(req,res);
});
router.get('/toggle/:postId',(req,res)=>{
    likeController.toggleLike(req,res);
});
router.get('/likes-for-a-post/:postId',(req,res)=>{
    likeController.getLikesForAPost(req,res);
});
router.get('/is-liked-by-user/:postId',(req,res)=>{
    likeController.getIsLikedByUser(req,res);
});
router.get('/:postId',(req,res)=>{
    likeController.getLikes(req,res);
});

export default  router;