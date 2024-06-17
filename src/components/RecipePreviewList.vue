<template>
  <b-container>
    <h3>{{ computedTitle }}</h3>
    <b-row>
      <b-col cols="12" v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipe-preview" :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
import { mockGetRecipesPreview } from "../services/recipes.js";
import { mockGetRecentlySaw } from "../services/recipes.js";

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
.recipe-preview {
  margin-bottom: 20px;
}
</style>
