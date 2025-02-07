import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
  },
  commentIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

export const PostModel = mongoose.model("Post", PostSchema);
