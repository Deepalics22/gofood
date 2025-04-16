import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { name, email, password, location } = credentials;

    try {
      const response = await fetch("http://localhost:5000/api/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, location }),
      });

      const json = await response.json();
      console.log("Server Response:", json); // Debugging line

      if (response.ok) {
        alert("Signup successful! Redirecting to login...");
        navigate("/login");
      } else {
        alert(`Signup failed: ${json.errors ? json.errors[0].msg : json.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={credentials.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={credentials.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={credentials.location} onChange={handleChange} required />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already a user? <button className="btn btn-link" onClick={() => navigate("/login")}>Login here</button></p>
    </div>
  );
};

export default SignUp;
