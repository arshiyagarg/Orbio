import { useState, useEffect } from "react";
import { useCommentStore } from "../store/useCommentStore.js";
import Spinner from "../assets/spinner.jsx";

const CommentsSection = ({ postId }) => {
  const [newComment, setNewComment] = useState("");
  const { comments, getAllComments, createComment, isCommentLoading } = useCommentStore();

  useEffect(() => {
    if (postId) getAllComments(postId);
  }, [postId, getAllComments]);

  const handleAddComment = async () => {
    const text = newComment;
    if (!text) return;
    
    const created = await createComment({ content: text, parentPost: postId });
    if (created) {
      setNewComment("");
      getAllComments(postId);
    }
  };

  if (isCommentLoading) {
    return (
      <div className="flex justify-center items-center py-24 text-sm text-muted-foreground">
        <div className="flex items-center gap-3">
          <Spinner />
          <span>Loading Comments...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mt-6">
      <h2 className="text-lg font-semibold mb-4">Comments</h2>

      <div className="flex gap-3 mb-6">
        <textarea
          className="flex-1 rounded-md p-2 border focus:outline-none focus:ring focus:ring-blue-400 resize-none"
          rows={2}
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          onClick={handleAddComment}
          type="button"
          className="inline-flex items-center rounded-md bg-blue-500 text-white px-4 py-2 text-sm font-medium transition-colors hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {comments && comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment._id} className="p-3 border border-gray-600 rounded-md ">
              <div className="flex justify-between items-center mb-2">
                <div className="text-xs text-gray-500">
                  {comment.createdAt
                    ? new Date(comment.createdAt).toLocaleDateString()
                    : ""}
                </div>
              </div>
              <p className="text-sm text-white whitespace-pre-wrap">
                {comment.content || comment.text}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No comments yet. Be the first to comment!</p>
      )}
    </div>
  );
};

export default CommentsSection;





// import { useState, useEffect } from "react";
// import { useCommentStore } from "../store/useCommentStore.js";
// import Spinner from "../assets/spinner.jsx"; 

// const CommentsSection = ({ postId }) => {
//   const [newComment, setNewComment] = useState("");
//   const { comments, getAllComments, createComment, isCommentLoading } = useCommentStore();

//   useEffect(() => {
//     if (postId) {
//       getAllComments(postId);
//     }
//   }, [postId, getAllComments]);

//   const handleAddComment = async () => {
//     if (!newComment.trim()) return;
//     await createComment({ parentPost: postId, content: newComment });
//     setNewComment("");
//   };

//   if (isCommentLoading) {
//     return (
//       <div className="flex justify-center items-center py-24 text-sm text-muted-foreground">
//         <div className="flex items-center gap-3">
//           <Spinner />
//           <span>Loading Comments...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full mt-6">
//       <h2 className="text-lg font-semibold mb-4">Comments</h2>

//       <div className="flex flex-row h-10 mb-6">
//         <textarea
//           className="w-full mr-3 rounded-md p-2 border focus:outline-none focus:ring focus:ring-blue-400 resize-none"
//           rows="1"
//           placeholder="Write a comment..."
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//         />
//         <button
//           onClick={handleAddComment}
//           type="button"
//           className="inline-flex items-center rounded-md bg-blue-500 text-white px-4 py-2 text-sm font-medium transition-colors hover:bg-blue-600"
//         >
//           Add
//         </button>
//       </div>

//       {comments && comments.length > 0 ? (
//         <div className="space-y-4">
//           {comments.map((comment) => (
//             <div key={comment.title} className="p-3 border rounded-md bg-gray-50">
//               <p className="text-sm text-gray-800">{comment.content}</p>
//               <span className="text-xs text-gray-500">{comment.createdAt?.slice(0, 10)}</span>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500 text-sm">No comments yet. Be the first to comment!</p>
//       )}
//     </div>
//   );
// };

// export default CommentsSection;





// import { useEffect, useState } from "react";
// import { useCommentStore } from "../store/useCommentStore.js";
// import { usePostStore } from "../store/usePostStore.js";

// const CommentsSection = ({ postId }) => {
//   const { comments, getAllComments, isCommentLoading, createComment } = useCommentStore();
//   const [newComment, setNewComment] = useState("");

//   useEffect(() => {
//     if (postId) getAllComments(postId);
//   }, [postId, getAllComments]);



//   if (isCommentLoading) {
//     return (
//       <div className="flex justify-center items-center py-24 text-sm text-muted-foreground">
//         <div className="flex items-center gap-3">
//           <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-black"></div>
//           <span>Loading Comments...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500">
//       <h2 className="text-lg font-semibold mb-4">Comments</h2>

//       <div className="flex flex-row h-10 mb-6">
//         <textarea
//           className="w-full mr-3 rounded-md p-2 border focus:outline-none focus:ring focus:ring-blue-400 resize-none"
//           rows="1"
//           placeholder="Write a comment..."
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//         />
//         <button
//           type="submit"
//           className="inline-flex items-center rounded-md bg-blue-500 text-white px-4 py-2 text-sm font-medium transition-colors hover:bg-blue-600"
//         >
//           Add
//         </button>
//       </div>

//       {comments && comments.length > 0 ? (
//         <div className="space-y-4">
//           {comments.map((comment) => (
//             <div
//               key={comment._id}
//               className="border rounded-lg p-3 bg-gray-50 hover:shadow-sm transition"
//             >
//               <div className="flex justify-between items-center mb-1">
//                 <span className="font-medium text-gray-800">
//                   {comment.author?.fullName || "Anonymous"}
//                 </span>
//                 <span className="text-xs text-gray-400">
//                   {new Date(comment.createdAt).toLocaleDateString("en-US", {
//                     year: "numeric",
//                     month: "short",
//                     day: "numeric",
//                   })}
//                 </span>
//               </div>
//               <p className="text-gray-700">{comment.text}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="rounded-lg border bg-card p-10 text-center">
//           <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent">
//             <svg
//               aria-hidden="true"
//               viewBox="0 0 24 24"
//               className="h-5 w-5 text-accent-foreground"
//             >
//               <path
//                 fill="currentColor"
//                 d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5zM6 7v10h12V7zm2 2h8v1H8zm0 3h8v1H8zm0 3h5v1H8z"
//               />
//             </svg>
//             <span className="sr-only">No comments yet</span>
//           </div>
//           <h2 className="mb-2 text-lg font-medium">No comments yet</h2>
//           <p className="text-muted-foreground">Be the first to comment!</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CommentsSection;
