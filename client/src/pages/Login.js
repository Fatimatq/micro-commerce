import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setError(""); // Clear previous errors
      console.log("Credentials:", credentials);

      // Now the login function automatically sets the token in the header
      const { accessToken, userId } = await AuthService.login(credentials);

      // Pass the user ID to onLogin
      onLogin(true, userId);

      // Pass the user ID to getUser
      const user = await AuthService.getUser(userId);

      navigate("/");
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response?.status === 401) {
        setError("Incorrect email or password!");
      } else {
        setError(error.message || "An error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-teal-400 via-teal-300 to-blue-500">
      {/* Left Section */}
      <div className="w-full md:w-1/2 bg-cover bg-center relative" style={{ backgroundImage: 'url("https://png.pngtree.com/background/20230413/original/pngtree-business-e-shopping-picture-image_2422998.jpg")' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-500 opacity-75"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white p-8">
          <div>
            <h1 className="text-5xl font-bold text-center mb-6">Welcome back</h1>
            <p className="text-lg text-center">
              Please log in to access your account and start exploring our exciting features.
            </p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 bg-white p-8 flex flex-col items-center justify-center">
        <h5 className="text-5xl mb-4">Login</h5>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-6 w-full max-w-md">
          {/* Email Input */}
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-teal-400"
          />

          {/* Password Input */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            className="w-full mt-4 p-2 border-b-2 border-gray-300 focus:outline-none focus:border-teal-400"
          />

          {/* Sign Up Link */}
          <p className="text-lg">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Create your account
            </Link>
          </p>

          {/* Login Button */}
          <button
            type="submit"
            className="mt-8 mx-auto bg-gradient-to-r from-teal-400 to-teal-500 text-white font-semibold py-2 px-4 rounded-full focus:outline-none hover:shadow-md"
            disabled={isLoading} // Disable the button when loading
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
