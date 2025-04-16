import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    const { email, password } = credentials;

    try {
      const response = await fetch("http://localhost:5000/api/loginuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();
      console.log("Server Response:", json);

      if (response.ok) {
        alert("Login successful! Redirecting...");
        localStorage.setItem("authToken", json.authToken); // Store the token in local storage
        navigate("/"); // Redirect after successful login
      } else {
        setError(json.errors ? json.errors[0].msg : json.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Something went wrong. Please try again later.");
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card p-4 shadow">
            <h2 className="text-center">Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter your email"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
            <p className="text-center mt-3">
              Don't have an account? <a href="/createuser">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
