<template>
  <div class="container">
    <h1 class="title">Welcome</h1>
    <div class="divider"></div>
    <div class="content-wrapper">
      <div class="column">
        <RecipePreviewList ref="randomRecipes" :random="true" class="random-recipes" />
        <b-button class="refresh-button" @click="refreshRandomRecipes">Refresh Random Recipes</b-button>
      </div>
      <div class="column">
        <RecipePreviewList v-if="$root.store.username" :random="false" />
        <LoginPage v-else />
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import LoginPage from "../pages/LoginPage.vue";

export default {
  components: {
    RecipePreviewList,
    LoginPage
  },
  methods: {
    refreshRandomRecipes() {
      this.$refs.randomRecipes.updateRecipes();
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  padding-bottom: 20px; /* Add padding to the bottom of the container */
}

.title {
  text-align: center;
  margin: 20px 0;
}

.divider {
  border-bottom: 4px solid #7e8186; /* Orange-brown color */
  margin: 10px 0 20px;
}

.content-wrapper {
  display: flex;
  gap: 40px; /* Add gap between columns */
  justify-content: space-between; /* Ensure columns are evenly spaced */
}

.column {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center align the content horizontally */
}

.refresh-button {
  margin-top: 15px;
  display: block;
  align-self: center; /* Center the refresh button in the left column */
}
</style>
