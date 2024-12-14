import React, { useState, useEffect } from "react";
import "./Home.css";

function Home() {
  const [userName, setUserName] = useState("");
  const [userUsername, setUserUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userList, setUserList] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUserList = localStorage.getItem("userList");
    if (storedUserList) {
      setUserList(JSON.parse(storedUserList));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      const updatedList = userList.map((user) =>
        user.id === userId
          ? { name: userName, username: userUsername, email: userEmail, phone: userPhone, id: userId, active: user.active }
          : user
      );
      localStorage.setItem("userList", JSON.stringify(updatedList));
      setUserList(updatedList);
      setIsEditMode(false);
      setUserId("");
    } else {
      const newUser = { name: userName, username: userUsername, email: userEmail, phone: userPhone, id: Date.now(), active: true };
      const updatedList = [...userList, newUser];
      localStorage.setItem("userList", JSON.stringify(updatedList));
      setUserList(updatedList);
    }

    setUserName("");
    setUserUsername("");
    setUserEmail("");
    setUserPhone("");
  };

  const handleDelete = (id) => {
    const updatedList = userList.filter((user) => user.id !== id);
    localStorage.setItem("userList", JSON.stringify(updatedList));
    setUserList(updatedList);
  };

  const handleEdit = (id) => {
    const userToEdit = userList.find((user) => user.id === id);
    setUserName(userToEdit.name);
    setUserUsername(userToEdit.username);
    setUserEmail(userToEdit.email);
    setUserPhone(userToEdit.phone);
    setUserId(id);
    setIsEditMode(true);
  };

  const handleToggleActive = (id) => {
    const updatedList = userList.map((user) =>
      user.id === id
        ? { ...user, active: !user.active }
        : user
    );
    localStorage.setItem("userList", JSON.stringify(updatedList));
    setUserList(updatedList);
  };

  return (
    <div className="home-container">
      <h2>Welcome to the Home Page!</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Name"
          className="form-input"
        />
        <input
          type="text"
          value={userUsername}
          onChange={(e) => setUserUsername(e.target.value)}
          placeholder="Username"
          className="form-input"
        />
        <input
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="Email"
          className="form-input"
        />
        <input
          type="tel"
          value={userPhone}
          onChange={(e) => setUserPhone(e.target.value)}
          placeholder="Phone"
          className="form-input"
        />
        <button type="submit" className="submit-btn">
          {isEditMode ? "Update" : "Create"}
        </button>
      </form>

      {/* Table to display user data */}
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button
                  onClick={() => handleToggleActive(user.id)}
                  className={user.active ? "active-btn" : "inactive-btn"}
                >
                  {user.active ? "Active" : "Inactive"}
                </button>
              </td>
              <td>
                <button onClick={() => handleEdit(user.id)} className="edit-btn">Edit</button>
              </td>
              <td>
              <button onClick={() => handleDelete(user.id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;