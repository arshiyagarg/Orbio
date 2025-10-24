import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { usePostStore } from "./usePostStore.js";

export const useCommentStore = create((set, get) => ({

    selectedComment: null,
    comments: [],
    isCommentLoading : false,

    setSelectedComment: (comment) => set({ selectedComment: comment }),
    createComment: async({content,parentPost}) => {
        try {
            const res = await axiosInstance.post("/comment/add", {content, parentPost});
            
            set((state) => ({
                comments: [...state.comments, res.data],
            }));
            toast.success("Comment posted Successfully");        
        } catch (error) {
            console.log("Error: ",error);
            toast.error(error?.response?.data?.message || "Failed to fetch comments");
        }
    }, 
    updateComment: async(content) => {
        try {
            const res = await axiosInstance.put(`/comment/${selectedComment._id}`,content);
            set({selectedComment: res.data})
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to fetch comments");
        }
    },
    deleteComment: async() => {
        try {
            await axiosInstance.delete(`/comment/${seletedPost._id}`);
            set({selectedComment: null})
            toast.success("Post deleted Successfully");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to fetch comments");
        }
    },
    getAllComments: async(postId) => {
        set({isCommentLoading: true})
        try{
            const res = await axiosInstance.get(`/comment/all`,{params: { postId } });
            set({comments: res.data});
        } catch (error) {
            console.log( "Error in getAllComments" + error)
            toast.error(error?.response?.data?.message || "Failed to fetch comments");
        } finally {
            set({ isCommentLoading: false});
        }
    }
}))