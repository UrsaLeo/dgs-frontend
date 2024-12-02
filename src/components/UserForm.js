import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_USER, UPDATE_USER, GET_USER_BY_ID } from "../graphql/queries";

const UserForm = ({ selectedUserId, onComplete }) => {
  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    variables: { id: selectedUserId }, // Fetch the user by ID when selectedUserId changes
    skip: !selectedUserId,  // Don't run the query if no ID is selected
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");

  const [createUser] = useMutation(CREATE_USER);
  const [updateUser] = useMutation(UPDATE_USER);

  // Populate the form if data is available (when editing)
  useEffect(() => {
    if (data && data.userById) {
      const user = data.userById;
      setName(user.name);
      setEmail(user.email);
      setAge(user.age);
      setPhoneNumber(user.phoneNumber);
      setAddress(user.address);
      setDateOfBirth(user.dateOfBirth);
      setProfilePictureUrl(user.profilePictureUrl);
    }
  }, [data]);

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
        await updateUser({ variables: { ...variables, id: selectedUserId } });
      } else {
        await createUser({ variables });
      }
      onComplete();
    } catch (error) {
      console.error("Error saving user:", error.message);
    }
  };

  if (loading) return <p>Loading user data...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <h2>{selectedUserId ? "Edit User" : "Add User"}</h2>
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
  );
};

export default UserForm;
