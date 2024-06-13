<template>
  <div class="recipe-preview">
    <div class="recipe-body">
      <router-link :to="{ name: 'recipe', params: { recipeId: recipe.id } }">
        <img :src="imagePath" class="recipe-image" alt="Recipe Image" />
      </router-link>
      <img v-if="visited" src="../assets/images/eye.png" class="eye-icon" alt="Visited" @mouseover="showTooltip('This recipe has been watched already')" @mouseleave="hideTooltip" />
      <div v-if="showTooltipFlag" class="tooltip">{{ tooltipText }}</div>
    </div>
    <div class="recipe-footer">
      <router-link :to="{ name: 'recipe', params: { recipeId: recipe.id } }">
        <div :title="recipe.title" class="recipe-title">
          {{ recipe.title }}
        </div>
      </router-link>
      <ul class="recipe-overview">
        <li>{{ recipe.readyInMinutes }} minutes</li>
        <li>{{ recipe.aggregateLikes }} likes</li>
      </ul>
      <ul class="recipe-dietary">
        <li v-if="recipe.vegetarian">
          <img src="../assets/images/vegetarian.jpg" alt="Vegetarian" class="dietary-icon" />
        </li>
        <li v-if="recipe.vegan">
          <img src="../assets/images/vegan.jpg" alt="Vegan" class="dietary-icon" />
        </li>
        <li>
          <img :src="glutenFreeIcon" alt="Gluten-Free" class="dietary-icon" />
        </li>
      </ul>
      <div class="favorite-container" @mouseover="showFavoriteTooltip" @mouseleave="hideFavoriteTooltip">
        <img :src="favoriteIcon" class="favorite-icon" alt="Favorite Icon" @click="toggleFavorite" />
        <div v-if="showFavoriteFlag" class="tooltip">{{ favoriteRecipeText }}</div>
      </div>
    </div>
  </div>
</template>


<script>
import { mockAddFavorite } from "../services/user.js";
export default {
  data() {
    return {
      visited: true,
      showTooltipFlag: false,
      tooltipText: "",
      showFavoriteFlag: false,
      favorite: false,
      favoriteRecipeText: "Add to favorite"
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  computed: {
    imagePath() {
      // Assuming this.recipe.image contains just the file name, like 'cauliflower-pasta.jpg'
      try {
        const path = require(`@/assets/images/${this.recipe.image}`);
        return path;
      } catch (error) {
        console.error("Error loading image:", error);
        return ''; // Return an empty string or a default image path in case of error
      }
    },
    glutenFreeIcon() {
      return this.recipe.glutenFree 
        ? require('@/assets/images/no gluten.png')
        : require('@/assets/images/gluten.png');
    },
    favoriteIcon() {
      return this.favorite 
        ? require('@/assets/images/saved_to_fav.png')
        : require('@/assets/images/save_to_favorite.png');
    }
  },
  methods: {
    showTooltip(text) {
      this.tooltipText = text;
      this.showTooltipFlag = true;
    },
    hideTooltip() {
      this.showTooltipFlag = false;
    },
    showFavoriteTooltip() {
      this.favoriteRecipeText = this.favorite ? "Already saved to favorite" : "Add to favorite";
      this.showFavoriteFlag = true;
    },
    hideFavoriteTooltip() {
      this.showFavoriteFlag = false;
    },
    toggleFavorite() {
    console.log("Toggling favorite for recipe ID:", this.recipe.id);
    const response = mockAddFavorite(this.recipe.id);
    console.log("Response from mockAddFavorite:", response);
    if (response.status === 200) {
      this.favorite = !this.favorite;
      console.log("Favorite status toggled. New status:", this.favorite);
  } else {
      console.error("Failed to toggle favorite status");
  }
}

  }
};
</script>

<style scoped>
.recipe-preview {
  display: inline-block;
  width: 100%;
  max-width: 300px;
  margin: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
}

.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
}

.recipe-preview .recipe-body .recipe-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.recipe-preview:hover .recipe-body .recipe-image {
  transform: scale(1.1);
}

.recipe-preview .recipe-footer {
  padding: 10px;
  background-color: #f8f8f8;
}

.recipe-preview .recipe-footer .recipe-title {
  font-size: 14pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 5px;
  color: #555;
  transition: color 0.3s ease, font-size 0.3s ease;
}

.recipe-preview .recipe-footer .recipe-title:hover {
  font-size: 15pt;
  color: #042c56;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
  font-size: 10pt;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  list-style: none;
  text-align: center;
}

.recipe-preview .recipe-footer ul.recipe-dietary {
  padding: 0;
  margin: 10px 0 0;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.recipe-preview .recipe-footer ul.recipe-dietary li {
  display: flex;
  justify-content: center;
  align-items: center;
}

.recipe-preview .recipe-footer ul.recipe-dietary .dietary-icon {
  width: 24px;
  height: 24px;
}

.tooltip {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  z-index: 999;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
}

.eye-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 20px;
  cursor: pointer;
}

.favorite-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.favorite-icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
}
</style>
