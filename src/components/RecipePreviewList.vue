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
import { getRandomRecipesPreview } from "../services/recipes.js";
import axios from 'axios'; // Import axios


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
      return this.random ? "Explore this recipes" : "Recently Viewed Recipes";
    }
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const amountToFetch = 1;
        let response;


        response = await getRandomRecipesPreview(amountToFetch);
        console.log("what is left on the frontend side (RecipePrewviewLIst.vue) page")
        console.log(response.data)

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
  // background-color: rgba(214, 228, 240, 1); /* Light blue-gray background */ Color 2: #235351
  background-color: #80bebb;
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