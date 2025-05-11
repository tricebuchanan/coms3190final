import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="min-h-screen bg-cover bg-center relative text-white" style={{ backgroundImage: "url('/images/hero.png')" }}>
            <div className="absolute inset-0 bg-black/60"></div>

            <div className="relative z-10 flex flex-col items-center justify-center h-[100vh] text-center px-4">
                <div className="w-125 h-[3px] bg-white mb-6" />
                <h1 className="text-5xl md:text-6xl font-bold tracking-wider mb-7">EPIC ESCAPES</h1>
                <div className="w-125 h-[3px] bg-white mb-9" />
                <p className="text-lg md:text-xl mb-12 tracking-widest">EXPLORE. DREAM. DISCOVER. YOUR NEXT ADVENTURE AWAITS!</p>
                <Link to="/destinations">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-4 tracking-widest rounded-md font-semibold shadow-md transition cursor-pointer">
                        GET STARTED
                    </button>
                </Link>
                <Link to="/about">
                    <p className="hover:text-orange-500 mt-12 text-sm tracking-widest transition">LEARN MORE</p>
                </Link>
            </div>
        </div>
    );
}
