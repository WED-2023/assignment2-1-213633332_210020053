// src/services/user.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";
import axios from 'axios';

const server_domain = "https://idan-david.cs.bgu.ac.il"


export async function addFavorite(recipeId) {
  try {
    const response = await axios.post(`${server_domain}/users/favorites`, { recipeId });
    return { status: response.status, response: { data: response.data } };
  } catch (error) {
    if (error.response && error.response.data) {
      throw { status: error.response.status, response: { data: error.response.data } };
    } else {
      throw { status: 500, response: { data: { message: 'An unexpected error occurred', success: false } } };
    }
  }
}

export async function addUserRecipe(recipeDetails) {
  try {
    console.log("here in addUserRecipe at user.js the recipeDetails variable is : " + recipeDetails.data)
    const response = await axios.post(`${server_domain}/users/createRecipe`, recipeDetails);
    return { status: response.status, response: { data: response.data } };
  } catch (error) {
    if (error.response && error.response.data) {
      throw { status: error.response.status, response: { data: error.response.data } };
    } else {
      throw { status: 500, response: { data: { message: 'An unexpected error occurred', success: false } } };
    }
  }
}

  
  