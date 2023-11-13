import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import AuthService from "../services/AuthService";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the login function from AuthService
      const accessToken = await AuthService.login({
        email: email,
        password: password,
      });

      // Set the JWT token in the browser's localStorage or cookies as needed
      // Here, I'm storing it in localStorage. You can adjust based on your needs.
      localStorage.setItem("accessToken", accessToken);

      // Call onLogin function with true to update isLoggedIn state in App component
      onLogin(true);

      // Navigate to the home page on successful login
      navigate("/");
    } catch (error) {
      if (error.status === 401) {
        alert("Incorrect Email or password!");
      } else {
        alert(error.message);
      }
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
        <form onSubmit={handleSubmit}>
          <div className="mt-6 w-full max-w-md">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-teal-400"
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-4 p-2 border-b-2 border-gray-300 focus:outline-none focus:border-teal-400"
            />
          </div>

          <br />
          <br />

          <br />
          <p className="text-lg">
          Don't have an account?{" "}
          <Link to={"/register"} className="text-blue-500 hover:underline">
            Create your account
          </Link>{" "}
          </p>
            <button
                type="submit"
                className="mt-8 mx-auto bg-gradient-to-r from-teal-400 to-teal-500 text-white font-semibold py-2 px-4 rounded-full focus:outline-none hover:shadow-md"
            >
                Login
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default Login;
