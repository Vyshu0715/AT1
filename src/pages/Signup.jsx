// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();

  // Input field configurations
  const fields = [
    { name: "name", label: "Full Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Mobile Number", type: "tel" },
    { name: "password", label: "Password", type: "password" },
    { name: "confirmPassword", label: "Confirm Password", type: "password" },
  ];

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    profession: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      // 🌐 Backend endpoint — use proxy OR absolute URL
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/users";

      const res = await axios.post(
        API_URL,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          profession: formData.profession,
          password: formData.password,
        },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 10000, // 10s timeout in case backend isn't reachable
        }
      );

      console.log("✅ Signup Success:", res.data);
      alert(`🎉 Account created successfully for ${res.data.name}`);
      navigate("/login");
    } catch (err) {
      console.error("❌ Signup Error:", err);

      if (err.response) {
        alert(`Signup failed: ${err.response.data.message || "Try again!"}`);
      } else if (err.request) {
        alert("⚠️ Unable to connect to the server. Check if backend is running.");
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div key={field.name} className="form-group">
            <label>{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        {/* Profession dropdown */}
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

        <div className="button-group">
          <button
            type="submit"
            className="signup-btn"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          <button
            type="button"
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
}
