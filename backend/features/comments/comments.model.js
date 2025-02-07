export default class CommentModel{
    
    constructor(commentId,userId,postId,content,reactionIds){
        this.commentId = commentId;
        this.userId = userId;
        this.postId = postId;
        this.content = content;
        this.reactionIds = reactionIds;
    }

    static getComments(postId){
        const comment = comments.filter(c=>c.postId==postId); 
        return comment;
    }

    static addComment(userId,postId,content){
        const newComment = new CommentModel(
            comments.length+1,
            userId,
            postId,
            content,
            []
        );
        comments.push(newComment);
        return newComment;
    }

    static updateComment(userId,commentId,content){
        const oldComment = comments.find(c=>c.commentId==commentId && c.userId==userId);
        if(oldComment){
            oldComment.content = content;
            return oldComment;
        }else{
            return false;
        }
    }

    static deleteComment(commentId,userId){
        const index = comments.findIndex(c=>c.commentId==commentId && c.userId==userId);
        if(index==-1){
            return false;
        }else{
            comments.splice(index,1);
            return true;
        }
    } 
    
    static commentsForAPost(postId){
        const specificComments = comments.filter(c=>c.postId==postId);
        return specificComments;
    }
}

const comments = [
    {
        commentId: 1,
        userId: 1,
        postId: 2,
        content: 'Nice one',
        reactionIds:[]
    },
    {
        commentId: 2,
        userId: 2,
        postId: 1,
        content: 'Great',
        reactionIds:[]
    },
    {
        commentId: 3,
        userId: 1,
        postId: 2,
        content: 'Good morning',
        reactionIds:[]
    },
    {
        commentId: 4,
        userId: 2,
        postId: 3,
        content: 'Hello',
        reactionIds:[]
    },
]