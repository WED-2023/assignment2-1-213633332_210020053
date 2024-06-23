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
  import { mockGetUserFavoriteRecipes } from "../services/recipes";
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
          let user_id = 1;
          const response = mockGetUserFavoriteRecipes(user_id);
  
          const recipes = response.data.recipes;
          this.recipes = [];
          this.recipes.push(...recipes);
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
  