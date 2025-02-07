import UserModel from "../users/users.model.js";

export default class PostModel{

    constructor(userId,caption,imagePath,commentIds,postId){
        this.userId = userId;
        this.caption = caption;
        this.imagePath = imagePath;
        this.commentIds = commentIds;
        this.postId = postId;
    }

    static getAllPosts(){
        return posts;
    }

    static getPostById(id){
        const specificPosts = posts.find((p)=>p.postId==id);
        return specificPosts;
    }

    static getPostsByUserId(userId){
        const specificPosts = posts.filter((p)=>p.userId==userId);
        return specificPosts;
    }

    static createPost(userId,caption,imagePath){
        const newPost = new PostModel(
            userId,
            caption,
            imagePath,
            [],
            posts.length+1
        );
        posts.push(newPost);
        console.log(posts);
    }

    static deletePost(postId){
        const index = posts.findIndex((p)=>p.postId==postId);
        if(index!=-1){
            posts.splice(index,1);
            return true;
        }else{
            return false;
        }
    }

    static updatePost(userId, postId, caption, imagePath){
        const index = posts.findIndex(p=>p.postId==postId && p.userId==userId);
        if(index!=-1){
            posts[index].caption = caption;
            posts[index].imagePath = imagePath;
            return posts[index];
        }else{
            return false;
        }
    }

    static doesPostExist(postId){
        const index = posts.findIndex(p=>p.postId==postId);
        if(index==-1){
            return false;
        }else{
            return true;
        }
    }

    static getUsersByPost(postId){
        const post = posts.find(p=>p.postId==postId);
        const userId = post.userId;
        const user = UserModel.getOneUser(userId);
        return user;
    }  
}

const posts = [
    {
        postId: 1,
        userId: 2,
        caption: "A nice post is here",
        imagePath: "../../public/uploads/sunrise.jpeg",
        commentIds: [2]
    },
    {
        postId: 2,
        userId: 1,
        caption: "A better post is here",
        imagePath: "",
        commentIds: [1,3]
    },
    {
        postId: 3,
        userId: 2,
        caption: "A post by Doe.",
        imagePath: "",
        commentIds: [4]
    },
]