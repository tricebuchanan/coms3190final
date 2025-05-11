import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { Link } from "react-router-dom";

export default function Forum() {
    const { user } = useUser();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await fetch("http://localhost:8080/api/posts", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                if (!response.ok) throw new Error("Failed to fetch posts");

                const data = await response.json();
                setPosts(data);
            } catch (err) {
                console.error("Error fetching posts:", err);
            }
        }
        fetchPosts();
    }, []);

    const handleDelete = async (postId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:8080/api/posts/${postId}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Failed to delete post");

            setPosts((prev) => prev.filter((p) => p._id !== postId));
        } catch (err) {
            console.error("Delete error:", err);
            alert("Failed to delete post.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-32 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-100">Community Forum</h1>
                    {user && (
                        <Link to="/create-post" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition">
                            CREATE POST
                        </Link>
                    )}
                </div>

                {posts.length > 0 ? (
                    <div className="space-y-6 pb-15">
                        {posts.map((post) => (
                            <div key={post._id} className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-orange-500">
                                {(user?.name === post.author || user?.email === post.author) && (
                                    <button
                                        onClick={() => handleDelete(post._id)}
                                        className="absolute top-2.25 right-4 text-black dark:text-white hover:text-red-500 transition text-xl cursor-pointer"
                                        aria-label="Delete post"
                                    >
                                        &times;
                                    </button>
                                )}

                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{post.title}</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                    By {post.author} · {new Date(post.date).toLocaleDateString()}
                                </p>
                                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{post.content}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600 dark:text-gray-300">No posts yet. Be the first to share!</p>
                )}
            </div>
        </div>
    );
}
