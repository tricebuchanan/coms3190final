import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

export default function CreatePost() {
    const { user } = useUser();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!user) {
            setError("You must be logged in to post.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    content,
                    author: user.name || user.email,
                    date: new Date().toISOString(),
                }),
            });

            if (!response.ok) throw new Error("Failed to submit post");

            setMessage("Post successful! Redirecting...");
            setTimeout(() => {
                navigate("/forum");
            }, 1500);
        } catch (err) {
            console.error(err);
            setError("Failed to submit post.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 pt-32 px-4">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-md rounded-lg p-8 w-full max-w-2xl">
                <h2 className="text-3xl font-bold mb-6 text-center">Create a New Post</h2>

                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

                {message && <p className="text-green-600 text-center text-sm mb-4">{message}</p>}

                <label className="block mb-4">
                    <span className="block mb-1">Title</span>
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </label>

                <label className="block mb-6">
                    <span className="block mb-1">Content</span>
                    <textarea
                        required
                        rows={6}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </label>

                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition cursor-pointer">
                    SUBMIT POST
                </button>
            </form>
        </div>
    );
}
