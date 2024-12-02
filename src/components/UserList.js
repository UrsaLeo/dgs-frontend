import React from "react";
import { useQuery, useMutation,useLazyQuery } from "@apollo/client";
import { GET_USERS, DELETE_USER, EDIT_USER,GET_USER_BY_ID } from "../graphql/queries"; // Ensure you have both query and mutation


const UserList = ({ onEdit }) => {
  const { loading, error, data, refetch } = useQuery(GET_USERS); // Query for user list
  const [deleteUser] = useMutation(DELETE_USER); // Mutation to delete user
  const [editUser] = useMutation(EDIT_USER);
  const [GetUserById] = useMutation(GET_USER_BY_ID);  // Mutation to edit user (should be different from GET_USER_BY_ID)


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDelete = async (id) => {
    await deleteUser({ variables: { id } });
    refetch();
  };

  const handleEdit = async (id) => {
    // Fetch user data by id when the edit button is clicked
    console.log("Fetching user data for id: " + id);

    try {
      // Use the appropriate mutation to edit the user (not GET_USER_BY_ID)
      const response = await GetUserById({ variables: { id } });

      // Log the response from the mutation (to see the user data)
      console.log("Data for id:", response.data);

      // Optionally, pass the fetched data to the parent to pre-fill the form
      onEdit(response.data.editUser); // Adjust to the correct field based on your mutation response

    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  return (
    <div className="user-list">
      <h2>User List</h2>
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
  );
};

export default UserList;
