import CommentModel from "./comments.model.js";
import CommentRepository from "./comments.repository.js";

export default class CommentController{
    constructor(){
        this.commentRepository = new CommentRepository();
    }

    async getAllComments(req,res,next){
        const postId = req.params.postId;
        const comments = await this.commentRepository.getComments(postId);
        if(comments){
            res.status(200).send(comments);
        }else{
            res.status(500).send('No comment found');
        }
    }

    async createComment(req,res,next){
        const userId = req.userId;
        const postId = req.params.postId;
        const content = req.body.content;
        const newComment = await this.commentRepository.addComment(userId,postId,content);
        if(newComment){
            res.status(201).send(newComment);
        }else{
            res.status(500).send('Failed to post comment');
        }
    }

    async updateComment(req,res,next){
        const userId = req.userId;
        const content = req.body.content;
        const commentId = req.params.id;
        const updateResult = await this.commentRepository.updateComment(userId,commentId, content);
        if(updateResult){
            res.status(201).send(updateResult);
        }else{
            res.status(500).send('Comment not found');
        }
    }

    async deleteComment(req,res,next){
        const userId = req.userId;
        const commentId = req.params.id;
        const deleteResult = await this.commentRepository.deleteComment(commentId,userId);
        if(deleteResult){
            res.status(201).send('Comment deleted successfully');
        }else{
            res.status(500).send('Comment not found');
        }
    }

    async getCommentsForAPost(req,res,next){
        const postId = req.params.postId;
        const comments = await this.commentRepository.commentsForAPost(postId);
        res.status(200).send(comments);
    }
}