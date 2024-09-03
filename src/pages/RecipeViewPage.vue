<template>
  <div class="recipe-container">
    <div v-if="recipe">
      <div class="recipe-header">
        <h1 class="recipe-title">{{ recipe.title }}</h1>
        <img :src="imagePath" class="recipe-image" alt="Recipe Image" />
      </div>
      <div class="recipe-info-section">
        <div class="recipe-info">
          <div class="info">
            <img src="../assets/images/servings.png" alt="Servings" class="info-icon" />
            {{ recipe.servings }} servings
          </div>
          <div class="info">
            <img src="../assets/images/time.png" alt="Time" class="info-icon" />
            {{ recipe.readyInMinutes }} minutes
          </div>
          <div class="info">
            <img src="../assets/images/like.png" alt="Likes" class="info-icon" />
            {{ recipe.aggregateLikes }} likes
          </div>
        </div>
      </div>
      <div class="recipe-body">
        <div class="ingredients-section">
          <div class="ingredients">
            <h2>Ingredients</h2>
            <ul>
              <li
                v-for="(r, index) in recipe.extendedIngredients"
                :key="index + '_' + r.id"
              >
                {{ r.original }}
              </li>
            </ul>
            <div class="notes">
              <h3>NOTES</h3>
              <div class="dietary-info">
                <div class="info" v-if="recipe.glutenFree">
                  <img src="../assets/images/gluten.png" alt="Gluten-Free" class="dietary-icon" />
                  Gluten-Free
                </div>
                <div class="info" v-if="recipe.vegan">
                  <img src="../assets/images/vegan.jpg" alt="Vegan" class="dietary-icon" />
                  Vegan
                </div>
                <div class="info" v-if="recipe.vegetarian">
                  <img src="../assets/images/vegetarian.jpg" alt="Vegetarian" class="dietary-icon" />
                  Vegetarian
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="instructions-section">
          <div class="instructions">
            <h2>DIRECTIONS</h2>
            <ol>
              <li v-for="s in recipe._instructions" :key="s.number">
                {{ s.step }}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRecipeFullDetails } from "../services/recipes.js";
export default {
  data() {
    return {
      recipe: null
    };
  },
  async created() {
    try {
      let isOriginCreated = false;
      if (typeof this.$route.params.origin === 'undefined') {
        console.log('Parameter is undefined');
      }
      else{
        isOriginCreated = true;
      }
      
      let response = getRecipeFullDetails(this.$route.params.recipeId,isOriginCreated);

      if (response.status !== 200) {
        this.$router.replace("/NotFound");
        return;
      }

      let {
        analyzedInstructions,
        instructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title,
        servings,
        glutenFree,
        vegan,
        vegetarian
      } = response.data.recipe;

      let _instructions = analyzedInstructions
        .map((fstep) => {
          fstep.steps[0].step = fstep.name + fstep.steps[0].step;
          return fstep.steps;
        })
        .reduce((a, b) => [...a, ...b], []);

      let _recipe = {
        instructions,
        _instructions,
        analyzedInstructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title,
        servings,
        glutenFree,
        vegan,
        vegetarian
      };

      this.recipe = _recipe;
    } catch (error) {
      console.log(error);
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
    }
  },
  mounted() {
    window.scrollTo(0, 0);
  }
};
</script>

<style scoped>
.recipe-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: 'Arial, sans-serif';
  background-image: url('../assets/images/background-wood-with-scratches.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
}

.recipe-header {
  text-align: center;
  margin-bottom: 20px;
  width: 100%;
}

.recipe-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.recipe-image {
  width: 80%;
  max-width: 600px;
  height: auto;
  max-height: 400px;
  border-radius: 10px;
  object-fit: cover;
  object-position: center;
  margin-bottom: 20px;
  transition: opacity 0.5s;
}

.recipe-image {
  opacity: 0.9;
}

.recipe-info-section {
  background-color: #d3d3d3; /* Different gray section for info */
  width: 80%;
  max-width: 1200px;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
}

.recipe-info {
  display: flex;
  justify-content: center;
  gap: 50px;
}

.info {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 1.2rem;
}

.info-icon {
  width: 24px;
  height: 24px;
}

.recipe-body {
  display: flex;
  gap: 30px;
  width: 80%;
  max-width: 1200px;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
}

.ingredients-section {
  width: 50%;
  background-color: #f5f5dc; /* Beige background for the ingredients section */
  padding: 20px;
  border-radius: 10px;
}

.instructions-section {
  width: 50%;
  padding: 20px;
  border-radius: 10px;
  background-color: white;
}

h2 {
  font-size: 1.8rem;
  margin-bottom: 15px;
  border-bottom: 2px solid #ddd;
  padding-bottom: 5px;
}

ul, ol {
  margin: 0;
  padding: 0;
  list-style-position: inside;
}

li {
  margin-bottom: 10px;
}

.notes {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  border-radius: 5px;
}

.notes h3 {
  margin-top: 0;
  font-size: 1.5rem;
  border-bottom: 2px solid #ddd;
  padding-bottom: 5px;
}

.notes p {
  margin: 0;
  font-size: 1rem;
}

.dietary-info {
  display: flex;
  flex-direction: column; /* Display each dietary info in its own row */
  gap: 10px;
  margin-bottom: 10px;
}

.dietary-icon {
  width: 24px;
  height: 24px;
}
</style>

