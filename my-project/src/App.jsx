import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { supabase } from './supabaseClient';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    const { error } = await supabase.from("users").insert([{ email, password }]);
    if (error) {
      setMessage("Error signing up: " + error.message);
    } else {
      setMessage("Sign-up successful!");
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 bg-[url('https://media1.tenor.com/m/Zco-fadJri4AAAAd/code-matrix.gif')]">
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 mb-2 w-80"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 mb-2 w-80"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 w-80" onClick={handleSignUp}>
        Sign Up
      </button>
      {message && <p className="text-red-500 mt-4">{message}</p>}
      <Link to="/login" className="text-blue-700 underline mt-4">
        Already have an account? Login
      </Link>
    </div>
  );
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("password", password);
    if (data.length > 0) {
      setMessage("Login successful!");
      navigate("/captcha");
    } else {
      setMessage("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 bg-[url('https://media1.tenor.com/m/Zco-fadJri4AAAAd/code-matrix.gif')]">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 mb-2 w-80"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 mb-2 w-80"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-green-500 text-white px-4 py-2 w-80" onClick={handleLogin}>
        Login
      </button>
      {message && <p className="text-red-500 mt-4">{message}</p>}
      <Link to="/signup" className="text-blue-700 underline mt-4">
        Don't have an account? Sign Up
      </Link>
    </div>
  );
};

const Captcha = () => {
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [userInput, setUserInput] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function generateCaptcha() {
    return Math.random().toString(36).substring(2, 8);
  }

  const handleVerify = () => {
    if (userInput === captcha) {
      setMessage("Captcha verified!");
      navigate("/home");
    } else {
      setMessage("Captcha mismatch. Try again.");
      setCaptcha(generateCaptcha());
      setUserInput("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white bg-[url('https://media1.tenor.com/m/bC46isnYvywAAAAC/coding.gif')]">
      <h1 className="text-3xl font-bold mb-4">Captcha Verification</h1>
      <p className="text-3xl font-mono mb-4">{captcha}</p>
      <input
        type="text"
        placeholder="Enter Captcha"
        className="border p-2 mb-2 w-80 text-black"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button className="bg-orange-500 text-white px-4 py-2 w-80" onClick={handleVerify}>
        Verify
      </button>
      {message && <p className="text-red-500 mt-4">{message}</p>}
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();  // Log the user out
    navigate("/login");  // Redirect to login page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 bg-[url('https://media1.tenor.com/m/hvjyksLFaB4AAAAd/light-light-yagami.gif')]">
      <h1 className="text-4xl font-bold text-blue-500">Welcome Home!</h1>
      <p className="text-xl mt-4">You have successfully logged in!</p>
      <button
        className="bg-red-500 text-white px-4 py-2 mt-4"
        onClick={handleLogout}
      >
        Log Out
      </button>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/captcha" element={<Captcha />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
