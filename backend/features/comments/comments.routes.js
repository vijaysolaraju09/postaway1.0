import express from 'express';
import CommentController from './comments.controller.js';

const router = express.Router();

const commentController = new CommentController();

router.get('/:postId',(req,res)=>{
    commentController.getAllComments(req,res);
});
router.get('/comments-for-a-post/:postId',(req,res)=>{
    commentController.getCommentsForAPost(req,res);
});
router.post('/:postId',(req,res)=>{
    commentController.createComment(req,res);
});
router.put('/:id',(req,res)=>{
    commentController.updateComment(req,res);
});
router.delete('/:id',(req,res)=>{
    commentController.deleteComment(req,res);
});

export default router;
