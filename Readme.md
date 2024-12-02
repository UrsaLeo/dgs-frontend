#Add a user
mutation {
  addUser(name: "Bob Doe", email: "bob@example.com", age: 30, phoneNumber: "1234567890", address: "123 Main St", dateOfBirth: "1994-01-01", profilePictureUrl: "http://example.com/profile.jpg") {
    success
    message
    statusCode
  }
}

#Delete a user
mutation {
  deleteUser(id: 13) {
    success
    message
    statusCode
  }
}


#Get all users
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


#Get user by id
query {
    userById(id: 5) {
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
