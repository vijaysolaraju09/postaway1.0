import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }, 
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

export const LikeModel = mongoose.model('Like',LikeSchema);