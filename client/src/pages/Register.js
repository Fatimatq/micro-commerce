import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!firstName || !lastName || !email || !phone || !password) {
      alert("All fields are required");
      return;
    }

    try {
      await AuthService.register({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
      });
      alert("User added successfully!");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-teal-400 via-teal-300 to-blue-500">
      {/* Left Section */}
      <div className="w-full md:w-1/2 bg-cover bg-center relative" style={{ backgroundImage: 'url("https://png.pngtree.com/background/20230413/original/pngtree-business-e-shopping-picture-image_2422998.jpg")' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-500 opacity-75"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white p-8">
          <div>
            <h1 className="text-5xl font-bold text-center mb-6">Join us Today</h1>
            <p className="text-lg text-center">Create your account and start exploring our exciting features.</p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 bg-white p-8 flex flex-col items-center justify-center">
        <h5 className="text-5xl mb-4">Register</h5>
        <div className="mt-6 w-full max-w-md">
          <input
            type="text"
            placeholder="Firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-teal-400"
            required
          />
          <input
            type="text"
            placeholder="Lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-teal-400"
            required
          />
          <input
            type="text"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-4 p-2 border-b-2 border-gray-300 focus:outline-none focus:border-teal-400"
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full mt-4 p-2 border-b-2 border-gray-300 focus:outline-none focus:border-teal-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-4 p-2 border-b-2 border-gray-300 focus:outline-none focus:border-teal-400"
            required
          />
        </div>

        <p className="text-lg mt-4">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>

        <button
          onClick={handleSubmit}
          className="mt-8 bg-gradient-to-r from-teal-400 to-teal-500 text-white font-semibold py-2 px-4 rounded-full focus:outline-none hover:shadow-md"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
