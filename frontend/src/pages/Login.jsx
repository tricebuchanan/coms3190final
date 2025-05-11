import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { setUser } = useUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) throw new Error("Login failed");

            const data = await response.json();

            setUser(data.user);

            setMessage("Login successful! Redirecting...");
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (err) {
            setError("Invalid email or password.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-md rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login to Epic Escapes</h2>

                {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}

                {message && <p className="text-green-600 text-center text-sm mb-4">{message}</p>}

                <label className="block mb-4">
                    <span className="block mb-1">Email</span>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </label>

                <label className="block mb-6">
                    <span className="block mb-1">Password</span>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </label>

                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition cursor-pointer">
                    LOG IN
                </button>

                <p className="text-sm text-center mt-7">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-blue-500 hover:underline">
                        SIGN UP
                    </a>
                </p>
            </form>
        </div>
    );
}
