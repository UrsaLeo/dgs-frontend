import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USERS, DELETE_USER, CREATE_USER, GET_USER_BY_ID, UPDATE_USER } from "../graphql/queries";

const UserManagement = () => {
  const { loading, error, data, refetch } = useQuery(GET_USERS);
  const [selectedUserId, setSelectedUserId] = useState(null);  // Ensure this is declared at the top of the component

  const { data: userData, } = useQuery(GET_USER_BY_ID, {
    variables: { id: selectedUserId },
    skip: !selectedUserId, // Skip this query when no user is selected
  });

  const [deleteUser] = useMutation(DELETE_USER); // Mutation to delete user
  const [updateUser] = useMutation(UPDATE_USER); // Mutation to update user
  const [createUser] = useMutation(CREATE_USER); // Mutation to create user

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");

  useEffect(() => {
      if (userData && userData.userById) {
      const user = userData.userById;
      setName(user.name);
      setEmail(user.email);
      setAge(user.age);
      setPhoneNumber(user.phoneNumber);
      setAddress(user.address);
      setDateOfBirth(user.dateOfBirth);
      setProfilePictureUrl(user.profilePictureUrl);
    }
  }, [userData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDelete = async (id) => {
    await deleteUser({ variables: { id } });
    refetch();
  };

  const handleEdit = async (id) => {
    setSelectedUserId(id); // Set the user ID to fetch user data for editing
  };

  const handleCreate = () => {
    setSelectedUserId(null); // Reset form for creating a new user
    setName("");
    setEmail("");
    setAge("");
    setPhoneNumber("");
    setAddress("");
    setDateOfBirth("");
    setProfilePictureUrl("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const variables = {
      name,
      email,
      age: parseInt(age, 10),
      phoneNumber,
      address,
      dateOfBirth,
      profilePictureUrl,
    };

    try {
      if (selectedUserId) {
        // Update existing user
        await updateUser({ variables: { ...variables, id: selectedUserId } });
      } else {
        // Create new user
        await createUser({ variables });
      }
      refetch();
      setSelectedUserId(null); // Reset the form
    } catch (error) {
      console.error("Error saving user:", error.message);
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      <button onClick={handleCreate}>Add New User</button>

      <div className="user-list">
        <h3>User List</h3>
        <ul>
          {data.users.map((user) => (
            <li key={user.id}>
              <span>{user.name} ({user.email})</span>
              <button onClick={() => handleEdit(user.id)}>Edit</button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="user-form">
        <h3>{selectedUserId ? "Edit User" : "Create User"}</h3>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        <input
          type="text"
          placeholder="Profile Picture URL"
          value={profilePictureUrl}
          onChange={(e) => setProfilePictureUrl(e.target.value)}
        />
        <button type="submit">{selectedUserId ? "Update" : "Create"}</button>
      </form>
    </div>
  );
};

export default UserManagement;
