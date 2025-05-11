import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Forum from "./pages/Forum";
import CreatePost from "./pages/CreatePost";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Header from "./components/Header";
import DarkModeToggle from "./components/DarkModeToggle";
import Footer from "./components/Footer";

function App() {
    return (
        <div className="font-openSans">
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/destinations" element={<Destinations />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/forum" element={<Forum />} />
                    <Route path="/create-post" element={<CreatePost />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
                <DarkModeToggle />
                <Footer />
            </Router>
        </div>
    );
}

export default App;
