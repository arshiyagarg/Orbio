import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createPost, deletePost, getAllPosts, updatePost, getPostById, getPostsByUser } from "../controllers/post.controller.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({storage});

const router = express.Router();

router.post("/create-post",protectRoute,upload.single('photo'),createPost)
router.get("/",protectRoute,getAllPosts);
router.get("/:postId",protectRoute,getPostById);
router.put("/:postId",protectRoute,updatePost);
router.delete("/:postId",protectRoute,deletePost)
router.get("/user/:userId",protectRoute,getPostsByUser);

export default router;