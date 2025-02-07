import mongoose from "mongoose";

const CommentsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

export const CommentsModel = mongoose.model('Comment',CommentsSchema);