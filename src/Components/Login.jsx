import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("userData"));

    if (savedUser && savedUser.username === username && savedUser.password === password) {
      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);   // ✅ state update
      toast.success("Login successful!");
      navigate("/home");          // ✅ redirect
    } else {
      toast.error("Invalid username or password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-orange-100">
      <h1 className="text-3xl font-bold mb-6 text-orange-600">Login</h1>
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md flex flex-col gap-4 w-80">
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
          Login
        </button>
      </form>
      <p className="mt-4">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-orange-600 font-semibold">Signup</Link>
      </p>
    </div>
  );
};

export default Login;
