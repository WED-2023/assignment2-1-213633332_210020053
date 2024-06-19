<template>
    <div class="my-recipes">
      <div class="header">
        <h3>{{ title }}<slot></slot></h3>
        <div class="sort-container">
          <span class="sort-icon" @click="toggleSortOptions">⋮</span>
          <div v-if="showSortOptions" class="sort-options">
            <div class="sort-header">Sort by</div>
            <div class="sort-option" @click="sortBy('time')">Time</div>
            <div class="sort-option" @click="sortBy('likes')">Likes</div>
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <RecipePreviewContainer :title="title" :recipes="sortedRecipes" />
    </div>
  </template>
  
  <script>
  import RecipePreviewContainer from "@/components/RecipePreviewContainer.vue";
  import { mockGetUsersRecipes } from "@/services/recipes.js";
  
  export default {
    name: "MyRecipes",
    components: {
      RecipePreviewContainer,
    },
    data() {
      return {
        favoriteRecipes: [],
        sortOption: "time",
        showSortOptions: false,
        title: "Your Recipes",
      };
    },
    computed: {
      sortedRecipes() {
        return this.favoriteRecipes.slice().sort((a, b) => {
          if (this.sortOption === "time") {
            return new Date(b.time) - new Date(a.time);
          } else if (this.sortOption === "likes") {
            return b.likes - a.likes;
          }
          return 0;
        });
      },
    },
    async created() {
      try {
        const response = mockGetUsersRecipes(this.$route.params.userId);
        if (response.status === 200) {
          this.favoriteRecipes = response.data.recipes;
        }
      } catch (error) {
        console.error("Failed to fetch favorite recipes:", error);
      }
    },
    methods: {
      toggleSortOptions() {
        this.showSortOptions = !this.showSortOptions;
      },
      sortBy(option) {
        this.sortOption = option;
        this.showSortOptions = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .my-recipes {
    padding: 20px;
    background-color: transparent; /* Make sure the background is transparent */
  }
  
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  
  .header h3 {
    margin: 0;
    display: inline;
  }
  
  .sort-container {
    display: inline;
    position: relative;
  }
  
  .sort-icon {
    margin-left: 10px;
    cursor: pointer;
    font-weight: bold;
  }
  
  .sort-options {
    position: absolute;
    top: -10px;
    left: 100%;
    background-color: white;
    border: 1px solid #ccc;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 10;
    white-space: nowrap;
    padding: 10px;
    border-radius: 4px;
  }
  
  .sort-header {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .sort-option {
    padding: 5px;
    cursor: pointer;
  }
  
  .sort-option:hover {
    background-color: #f0f0f0;
  }
  
  .divider {
    border-bottom: 2px solid #d2691e; /* Orange-brown color */
    margin: 10px 0 20px;
  }
  
  .recipe-preview-list {
    padding: 20px 0;
  }
  
  .recipe-row + .recipe-row {
    border-top: 1px solid #ffcc80; /* Light orange */
    margin-top: 20px; /* Add some space between rows */
  }
  
  .recipe-col {
    padding: 10px;
  }
  </style>
  