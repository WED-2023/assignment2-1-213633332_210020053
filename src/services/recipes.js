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
export function mockGetUserFavoriteRecipes(userId){
  let favorite_recipes = mockGetRecipesPreview(9);
  return { status: 200, data: { recipes: favorite_recipes.data.recipes } } ;
}
export function mockGetUsersRecipes(userId){
  users_recipes = mockGetRecipesPreview(9);
  return { status: 200, data: { recipes: users_recipes.data.recipes } } ;
}


  
