<template>
    <div>
      <div v-if="isLoggedIn">
        <h1>Create Recipe</h1>
        <BModalComponent
          title="Create Recipe"
          @ok="handleCreateRecipe"
          ref="createRecipeModal"
        >
          <!-- Recipe creation form goes here -->
          <b-form>
            <!-- Form fields for recipe details -->
            <b-form-group label="Recipe Title">
              <b-form-input v-model="newRecipe.title"></b-form-input>
            </b-form-group>
            <!-- Add more form fields as needed -->
          </b-form>
        </BModalComponent>
        <b-button @click="openCreateRecipeModal">Open Create Recipe Modal</b-button>
      </div>
      <div v-else>
        <p>Please log in to create a new recipe.</p>
        <router-link to="/login">Login</router-link>
      </div>
    </div>
  </template>
  
  <script>
  import BModalComponent from '@/components/BModalComponent.vue'
  
  export default {
    components: {
      BModalComponent
    },
    data() {
      return {
        newRecipe: {
          title: ''
          // Add other recipe properties
        }
      }
    },
    computed: {
      isLoggedIn() {
        // Check if the user is logged in
        // You can use the same approach as in your App.vue or other components
        return this.$root.store.username
      }
    },
    methods: {
      handleCreateRecipe() {
        // Handle form submission and save the new recipe
        this.saveRecipe()
        this.$refs.createRecipeModal.close(); // Close the modal after saving
      },
      saveRecipe() {
        // Implement the logic to save the new recipe
        // You can make an API call or use a mock function for now
        console.log('Saving recipe:', this.newRecipe)
      },
      openCreateRecipeModal() {
        this.$refs.createRecipeModal.open(); // Open the modal programmatically
      }
    }
  }
  </script>
  