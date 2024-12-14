import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./Pages/Register";
import SignIn from "./Pages/Login";
import Home from "./Pages/Home";

function App() {
  const [userList, setUserList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedAuthStatus = localStorage.getItem("isLoggedIn");
    if (storedAuthStatus) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn userList={userList} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<SignUp setUserList={setUserList} />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;