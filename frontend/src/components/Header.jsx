import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const isHome = location.pathname === "/";
    const { user, setUser } = useUser();

    const navItems = [
        { label: "HOME", to: "/" },
        { label: "DESTINATIONS", to: "/destinations" },
        { label: "FORUM", to: "/forum" },
        { label: "ABOUT", to: "/about" },
    ];

    const handleLogout = () => {
        setUser(null);
        navigate("/");
    };

    return (
        <header
            className={`fixed top-0 left-0 w-full z-20 ${
                isHome ? "absolute text-white" : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-md"
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <nav className="flex-1 flex justify-center gap-15 py-8 uppercase tracking-[.4em] text-sm md:text-base font-medium">
                    {navItems.map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={`hover:text-orange-500 transition ${location.pathname === item.to ? "text-orange-500" : ""}`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="absolute right-10 top-1/2 -translate-y-1/2">
                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="border border-current pl-5 pr-4 py-2 transition uppercase tracking-[.4em] text-sm md:text-base font-medium hover:text-orange-500 cursor-pointer"
                        >
                            LOGOUT
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className={`border border-current pl-5 pr-4 py-2 transition uppercase tracking-[.4em] text-sm md:text-base font-medium hover:text-orange-500 cursor-pointer ${
                                location.pathname === "/login" ? "text-orange-500" : ""
                            }`}
                        >
                            LOGIN
                        </Link>
                    )}
                </div>
                <div className="absolute left-10 top-1/2 -translate-y-1/2">
                    {user?.admin && (
                        <Link
                            to="/admin"
                            className={`hover:text-red-500 transition uppercase tracking-[.4em] text-sm md:text-base font-medium ${
                                location.pathname === "/admin" ? "text-red-500" : ""
                            }`}
                        >
                            ADMIN
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
