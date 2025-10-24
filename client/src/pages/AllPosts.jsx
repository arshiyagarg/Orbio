import { useEffect, useState } from "react";
import { usePostStore } from "../store/usePostStore.js";
import PostCard from "../components/PostCard";
import Spinner from "../assets/spinner.jsx";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";

const AllPosts = () => {
  const { posts, isPostsLoading, getAllPosts, getPostsByUser } = usePostStore();
  const [showMyPosts, setShowMyPosts] = useState(false);
  const { authUser } = useAuthStore();

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  const handleToggleMyPosts = async () => {
    const next = !showMyPosts;
    setShowMyPosts(next);

    if (next) {
      await getPostsByUser(authUser._id);
    } else {
      await getAllPosts();
    }
  };

  if (isPostsLoading) {
    return (
      <div className="flex justify-center items-center py-24 text-sm text-muted-foreground">
        <div className="flex items-center gap-3">
          <Spinner />
          <span>Loading posts...</span>
        </div>
      </div>
    );
  }

  const postsCount = Array.isArray(posts) ? posts.length : 0;

  if (!isPostsLoading && postsCount === 0) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-8">
        <header className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="mt-10">
            <h1 className="text-pretty text-2xl font-semibold tracking-tight">All Posts</h1>
            <p className="text-muted-foreground">
              {postsCount} {postsCount === 1 ? "post" : "posts"}
            </p>
          </div>
        </header>

        <div className="flex flex-row-reverse m-5 items-center gap-2">
          <Link to="/createPost">
            <button className="inline-flex items-center rounded-md bg-white px-3 py-1.5 text-sm text-black font-medium transition-colors hover:opacity-90">
              Create Post
            </button>
          </Link>

          <button
            onClick={handleToggleMyPosts}
            className={`inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              showMyPosts
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            {showMyPosts ? "Showing My Posts" : "My Posts"}
          </button>
        </div>

        <section aria-label="Posts" className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-full text-center text-gray-500">No Posts Yet!</div>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="mt-10">
          <h1 className="text-pretty text-2xl font-semibold tracking-tight">All Posts</h1>
          <p className="text-muted-foreground">
            {postsCount} {postsCount === 1 ? "post" : "posts"}
          </p>
        </div>
      </header>

      <div className="flex flex-row-reverse m-5 items-center gap-2">
        <Link to="/createPost">
          <button className="inline-flex items-center rounded-md bg-white px-3 mr-2 py-1.5 text-sm text-black font-medium transition-colors hover:opacity-90">
            Create Post
          </button>
        </Link>

        <button
          onClick={handleToggleMyPosts}
          className={`inline-flex items-center rounded-md px-3 mr-2 py-1.5 text-sm font-medium transition-colors ${
            showMyPosts ? "bg-black text-white border-white  " : "bg-white text-black"
          }`}
        >
          {showMyPosts ? "My Posts " : "My Posts"}
        </button>
      </div>

      <section aria-label="Posts" className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post._id} className="animate-in fade-in-50 duration-300">
            <PostCard post={post} />
          </div>
        ))}
      </section>
    </main>
  );
};

export default AllPosts;
