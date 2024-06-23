<template>
  <div class="create-recipe-container">
    <div v-if="isLoggedIn" class="create-recipe-content">
      <h1 class="title">Create Recipe</h1>
      <b-button @click="openCreateRecipeModal" variant="primary" class="open-modal-btn">Open Create Recipe Modal</b-button>
      <BModalComponent
        title="Create Recipe"
        @ok="handleCreateRecipe"
        ref="createRecipeModal"
        class="modal-styled"
      >
        <b-form @submit.prevent="handleCreateRecipe">
          <b-form-group label="Recipe Title" label-for="recipe-title">
            <b-form-input id="recipe-title" v-model="newRecipe.title" required></b-form-input>
          </b-form-group>
          <b-form-group label="Recipe Image" label-for="recipe-image">
            <b-form-input id="recipe-image" v-model="newRecipe.image" required></b-form-input>
          </b-form-group>
          <b-form-group label="Recipe Summary" label-for="recipe-summary">
            <b-form-input id="recipe-summary" v-model="newRecipe.summary" required></b-form-input>
          </b-form-group>
          
          <b-form-group label-for="recipe-ingredients">
            <div>
              <div class="ingredients-header">
                <h5>Insert Recipe Ingredients</h5>
                <div class="buttons">
                  <b-button variant="success" @click="addIngredient" class="add-btn">+</b-button>
                  <b-button variant="danger" @click="removeIngredient" :disabled="newRecipe.extendedIngredients.length === 1" class="remove-btn">-</b-button>
                </div>
              </div>
              <div v-for="(ingredient, index) in newRecipe.extendedIngredients" :key="index" class="ingredient-row">
                <b-form-input v-model="newRecipe.extendedIngredients[index]" required :placeholder="`Ingredient #${index + 1}`"></b-form-input>
              </div>
            </div>
          </b-form-group>

          <b-form-group label="Recipe Instructions" label-for="recipe-instructions">
            <b-form-input id="recipe-instructions" v-model="newRecipe.instructions" required></b-form-input>
          </b-form-group>
          <b-form-group label="Recipe Servings" label-for="recipe-servings">
            <b-form-input id="recipe-servings" v-model="newRecipe.servings" type="number" required></b-form-input>
          </b-form-group>
          <b-form-group label="Recipe Ready Time (in minutes)" label-for="recipe-ready-time">
            <b-form-input id="recipe-ready-time" v-model="newRecipe.readyInMinutes" type="number" required></b-form-input>
          </b-form-group>
          
            <b-form-group label="Vegetarian" class="d-inline-block mr-3">
              <b-form-select v-model="newRecipe.vegetarian" :options="yesNoOptions"></b-form-select>
            </b-form-group>
            <b-form-group label="Vegan" class="d-inline-block mr-3">
              <b-form-select v-model="newRecipe.vegan" :options="yesNoOptions"></b-form-select>
            </b-form-group>
            <b-form-group label="Gluten-Free" class="d-inline-block">
              <b-form-select v-model="newRecipe.glutenFree" :options="yesNoOptions"></b-form-select>
            </b-form-group>
          
          <!--  <b-button type="submit" variant="primary" class="submit-btn">Save</b-button>  -->
        </b-form>
        
      </BModalComponent>
    </div>
    <div v-else class="login-prompt">
      <p>Please log in to create a new recipe.</p>
      <router-link to="/login">Login</router-link>
    </div>
  </div>
</template>

<script>
import BModalComponent from '@/components/BModalComponent.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { Toast, TOAST_EVENTS } from 'bootstrap-vue';

export default {
  components: {
    BModalComponent,
  },
  data() {
    return {
      newRecipe: {
        title: '',
        image: '',
        summary: '',
        extendedIngredients: [''], // Initialize as an empty array
        instructions: '',
        servings: null,
        readyInMinutes: null,
        vegetarian: 'No',
        vegan: 'No',
        glutenFree: 'No',
      },
      yesNoOptions: [
        { value: 'No', text: 'No' },
        { value: 'Yes', text: 'Yes' },
      ],
    };
  },
  computed: {
    isLoggedIn() {
      // Check if the user is logged in
      return true; // Change this to your actual login check
    },
  },
  methods: {
    addIngredient() {
      this.newRecipe.extendedIngredients.push('');
    },
    removeIngredient() {
      if (this.newRecipe.extendedIngredients.length > 1) {
        this.newRecipe.extendedIngredients.pop();
      }
    },
    handleCreateRecipe() {
      // Handle form submission and save the new recipe
      this.saveRecipe();
      this.$refs.createRecipeModal.close(); // Close the modal after saving
    },
    saveRecipe() {
      // Implement the logic to save the new recipe to the database or mock data store
      console.log('Saving recipe:', this.newRecipe);
      // Make an API call or use a mock function to save the recipe

      // After saving, add the new recipe to the user's "My Recipes" list
      // this.$root.store.myRecipes.push(this.newRecipe)

      // Show a toast notification
      this.showToast('Recipe created successfully!', 'success');
      // Reset the form after saving
      this.resetForm();
    },
    openCreateRecipeModal() {
      this.$refs.createRecipeModal.open(); // Open the modal programmatically
    },
    showToast(message, variant) {
      this.$root.$bvToast.toast(message, {
        title: 'Recipe Creation',
        variant: variant,
        solid: true,
        autoHideDelay: 3000, // Adjust the auto-hide delay as needed
      });
    },
    resetForm() {
      this.newRecipe = {
        title: '',
        image: '',
        summary: '',
        extendedIngredients: [''],
        instructions: '',
        servings: null,
        readyInMinutes: null,
        vegetarian: 'No',
        vegan: 'No',
        glutenFree: 'No',
      };
    },
  },
};
</script>


<style scoped>
.create-recipe-container {
  padding: 40px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
}

.create-recipe-content {
  max-width: 700px;
  margin: 0 auto;
}

.title {
  font-size: 2.5em;
  color: #333333;
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
}

.open-modal-btn {
  display: block;
  margin: 20px auto;
  background-color: #235351;
  color: #B0ECEB;
  border: none;
  font-size: 1.2em;
  padding: 10px 20px;
  border-radius: 5px;
}

.modal-styled .modal-content {
  background-color: #f9f9f9;
  color: #333333;
  border-radius: 10px;
  padding: 20px;
}

.submit-btn {
  background-color: #ff6f61;
  color: #fff;
  width: 100%;
  font-size: 1.2em;
  padding: 10px 0;
  border-radius: 5px;
  border: none;
}

.login-prompt {
  text-align: center;
  font-size: 1.5em;
  color: #ff6f61;
}

.login-prompt p {
  color: #333333;
}

.login-prompt a {
  color: #ff6f61;
  text-decoration: none;
}

.login-prompt a:hover {
  text-decoration: underline;
}

.ingredients-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.add-btn, .remove-btn {
  font-size: 1.5em;
  padding: 0 10px;
  border-radius: 50%;
}

.ingredient-row {
  margin-bottom: 10px;
}
</style>
