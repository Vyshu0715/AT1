import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import "./Login.css";

// --- NEW LINE (Best Practice) ---
// Use the environment variable for production, but fall back to localhost for local development
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    profession: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // --- MODIFIED LINE ---
      // Use the API_BASE_URL variable instead of a hard-coded string
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email: formData.email,
        password: formData.password,
        profession: formData.profession,
      });

      console.log("Login Response:", res.data);

      localStorage.setItem("user", JSON.stringify(res.data));

      alert(`Welcome ${res.data.name}!`);

      if (res.data.profession === "Student") {
        navigate("/personal");
      } else if (res.data.profession === "Faculty") {
        navigate("/weeks");
      } else {
        navigate("/profile");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert("Invalid email, password or profession!");
      } else {
        alert("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password with toggle */}
        <div className="form-group password-field">
          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Profession Dropdown */}
        <div className="form-group">
          <label>Profession</label>
          <select
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Profession --</option>
            <option value="Student">Student</option>
            <option value="Faculty">Faculty</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="button-group">
          <button type="submit" className="login-btn">
            Login
          </button>
          <button
            type="button"
            className="signup-btn"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}