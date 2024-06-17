<template>
  <div class="create-recipe-container">
    <div v-if="isLoggedIn" class="create-recipe-content">
      <h1 class="title">Create Recipe</h1>
      <b-button @click="openCreateRecipeModal" variant="dark-brown" class="open-modal-btn">Open Create Recipe Modal</b-button>
      <BModalComponent
        title="Create Recipe"
        @ok="handleCreateRecipe"
        ref="createRecipeModal"
        class="modal-brown"
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
          <b-form-group label="Recipe Ingredients" label-for="recipe-ingredients">
            <b-form-input id="recipe-ingredients" v-model="newRecipe.extendedIngredients" required></b-form-input>
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
          <b-form-checkbox v-model="newRecipe.vegetarian" name="recipe-vegetarian">
            Vegetarian
          </b-form-checkbox>
          <b-form-checkbox v-model="newRecipe.vegan" name="recipe-vegan">
            Vegan
          </b-form-checkbox>
          <b-form-checkbox v-model="newRecipe.glutenFree" name="recipe-gluten-free">
            Gluten-Free
          </b-form-checkbox>
          <b-button type="submit" variant="primary" class="submit-btn">Save</b-button>
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
        extendedIngredients: '',
        instructions: '',
        servings: null,
        readyInMinutes: null,
        vegetarian: false,
        vegan: false,
        glutenFree: false,
      },
    };
  },
  computed: {
    isLoggedIn() {
      // Check if the user is logged in
      return true; // Change this to your actual login check
    },
  },
  methods: {
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
        extendedIngredients: '',
        instructions: '',
        servings: null,
        readyInMinutes: null,
        vegetarian: false,
        vegan: false,
        glutenFree: false,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.create-recipe-container {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.create-recipe-content {
  max-width: 600px;
  margin: 0 auto;
}

.title {
  font-size: 2em;
  color: #654321;
  margin-bottom: 20px;
  text-align: center;
}

.open-modal-btn {
  display: block;
  margin: 20px auto;
  background-color: #654321;
  color: #fff;
  border: none;
}

.modal-brown .modal-content {
  background-color: #d2b48c;
  color: #654321;
}

.submit-btn {
  background-color: #654321;
  color: #fff;
  width: 100%;
}

.login-prompt {
  text-align: center;
  font-size: 1.2em;
}

.login-prompt p {
  color: #654321;
}

.login-prompt a {
  color: #007bff;
  text-decoration: none;
}

.login-prompt a:hover {
  text-decoration: underline;
}
</style>