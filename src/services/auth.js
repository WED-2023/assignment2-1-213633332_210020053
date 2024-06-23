// src/services/auth.js
  import users_details from '../assets/mocks/registered_users.json'

  // Parse the JSON data and extract the usernames
  const users = users_details;
  const usernames_data = users.map(user => user.username);

  export function mockLogin(credentials, success = true) {
    const { username, password } = credentials;
  
    // Check if already logged in
    if (!success) {
      throw { status: 409, response: { data: { message: 'A user is already logged in', success: false } } };
    }
  
    // Find the user with the provided username
    const user = users.find((user) => user.username === username);
  
    // If the user is not found or the password doesn't match, throw an error
    if (!user || user.password !== password) {
      throw { status: 401, response: { data: { message: 'Invalid username or password' } } };
    }
  
    // If the user is found and the password matches, return a success message
    return { status: 200, response: { data: { message: 'Login succeeded', success: true } } };
  }
  

  export function mockRegister(userDetails, success = true) {

    if (!success || usernames_data.includes(userDetails.username)) {
      throw { status: 409, response: { data: { message: "Username taken", success: false } } };
    }
  
    return { status: 200, response: { data: { message: "user created", success: true}} };
  }
  


  export function mockLogout() {
    return { status: 200, response: { data: { message: "logout succeeded", success: true}} };

  }
  
