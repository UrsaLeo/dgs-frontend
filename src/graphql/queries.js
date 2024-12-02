import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query {
    users {
        id
        name
        email
        age
        phoneNumber
        address
        dateOfBirth
        profilePictureUrl
    }
  }
`;

// export const CREATE_USER = gql`
//   mutation addUser($name: String!, $email: String!) {
//     addUser(name: $name, email: $email, age: $age, phone_number:$phone_number, address: $address, date_of_birth: $date_of_birth, profile_picture_url: $profile_picture_url) {
//       id
//       name
//       email
//       age
//       phone_number
//       address
//       date_of_birth
//       profile_picture_url
//     }
//   }
// `;

export const CREATE_USER = gql`
  mutation addUser($name: String!, $email: String!, $age: Int!, $phoneNumber: String!, $address: String!, $dateOfBirth: String!, $profilePictureUrl: String!) {
  addUser(
    name: $name,
    email: $email,
    age: $age,
    phoneNumber: $phoneNumber,
    address: $address,
    dateOfBirth: $dateOfBirth,
    profilePictureUrl: $profilePictureUrl
  ) {
    success
    message
    statusCode
  }
}
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $name: String, $email: String) {
    updateUser(id: $id, name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

export const DELETE_USER = gql`
mutation DeleteUser($id: Int!) {
  deleteUser(id: $id) {
    success
    message
    statusCode
  }
}
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($id: Int!) {
    userById(id: $id) {
      id
      name
      email
      age
      phoneNumber
      address
      dateOfBirth
      profilePictureUrl
    }
  }
`;
// Define the mutation to edit a user
export const EDIT_USER = gql`
  mutation EditUser(
    $id: ID!
    $name: String
    $email: String
    $age: Int
    $phoneNumber: String
    $address: String
    $dateOfBirth: String
    $profilePictureUrl: String
  ) {
    editUser(
      id: $id
      name: $name
      email: $email
      age: $age
      phoneNumber: $phoneNumber
      address: $address
      dateOfBirth: $dateOfBirth
      profilePictureUrl: $profilePictureUrl
    ) {
      success
      message
      statusCode
    }
  }
`;
