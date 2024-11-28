import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER, UPDATE_USER } from "../graphql/queries";

const UserForm = ({ selectedUser, onComplete }) => {
  const [name, setName] = useState(selectedUser?.name || "");
  const [email, setEmail] = useState(selectedUser?.email || "");
  const [age, setAge] = useState(selectedUser?.age || "");
  const [phoneNumber, setPhoneNumber] = useState(selectedUser?.phone_number || "");
  const [address, setAddress] = useState(selectedUser?.address || "");
  const [dateOfBirth, setDateOfBirth] = useState(selectedUser?.date_of_birth || "");
  const [profilePictureUrl, setProfilePictureUrl] = useState(selectedUser?.profile_picture_url || "");

  const [createUser] = useMutation(CREATE_USER);
  const [updateUser] = useMutation(UPDATE_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const variables = {
      name,
      email,
      age: parseInt(age, 10), // Ensure age is an integer
      phone_number: phoneNumber,
      address,
      date_of_birth: dateOfBirth,
      profile_picture_url: profilePictureUrl,
    };

    try {
      if (selectedUser) {
        await updateUser({ variables: { ...variables, id: selectedUser.id } });
      } else {
        await createUser({ variables });
      }
      onComplete();
    } catch (error) {
      console.error("Error saving user:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <h2>{selectedUser ? "Edit User" : "Add User"}</h2>
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
      <button type="submit">{selectedUser ? "Update" : "Create"}</button>
    </form>
  );
};

export default UserForm;
