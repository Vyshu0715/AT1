// App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Feedback from "./pages/Feedback";
import AboutUs from "./pages/AboutUs";
import Weeks from "./pages/Weeks";
import Timetable from "./pages/Timetable";
import Personal from "./pages/Personal";

import "./App.css";

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <Router>
      <Navbar toggleTheme={toggleTheme} theme={theme} />
      <main>
        <Routes>
          {/* 👇 Default route now points to Signup */}
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/weeks" element={<Weeks />} />
          <Route path="/timetable" element={<Timetable />} />
          <Route path="/personal" element={<Personal />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
