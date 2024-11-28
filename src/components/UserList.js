import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USERS, DELETE_USER } from "../graphql/queries";

const UserList = ({ onEdit }) => {
  const { loading, error, data, refetch } = useQuery(GET_USERS);
  const [deleteUser] = useMutation(DELETE_USER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDelete = async (id) => {
    await deleteUser({ variables: { id } });
    refetch();
  };

  return (
    <div className="user-list">
      <h2>User List</h2>
      <ul>
        {data.users.map((user) => (
          <li key={user.id}>
            <span>{user.name} ({user.email})</span>
            <button onClick={() => onEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
