import PostModel from "../posts/posts.model.js";

export default class LikeModel{

    constructor(reactionId,userId,postId){
        this.reactionId = reactionId;
        this.userId = userId;
        this.postId = postId;
    }

    static getLikesByPost(postId){
        const specificLikes = likes.filter(l=>l.postId==postId);
        return specificLikes;
    }

    static toggleStatus(userId,postId){
        const index = likes.findIndex(l=>l.postId==postId && l.userId==userId);
        const postFound = PostModel.doesPostExist(postId);
        if(postFound){
            if(index==-1){
                const newLike = new LikeModel(likes.length+1,userId,postId);
                likes.push(newLike);
            }else{
                likes.splice(index,1);
            }
            return true;
        }else{
            return false;
        }
    }

    static likesForAPost(postId){
        const specificLikes = likes.filter((l)=>l.postId==postId);
        return specificLikes;
    }

    static postsLikedByUser(userId){
        const specificLikes = likes.filter((l)=>l.userId==userId);
        return specificLikes;
    }

    static isLikedByUser(userId,postId){
        const index = likes.findIndex(l=>l.postId==postId && l.userId==userId);
        if(index==-1){
            return false;
        }
        return true;
    }   
}

const likes = [
    {
        reactionId: 1,
        userId: 1,
        postId: 2,
    },
    {
        reactionId: 2,
        userId: 2,
        postId: 2,
    },
    {
        reactionId: 3,
        userId: 1,
        postId: 3,
    },
    // {
    //     reactionId: 4,
    //     userId: 1,
    //     postId: 1,
    // },
]