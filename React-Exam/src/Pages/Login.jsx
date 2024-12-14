import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

function SignIn({ userList, setIsLoggedIn }) {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const validUser  = userList.find((user) => user.username === loginUsername && user.password === loginPassword);
    if (validUser ) {
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      navigate("/home");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <div className="login-card">
      <div className="card">
      <input type="text" placeholder="Username" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)}/>
      <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}/>
      <button onClick={handleLogin}>Sign In</button>
      <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </div>
      </div>
    </div>
  );
}

export default SignIn;