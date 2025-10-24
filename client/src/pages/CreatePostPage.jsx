import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostStore } from "../store/usePostStore.js";
import toast from "react-hot-toast";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);           
  const [preview, setPreview] = useState(null);     
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const { createPost } = usePostStore();

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) {
      setFile(null);
      setPreview(null);
      return;
    }

    setFile(f);

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(f);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error("Title and content are required");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (file) {
        formData.append("photo", file);
      }

      const res = await createPost(formData);
      if (res) {
        toast.success("Post created successfully!");
        navigate("/");
      } else {
        toast.error("Failed to create post");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to create post. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[60%] p-8 border rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Create a New Post</h1>
          <p className="text-muted-foreground">Share your thoughts with the community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-lg font-semibold">Title</label>
            <input
              type="text"
              placeholder="Enter an engaging title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-1">Content</label>
            <textarea
              placeholder="Share your thoughts..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image (optional)</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {preview && (
              <div className="mt-3">
                <img src={preview} alt="Preview" className="w-48 h-48 object-cover rounded-md" />
              </div>
            )}
          </div>

          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="inline-flex items-center rounded-md bg-gray-200 px-3 py-1.5 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center rounded-md bg-blue-500 text-white px-3 py-1.5 text-sm"
            >
              {isSubmitting ? "Creating..." : "Publish Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;



// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { usePostStore } from "../store/usePostStore.js";
// import toast from "react-hot-toast";

// const CreatePostPage = () => {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();

//   const { createPost, isPostsLoading } = usePostStore();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     if (!title || !content) {
//       toast.error("Required Contents not available");
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const success = await createPost({ title, content });
//       if (success) {
//         toast.success("Post created successfully!");
//         navigate("/");
//       }
//     } catch (error) {
//       toast.error("Failed to create post. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//   <div className="flex justify-center items-center min-h-screen">
//     <div className="w-[60%] p-8 border rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
//       <div className="text-center mb-8">
//         <h1 className="text-4xl text-white font-bold mb-2 bg-clip-text">
//           Create a New Post
//         </h1>
//         <p className="text-muted-foreground">
//           Share your thoughts with the community
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="text-white text-lg font-semibold">Title</label>
//           <input
//             type="text"
//             placeholder="Enter an engaging title..."
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full text-white border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div>
//           <label className="block text-white text-lg font-medium mb-1">Content</label>
//           <textarea
//             placeholder="Share your thoughts, ideas, or questions..."
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             rows={6}
//             className="w-full text-white border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//           />
//         </div>

//         <div className="flex justify-between items-center pt-4">
//           <button
//             type="button"
//             variant="outline"
//             onClick={() => navigate("/")}
//             disabled={isSubmitting}
//             className="inline-flex items-center rounded-md bg-white px-3 py-1.5 text-sm text-black font-medium text-primary-foreground transition-colors hover:opacity-90"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="inline-flex items-center rounded-md bg-blue-500 text-white px-3 py-1.5 text-sm font-medium transition-colors hover:bg-blue-600"
//           >
//             {isSubmitting ? "Creating..." : "Publish Post"}
//           </button>
//         </div>
//       </form>
//     </div>
//   </div>
// );

// };

// export default CreatePostPage;
