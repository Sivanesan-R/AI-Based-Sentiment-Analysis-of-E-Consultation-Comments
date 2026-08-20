import { useAuth } from "../context/AuthContext";
import { posts } from "../data/posts";
import PostCard from "../components/PostCard";
import { useLocation } from "react-router-dom";

export default function Home() {
  const { user } = useAuth();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const search = params.get("q") || "";

  const filteredPosts = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-100 text-gray-700">
        <p className="text-lg">Please login to view posts.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-6 space-y-4">
      {filteredPosts.length === 0 ? (
        <p className="text-gray-500 text-center">
          No posts found for "{search}".
        </p>
      ) : (
        filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
}
