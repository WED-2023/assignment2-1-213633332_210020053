// src/services/recipes.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";
import axios from 'axios';



export function mockGetRecipesPreview(amount = 1) {
  let recipes = [];
  for(let i = 0; i < amount; i++){
    recipes.push(recipe_preview[i%3]);
  }

  return { data: { recipes: recipes } };
}
//altrenative with axios:
export function mockGetRecentlySaw(amount) {
  let favorite_recipes = mockGetRecipesPreview(amount);
  return { status: 200, data: { recipes: favorite_recipes.data.recipes } } ;
}
//altrenative with axios:

export function mockGetRecipeFullDetails(recipeId) {
  console.log(`Searching for recipe with id: ${recipeId}`);
  
  // Find the recipe in the imported JSON data based on recipeId
  // foundRecipe = recipe_preview.find(recipe => {
  //   console.log(`Comparing recipe id ${recipe.id} with ${recipeId}`);
  //   return recipe.id === recipeId;
  // });
  let foundRecipe = recipe_full_view[1];
  for (let i = 0; i < recipe_full_view.length; i ++){
    if (recipe_full_view[i].id === recipeId){
        foundRecipe = recipe_full_view[i]
    }
  }
  if (foundRecipe) {
    // Return a mock response with status 200 and the found recipe details
    console.log(`Recipe with id ${recipeId} found.`);
    return { status: 200, data: { recipe: foundRecipe } };
  } else {
    // If recipe with given recipeId is not found, return an error or appropriate response
    console.log(`Recipe with id ${recipeId} not found.`);
    return { status: 404, data: { error: 'Recipe not found' } };
  }
}
//altrenative with axios:
export async function getRecipeFullDetails(recipeId,isOriginCreated) {
  try {
    // Determine the URL based on the origin
    const url = isOriginCreated 
      ? `${this.$root.store.server_domain}/users/created/fullView/${userId}:${recipeId}`
      : `${this.$root.store.server_domain}/recipes/fullview/${recipeId}`;
    
    // Send GET request to the server with the determined URL
    const response = await axios.get(url);    
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

export function mockGetUserFavoriteRecipes(userId){
  let favorite_recipes = mockGetRecipesPreview(9);
  return { status: 200, data: { recipes: favorite_recipes.data.recipes } } ;
}
//altrenative with axios:

export async function GetUserFavoriteRecipes() {
  try {
    console.log("enter")
    const response = await axios.get(`${this.$root.store.server_domain}/users/favorites`, { withCredentials: true });//​https://localhost:3000/users/favorites `${host}/favorites`
    return response.data;
  } catch (error) {
    console.error("Error fetching favorite recipes:", error);
    throw error;
  }
}
export function mockGetUsersRecipes(userId){
  users_recipes = mockGetRecipesPreview(9);
  return { status: 200, data: { recipes: users_recipes.data.recipes } } ;
}
//altrenative with axios:

export async function GetUsersRecipes(userId) {
  try {
    const response = await axios.get(`${this.$root.store.server_domain}/users/created/preView${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user recipes:", error);
    throw error;
  }
}



  
