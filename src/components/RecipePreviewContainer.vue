<template>
  <b-container class="recipe-preview-list">
    <b-row class="recipe-row" v-for="rChunk in chunkedRecipes" :key="rChunk[0].id">
      <b-col v-for="r in rChunk" :key="r.id" cols="12" md="4" class="recipe-col">
        <RecipePreview :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { GetUserFavoriteRecipes, GetUsersRecipes } from "../services/recipes";
import RecipePreview from "./RecipePreview.vue";

export default {
  name: "RecipePreviewContainer",
  components: {
    RecipePreview,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    recipeType: {
      type: String,
      required: true,
      validator: value => ['favorite', 'created'].includes(value),
    }
  },
  data() {
    return {
      recipes: []
    };
  },
  computed: {
    chunkedRecipes() {
      const chunkSize = 3;
      return this.recipes.reduce((resultArray, item, index) => { 
        const chunkIndex = Math.floor(index / chunkSize);

        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = []; // start a new chunk
        }

        resultArray[chunkIndex].push(item);

        return resultArray;
      }, []);
    }
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        console.log("userid from storage is: "+ this.$root.store.userId);
        let user_id = this.$root.store.userId;
        let response;
        console.log("userid is:" + user_id);
        console.log("type is :" + this.recipeType);
        if (this.recipeType === 'favorite') {
          response = await GetUserFavoriteRecipes(user_id);
        } else if (this.recipeType === 'created') {
          response = await GetUsersRecipes(user_id);
        }
        console.log("Recipes response data:", response);
        const recipes = response;  // response.data is the array of recipes
        this.recipes = recipes;  // Directly assign the array to 'recipes' data property
      } catch (error) {
        console.log(error);
      }
    }
  },
};
</script>

<style scoped>
.recipe-preview-list {
  padding: 20px 0;
}

.recipe-row + .recipe-row {
  border-top: 2px solid #774700; /* Light orange */
  margin-top: 15px; /* Add some space between rows */
}

.recipe-col {
  padding: 10px;
}
</style>
