import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    photo: {
        type: String
    },
    author: {
        type: String,
        required: true
    }
},{timestamps: true});

const Post = new mongoose.model("Post",postSchema);
export default Post;