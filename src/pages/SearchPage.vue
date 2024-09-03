<template>
  <div class="search-page">
    <div class="container">
      <!-- Header -->
      <div class="header">
        <h1>Search for Recipes</h1>
        <p>Discover culinary secrets!</p>
      </div>

      <!-- Search form -->
      <b-form @submit.prevent="performSearch" class="search-form">

        <!-- Filter section toggle -->
        <div class="filter-toggle">
          <b-button @click="toggleFilters" variant="link" class="toggle-button">
            {{ filtersVisible ? 'Hide Advanced Search' : 'Show Advanced Search' }}
          </b-button>
        </div>

        <!-- Filters section -->
        <b-collapse v-model="filtersVisible">
          <div class="filters">
            <!-- Cuisine filter -->
            <b-form-group label="Cuisine">
              <b-form-select v-model="selectedCuisine" :options="cuisineOptions"></b-form-select>
            </b-form-group>
            <!-- Diet filter -->
            <b-form-group label="Diet">
              <b-form-select v-model="selectedDiet" :options="dietOptions"></b-form-select>
            </b-form-group>
            <!-- Intolerance filter -->
            <b-form-group label="Intolerance">
              <b-form-select v-model="selectedIntolerance" :options="intoleranceOptions"></b-form-select>
            </b-form-group>
            <!-- Results per page selector -->
            <b-form-group label="Results per page">
              <b-form-select v-model="resultsPerPage" :options="resultsPerPageOptions"></b-form-select>
            </b-form-group>
          </div>
        </b-collapse>



        <!-- Recipe Name search -->
        <b-form-group label="Recipe Name">
          <b-form-input v-model="searchQuery" placeholder="Enter recipe name"></b-form-input>
        </b-form-group>

        <!-- Search button -->
        <div class="search-button-container">
          <b-button type="submit" variant="primary" class="search-button">Search</b-button>
        </div>
      </b-form>


      <!-- Display search results -->
      <div v-if="results.length" class="results-section">
        <div class="sort-buttons-container">
          <b-button-group class="sort-buttons mb-3">
            <b-button @click="sortResults('time')" style="background-color: #48babc; color: #333; margin-right: 10px;">Sort by Preparation Time</b-button>
            <b-button @click="sortResults('popularity')" style="background-color: #48babc; color: #333;">Sort by Popularity</b-button>
          </b-button-group>
        </div>
        <div class="recipe-preview-container">
          <RecipePreview v-for="recipe in paginatedResults" :key="recipe.id" :recipe="recipe" />
        </div>
        <b-pagination
          v-model="currentPage"
          :total-rows="results.length"
          :per-page="resultsPerPage"
          class="my-0"
        ></b-pagination>
      </div>

      <!-- Display message when no results found -->
      <div v-else-if="searched" class="no-results">
        <p>No results found.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // Import axios
import cuisines from '../assets/cuisines.js';
import diets from '../assets/diets.js';
import intolerances from '../assets/intolerances.js';
import { mockGetRecipesPreview } from '../services/recipes'; // Import mock function
import RecipePreview from '../components/RecipePreview.vue';

export default {
  data() {
    return {
      searchQuery: '',
      selectedCuisine: '',
      selectedDiet: '',
      selectedIntolerance: '',
      resultsPerPage: 5,
      results: [],
      searched: false,
      currentPage: 1,
      cuisineOptions: [{ value: null, text: 'No filter' }],
      dietOptions: [{ value: null, text: 'No filter' }],
      intoleranceOptions: [{ value: null, text: 'No filter' }],
      resultsPerPageOptions: [
        { value: 5, text: '5' },
        { value: 10, text: '10' },
        { value: 15, text: '15' }
      ],
      filtersVisible: true // Initially show filters
    };
  },
  components: {
    RecipePreview
  },
  computed: {
    paginatedResults() {
      const start = (this.currentPage - 1) * this.resultsPerPage;
      const end = start + this.resultsPerPage;
      return this.results.slice(start, end);
    }
  },
  methods: {
    async performSearch() {
     try {
       const params = {
         recipeName: this.searchQuery,
         cuisine: this.selectedCuisine,
         diet: this.selectedDiet,
         intolerance: this.selectedIntolerance,
         number: this.resultsPerPage
       }; 

       // Make the request to the backend
       const host = process.env.VITE_HOST
       const port = process.env.VITE_PORT

       //const response = await axios.get(`http://${host}:${port}/recipes/search`, { params });
       const response = await axios.get(`https://localhost:3000/recipes/search`, { params });

       console.log(response.data);

       // Assuming response.data contains an array of recipe objects
       this.results = response.data;

        // Save the search in session storage
        sessionStorage.setItem('lastSearch', JSON.stringify(params));

        this.searched = true;
        this.currentPage = 1; // Reset to first page on new search
      } catch (error) {
        console.error("Error during search:", error);
      }
    },
    viewRecipe(id) {
      this.$router.push({ name: 'recipe', params: { id } });
    },
    sortResults(criteria) {
      if (criteria === 'time') {
        this.results.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
      } else if (criteria === 'popularity') {
        this.results.sort((a, b) => b.aggregateLikes - a.aggregateLikes);
      }
    },
    toggleFilters() {
      this.filtersVisible = !this.filtersVisible;
    }
  },
  mounted() {
    // Load options for the dropdowns
    this.cuisineOptions.push(...cuisines.map(c => ({ value: c, text: c })));
    this.dietOptions.push(...diets.map(d => ({ value: d, text: d })));
    this.intoleranceOptions.push(...intolerances.map(i => ({ value: i, text: i })));

    // Load the last search from session storage
    const lastSearch = JSON.parse(sessionStorage.getItem('lastSearch'));
    if (lastSearch) {
      this.searchQuery = lastSearch.searchQuery;
      this.selectedCuisine = lastSearch.selectedCuisine;
      this.selectedDiet = lastSearch.selectedDiet;
      this.selectedIntolerance = lastSearch.selectedIntolerance;
      this.resultsPerPage = lastSearch.resultsPerPage;
      this.performSearch();
    }
  },
};
</script>

<style scoped>
.search-page {
  background-color: #235351; /* Color 2 */
  color: black;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: 40px auto 0 auto; /* Add top margin here */
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.header h1 {
  font-size: 2rem;
  margin: 0;
  color: #609C98; /* Color 3 */
}

.header p {
  font-size: 1rem;
  margin: 10px 0;
  color: black;
}

.search-form {
  margin-bottom: 20px;
  background-color: #609C98; /* Color 3 */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.filter-toggle {
  text-align: left;
  margin-bottom: 10px;
}

.toggle-button {
  color: #235351; /* Color 2 */
  border-radius: 8px;
  border-color: #235351;
  border-width: 2px; /* Increase the border width */
  border-style: solid; /* Ensure the border is solid */
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 15px;
}

.results-section {
  margin-top: 20px;
}

.recipe-preview-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  background-color: #609C98; /* Color 3 */
  border-radius: 8px;
}

.search-button-container {
  display: flex;
  justify-content: center;
}

.sort-buttons-container {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.search-button {
  background-color: #235351; /* Color 2 */
  color: black;
  border: none;
  font-family: 'Comic Neue', cursive;
}

.search-button:hover {
  background-color: #235351; /* Color 2 */
  color: black;
}

.sort-buttons .b-button {
  background-color: #235351; /* Color 2 */
  color: black;
  margin-right: 10px;
}

.sort-buttons .b-button:last-child {
  margin-right: 0;
}

.no-results {
  text-align: center;
  font-size: 1.25rem;
  color: black;
}
</style>
