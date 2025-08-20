import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (username && password) {
      const userData = { username, password };
      localStorage.setItem("userData", JSON.stringify(userData));
      toast.success("Signup successful! Please login.");
      navigate("/login");
    } else {
      toast.error("Please enter username and password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-orange-100">
      <h1 className="text-3xl font-bold mb-6 text-orange-600">Signup</h1>
      <form onSubmit={handleSignup} className="bg-white p-6 rounded shadow-md flex flex-col gap-4 w-80">
        <input
          type="text"
          placeholder="Username"
          className="border p-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-orange-500 text-white py-2 rounded hover:bg-orange-600">
          Signup
        </button>
      </form>
      <p className="mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-orange-600 font-semibold">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
