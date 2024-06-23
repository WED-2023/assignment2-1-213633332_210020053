// src/services/recipes.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";


export function mockGetRecipesPreview(amount = 1) {
  let recipes = [];
  for(let i = 0; i < amount; i++){
    recipes.push(recipe_preview[i%3]);
  }

  return { data: { recipes: recipes } };
}
export function mockGetRecentlySaw(amount) {
  let favorite_recipes = mockGetRecipesPreview(amount);
  return { status: 200, data: { recipes: favorite_recipes.data.recipes } } ;
}


export function mockGetRecipeFullDetails(recipeId) {
    return { status: 200, data: { recipe: recipe_full_view } } ;
  }
export function mockGetUserFavoriteRecipes(userId){
  let favorite_recipes = mockGetRecipesPreview(9);
  return { status: 200, data: { recipes: favorite_recipes.data.recipes } } ;
}
export function mockGetUsersRecipes(userId){
  users_recipes = mockGetRecipesPreview(9);
  return { status: 200, data: { recipes: users_recipes.data.recipes } } ;
}


  
