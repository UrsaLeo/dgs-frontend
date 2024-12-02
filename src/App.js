import React, { } from "react";
 // Import the combined UserManagement component
import "./styles/App.scss";
import UserManagement from "./components/UserManagement";

function App() {
  return (
    <div className="App">
      <h1>User Management</h1>
      <UserManagement/>{/* Use the combined UserManagement component */}
    </div>
  );
}

export default App;
