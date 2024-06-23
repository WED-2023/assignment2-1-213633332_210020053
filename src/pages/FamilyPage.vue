<template>
  <div class="family-recipes-page">
    <h1 class="page-title">Family Recipes</h1>
    <div class="divider"></div>
    <div class="family-recipes-container">
      <div class="recipe" v-for="(recipe, index) in recipes" :key="index" :class="recipeClass(index)">
        <h2>{{ recipe.name }}</h2>
        <h3>By: {{ recipe.origin }}</h3>
        <p>Occasion: {{ recipe.occasion }}</p>
        <img :src="require(`@/assets/images/${recipe.image}`)" alt="Recipe Image" class="recipe-image">
        <h4>Ingredients:</h4>
        <ul class="ingredients-list">
          <li v-for="(ingredient, idx) in recipe.ingredients" :key="idx">{{ ingredient }}</li>
        </ul>
        <h4>Preparation:</h4>
        <ol class="preparation-steps">
          <li v-for="(step, idx) in recipe.preparation" :key="idx">{{ step }}</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import recipes from "@/assets/mocks/recipe_family.json";

export default {
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.recipes = recipes.recipes;
  },
  methods: {
    recipeClass(index) {
      if (index === 0) return 'left-recipe';
      if (index === 1) return 'center-recipe';
      return 'right-recipe';
    }
  }
};
</script>

<style scoped>
.family-recipes-page {
  padding: 20px;
  text-align: center;
}

.page-title {
  font-size: 2em;
  margin-bottom: 10px;
}

.divider {
    border-bottom: 2px solid #d2691e; /* Orange-brown color */
    margin: 10px 0 20px;
  }
  
.family-recipes-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px; /* Add gap between each recipe */
}

.recipe {
  background-color: rgba(255, 255, 255, 0.8); /* Slightly transparent background */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1;
  text-align: center;
}

.recipe img {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 20px;
}

.ingredients-list {
  list-style-type: none; /* Remove dots from ingredients list */
  padding-left: 0; /* Remove default padding */
  text-align: center; /* Center text */
}

.preparation-steps {
  text-align: left; /* Align text to the left */
}

.left-recipe {
  align-self: flex-start;
}

.center-recipe {
  align-self: flex-start;
}

.right-recipe {
  align-self: flex-start;
}
</style>
