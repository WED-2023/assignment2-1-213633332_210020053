// src/services/auth.js
  import users_details from '../assets/mocks/registered_users.json'
  import axios from 'axios'; // Import axios

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

  export async function register(userDetails) {
    try {
      const response = await axios.post('​​​https://localhost:3000/Register', {
        username: userDetails.username,
        firstname: userDetails.firstname,
        lastname: userDetails.lastname,
        country: userDetails.country,
        password: userDetails.password,
        email: userDetails.email,
      });

      return { status: response.status, response: { data: response.data } };
    } catch (error) {
      // Handle error response from the server
      if (error.response) {
        throw { status: error.response.status, response: { data: error.response.data } };
      } else {
        // Handle any unexpected errors
        throw { status: 500, response: { data: { message: "An unexpected error occurred", success: false } } };
      }
    }
  }
  

  export async function login(credentials) {
    
    try {
      //const { username, password } = credentials;
      
      console.log(credentials);

      //let server_domain = "https://idan-david.cs.bgu.ac.il/"
      let server_domain = "https://localhost:3000/"

      console.log("log in")
      console.log(server_domain + "login")
      // Send POST request to the server with the provided username and password
      const response = await axios.post(server_domain + "login", credentials );

      // If the response is successful, return the response data
      if (response && response.data) {
        return { status: response.status, response: { data: response.data } };
      } else {
        throw { status: 500, response: { data: { message: 'Unexpected server response', success: false } } };
      }
    } catch (error) {
      // Handle errors, including those returned by the server
      console.log("got an error");
      console.log(error.message)
      if (error.response  && error.response.data) {
        throw { status: error.response.status, response: { data: error.response.data } };
      } 
      else {
        throw { status: 500, response: { data: { message: 'An unexpected error occurred', success: false } } };
      }
    }
  }