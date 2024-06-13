<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <b-form @submit.prevent="performSearch">

      <!-- Filter section toggle -->
      <div class="filter-toggle">
        <b-button @click="toggleFilters" variant="link" class="toggle-button">
          {{ filtersVisible ? 'Hide Filters' : 'Show Filters' }}
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
        </div>
      </b-collapse>

      <!-- Recipe Name search -->
      <b-form-group label="Recipe Name">
        <b-form-input v-model="searchQuery" placeholder="Enter recipe name"></b-form-input>
      </b-form-group>
      
      <!-- Results per page selector -->
      <b-form-group label="Results per page">
        <b-form-select v-model="resultsPerPage" :options="resultsPerPageOptions"></b-form-select>
      </b-form-group>

      <!-- Search button -->
      <b-button type="submit" variant="primary">Search</b-button>
    </b-form>

    <!-- Display filters as badges -->
    <div class="filters-badges">
      <b-badge v-if="selectedCuisine" pill variant="primary">{{ selectedCuisine }}</b-badge>
      <b-badge v-if="selectedDiet" pill variant="info">{{ selectedDiet }}</b-badge>
      <b-badge v-if="selectedIntolerance" pill variant="danger">{{ selectedIntolerance }}</b-badge>
    </div>

    <!-- Display search results -->
    <div v-if="results.length">
      <b-button-group class="mb-3">
        <b-button @click="sortResults('time')">Sort by Time</b-button>
        <b-button @click="sortResults('popularity')">Sort by Popularity</b-button>
      </b-button-group>
      <div v-for="recipe in paginatedResults" :key="recipe.id" class="recipe-result">
        <img :src="recipe.image" @click="viewRecipe(recipe.id)" />
        <div>
          <h3>{{ recipe.title }}</h3>
          <p>Preparation time: {{ recipe.readyInMinutes }} minutes</p>
          <p>Popularity: {{ recipe.aggregateLikes }}</p>
          <p v-html="recipe.summary"></p>
        </div>
      </div>
      <b-pagination
        v-model="currentPage"
        :total-rows="results.length"
        :per-page="resultsPerPage"
        class="my-0"
      ></b-pagination>
    </div>

    <!-- Display message when no results found -->
    <div v-else-if="searched">
      <p>No results found.</p>
    </div>
  </div>
</template>

<script>
import cuisines from '../assets/cuisines.js';
import diets from '../assets/diets.js';
import intolerances from '../assets/intolerances.js';
import { mockGetRecipesPreview } from '../services/recipes'; // Import mock function

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
  computed: {
    paginatedResults() {
      const start = (this.currentPage - 1) * this.resultsPerPage;
      const end = start + this.resultsPerPage;
      return this.results.slice(start, end);
    }
  },
  methods: {
    async performSearch() {
      // Get the amount to fetch based on resultsPerPage
      const amountToFetch = this.resultsPerPage;

      // Fetch recipes using mock function
      const response = mockGetRecipesPreview(amountToFetch);

      // Assuming response.data.recipes contains an array of recipe objects
      this.results = response.data.recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );

      // Save the search in session storage
      sessionStorage.setItem('lastSearch', JSON.stringify({
        searchQuery: this.searchQuery,
        selectedCuisine: this.selectedCuisine,
        selectedDiet: this.selectedDiet,
        selectedIntolerance: this.selectedIntolerance,
        resultsPerPage: this.resultsPerPage
      }));

      this.searched = true;
      this.currentPage = 1; // Reset to first page on new search
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
.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.filter-toggle {
  margin-bottom: 10px;
}

.filters-badges {
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
}

.recipe-result {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.recipe-result img {
  cursor: pointer;
  margin-right: 20px;
  width: 150px;
  height: 150px;
}

.recipe-result h3 {
  margin: 0;
}

.recipe-result p {
  margin: 5px 0;
}
</style>
