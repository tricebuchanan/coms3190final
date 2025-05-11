import { useEffect, useState } from "react";

export default function About() {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        fetch("/authors.json")
            .then((res) => res.json())
            .then((data) => setAuthors(data.authors))
            .catch((err) => console.error("Failed to load authors.json", err));
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-32 px-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-5xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">Our Founders</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {authors.map((author, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 text-center">
                            <img
                                src={author.image_url}
                                alt={author.author_name}
                                className="w-40 h-40 object-cover rounded-full mx-auto mb-4 border-4 border-orange-500"
                            />
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">{author.author_name}</h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-5">{author.course}</p>
                            <p className="text-gray-600 dark:text-gray-300 mb-5">{author.professor}</p>
                            <p className="text-blue-600 dark:text-blue-400">{author.email}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
