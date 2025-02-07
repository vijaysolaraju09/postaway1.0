import { CommentsModel } from "./comments.schema.js";

export default class CommentRepository{
    async getComments(postId){
        try{
            const comments = CommentsModel.find({postId});
            return comments;
        }catch(err){
            console.log('Error while fetching comments: ' + err);
            throw err;
        }
    }

    async addComment(userId,postId,content){
        try{
            const newComment = new CommentsModel({
                userId, 
                postId,
                content
            });
            await newComment.save();
            return newComment;
        }catch(err){
            console.log('Error while adding comment: ' + err);
            throw err;
        }
    }

    async updateComment(userId, commentId, content){
        try{
            const updatedComment = CommentsModel.findOneAndUpdate(
                {_id: commentId, userId},
                {content},
                {new: true}
            );
            return updatedComment;
        }catch(err){
            console.log('Error while updating comment: ' + err);
            throw err;
        }
    }

    async deleteComment(commentId, userId){
        try{
            const result = CommentsModel.deleteOne({_id: commentId, userId});
            return result.deletedCount>0;
        }catch(err){
            console.log('Error while deleting comment: ' + err);
            throw err;
        }
    }

    async commentsForAPost(postId){
        try{
            const comments = CommentsModel.find({postId});
            return comments;
        }catch(err){
            console.log('Error while fetching comments for a post: ' + err);
            throw err;
        }
    }
}