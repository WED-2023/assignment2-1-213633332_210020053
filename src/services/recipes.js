// src/services/recipes.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";
import axios from 'axios';


const server_domain = "https://idan-david.cs.bgu.ac.il"





export async function getRecipeFullDetails(recipeId, isOriginCreated, userId) {
  try {
    console.log("here in recipes.js before calling the url: ");
    console.log("the recipe id: " + recipeId);
    console.log("is origin created? -> " + isOriginCreated);
    console.log("userID: " + userId);
    
    // Determine the URL based on the origin
    let url = isOriginCreated
      ? `${server_domain}/users/created/fullView/${userId}/${recipeId}`
      : `${server_domain}/recipes/fullview/${recipeId}`;
    
    console.log("here in recipes.js the url is : " + url);
    
    // Send GET request to the server with the determined URL
    const response = await axios.get(url); 

    console.log("The ingredients are : " + String(response.data.ingredients))

    // If the response is successful, return the recipe details
    if (response && response.data) {
      return { status: response.status, data: response.data };
    } else {
      throw { status: 500, data: { error: 'Unexpected server response' } };
    }
  } catch (error) {
    // Handle errors, including those returned by the server
    if (error.response && error.response.data) {
      throw { status: error.response.status, data: error.response.data };
    } else {
      throw { status: 500, data: { error: 'An unexpected error occurred' } };
    }
  }
}



export async function GetUserFavoriteRecipes() {
  try {
    console.log("enter")
    const response = await axios.get(`${server_domain}/users/favorites`, { withCredentials: true });//https://localhost:3000/users/favorites `${host}/favorites`
    console.log("getfav respons.data is: "+ response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching favorite recipes:", error);
    throw error;
  }
}



export async function GetUsersRecipes(userId) {
  try {
    const response = await axios.get(`${server_domain}/users/created/preView${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user recipes:", error);
    throw error;
  }
}


// Function to get random recipes preview from the backend
export async function getRandomRecipesPreview(numOfRecipes = 3) {
  try {
    // Send GET request to the backend to get random recipes
    const response = await axios.get(`${server_domain}/recipes/random`, {
      params: {
        number: numOfRecipes
      }
    });

    // If the response is successful, return the preview data
    if (response && response.data) {
      return { status: response.status, data: { recipes: response.data } };
    } else {
      throw { status: 500, data: { error: 'Unexpected server response' } };
    }
  } catch (error) {
    // Handle errors, including those returned by the server
    if (error.response && error.response.data) {
      throw { status: error.response.status, data: error.response.data };
    } else {
      throw { status: 500, data: { error: 'An unexpected error occurred' } };
    }
  }
}

