import React, { useState } from "react";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import "./styles/App.scss";

function App() {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  const handleComplete = () => {
    setSelectedUser(null);
  };

  return (
    <div className="App">
      <h1>User Management</h1>
      <UserList onEdit={handleEdit} />
      <UserForm selectedUser={selectedUser} onComplete={handleComplete} />
    </div>
  );
}

export default App;
