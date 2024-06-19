<template>
  <b-container class="recipe-preview-container">
    <h3 class="text-center">{{ computedTitle }}</h3>
    <b-row class="justify-content-center">
      <b-col cols="12" v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipe-preview" :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
import { mockGetRecipesPreview, mockGetRecentlySaw } from "../services/recipes.js";

export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    random: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      recipes: []
    };
  },
  computed: {
    computedTitle() {
      return this.random ? "Find Your Taste" : "Recently Viewed Recipes";
    }
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const amountToFetch = 3;
        let response;

        if (this.random) {
          response = mockGetRecipesPreview(amountToFetch);
        } else {
          response = mockGetRecentlySaw(amountToFetch);
        }

        this.recipes = response.data.recipes;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.recipe-preview-container {
  background-color: rgba(214, 228, 240, 1); /* Light blue-gray background */
  padding: 20px; /* Keep padding for top and bottom */
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 50%; /* Adjusted width to be shorter */
  max-width: 500px; /* Ensure it doesn't get too wide on large screens */
  margin: 0 auto; /* Center the container */
}

.recipe-preview {
  margin-bottom: 20px;
}

.text-center {
  text-align: center;
}
</style>
