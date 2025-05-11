import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";

export default function Admin() {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const { user, setUser } = useUser();

    useEffect(() => {
        fetch("http://localhost:8080/api/admin/users")
            .then((res) => res.json())
            .then(setUsers);

        fetch("http://localhost:8080/api/admin/posts")
            .then((res) => res.json())
            .then(setPosts);
    }, []);

    const handleDeleteUser = async (id) => {
        if (user?.id === id) {
            alert("You cannot delete your own account while logged in.");
            return;
        }

        const confirm = window.confirm("Are you sure you want to delete this user?");
        if (!confirm) return;

        const res = await fetch(`http://localhost:8080/api/admin/users/${id}`, {
            method: "DELETE",
        });

        if (res.ok) {
            setUsers((prev) => prev.filter((user) => user._id !== id));
        } else {
            alert("Failed to delete user");
        }
    };

    const handleDeletePost = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this post?");
        if (!confirm) return;

        const res = await fetch(`http://localhost:8080/api/admin/posts/${id}`, {
            method: "DELETE",
        });

        if (res.ok) {
            setPosts((prev) => prev.filter((post) => post._id !== id));
        } else {
            alert("Failed to delete post");
        }
    };

    const handleToggleAdmin = async (targetUser) => {
        const newAdminStatus = !targetUser.admin;

        const isSelf = user && targetUser._id === user.id;

        const confirmMessage = newAdminStatus
            ? `Are you sure you want to grant admin privileges to ${targetUser.name}?`
            : isSelf
            ? `You're about to revoke your own admin access.\nThis change will take effect the next time you sign in. Proceed?`
            : `Are you sure you want to remove admin privileges from ${targetUser.name}?`;

        const confirmed = window.confirm(confirmMessage);
        if (!confirmed) return;

        try {
            const res = await fetch(`http://localhost:8080/api/admin/users/${targetUser._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ admin: newAdminStatus }),
            });

            if (!res.ok) throw new Error();

            setUsers((prev) => prev.map((u) => (u._id === targetUser._id ? { ...u, admin: newAdminStatus } : u)));
        } catch (err) {
            alert("Failed to update user.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 pt-32 text-gray-800 dark:text-gray-100">
            <h1 className="text-5xl font-bold text-center text-gray-800 dark:text-gray-100">Admin Tools</h1>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse table-auto">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-gray-700 text-left">
                                <th className="w-1/4 p-2">Name</th>
                                <th className="w-1/4 p-2">Email</th>
                                <th className="w-1/4 p-2">Admin</th>
                                <th className="w-1/4 p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="border-t">
                                    <td className="p-2">{user.name}</td>
                                    <td className="p-2">{user.email}</td>
                                    <td className="p-2">{user.admin ? "YES" : "NO"}</td>
                                    <td className="p-2 space-x-2">
                                        <button onClick={() => handleToggleAdmin(user)} className="text-blue-500 hover:text-blue-700 cursor-pointer">
                                            Toggle Admin
                                        </button>
                                        <button onClick={() => handleDeleteUser(user._id)} className="text-red-500 hover:text-red-700 cursor-pointer">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">Manage Posts</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse table-auto">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-gray-700 text-left">
                                <th className="w-1/4 p-2">Title</th>
                                <th className="w-1/4 p-2">Author</th>
                                <th className="w-1/4 p-2">Date</th>
                                <th className="w-1/4 p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <tr key={post._id} className="border-t">
                                    <td className="p-2">{post.title}</td>
                                    <td className="p-2">{post.author}</td>
                                    <td className="p-2">{new Date(post.date).toLocaleDateString()}</td>
                                    <td className="p-2">
                                        <button onClick={() => handleDeletePost(post._id)} className="text-red-500 hover:text-red-700 cursor-pointer">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
