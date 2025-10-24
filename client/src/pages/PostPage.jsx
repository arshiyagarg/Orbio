import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePostStore } from "../store/usePostStore.js";
import { useNavigate } from "react-router-dom";
import CommentsSection from "../components/CommentSection";

const PostPage = () => {
  const { id } = useParams(); 
  const { selectedPost, isPostsLoading, getPostById } = usePostStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getPostById(id);
    }
  }, [id, getPostById]);

  if (isPostsLoading) {
    return (
      <div className="flex justify-center items-center h-64 text-lg">
        Loading post...
      </div>
    );
  }

  if (!selectedPost) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Post not found.
      </div>
    );
  }

  return (

    <div className="flex justify-center mt-10 flex-col items-center min-h-screen ">
    
    <button
            type="button"
            variant="outline"
            onClick={() => navigate("/")}
            className="rounded-md px-3 py-1.5 font-medium text-lg text-primary-foreground transition-colors hover:opacity-90"
          >
             Back to Posts
      </button>

    <div className="w-[60%] p-8 border rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500">

      {selectedPost.photo && (
        <img
          src={
            selectedPost.photo.startsWith("data:image")
              ? post.photo
              : `data:image/jpeg;base64,${selectedPost.photo}`
          }
          alt="Post"
          className="w-full h-[w%] object-cover"
        />
      )}

      <div className="text-center ">
        <h1 className="text-4xl text-white font-bold mb-2 bg-clip-text">
          {selectedPost.title}
        </h1>
        <span>{selectedPost.author}</span>
      </div>

     
        <div className="block text-white text-lg font-medium mb-1">
          {selectedPost.content}
        </div>
        

        <CommentsSection postId={selectedPost._id} />
    </div>
  </div>
  );
};

export default PostPage;
