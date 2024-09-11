// src/services/auth.js
  import users_details from '../assets/mocks/registered_users.json'
  import axios from 'axios';
 

  const server_domain = "https://idan-david.cs.bgu.ac.il"
  // Parse the JSON data and extract the usernames
  const users = users_details;
  const usernames_data = users.map(user => user.username);


  export async function login(credentials) {
    const { username, password } = credentials;
  
    try {
      console.log("log in")
      // Send POST request to the server with the provided username and password
      const response = await axios.post(`${server_domain}/Login`, { username, password });
      
      // If the response is successful, return the response data
      if (response && response.data) {
        return response.data;
      } else {
        throw { status: 500, response: { data: { message: 'Unexpected server response', success: false } } };
      }
    } catch (error) {
      // Handle errors, including those returned by the server
      if (error.response && error.response.data) {
        throw { status: error.response.status, response: { data: error.response.data } };
      } 
      else {
        throw { status: 500, response: { data: { message: 'An unexpected error occurred', success: false } } };
      }
    }
  }


  
  export async function register(userDetails) {
    try {
      console.log(`${server_domain}/Register`)
      const response = await axios.post(`${server_domain}/Register`, userDetails);
  
      return { status: response.status, response: { data: response.data } };
    } catch (error) {
      // Handle error response from the server
      if (error.response) {
        throw { status: error.response.status, response: { data: error.response.data } };
      } 
      else {
        // Handle any unexpected errors
        throw { status: 500, response: { data: { message: "An unexpected error occurred", success: false } } };
      }
    }
  }



  export async function logout() {
    try {
      const response = await axios.post(`${server_domain}/Logout`);
      return { status: response.status, response: { data: response.data } };
    } catch (error) {
      if (error.response && error.response.data) {
        throw { status: error.response.status, response: { data: error.response.data } };
      } else {
        throw { status: 500, response: { data: { message: 'An unexpected error occurred', success: false } } };
      }
    }
  }


