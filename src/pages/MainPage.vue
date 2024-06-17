<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <div class="content-wrapper">
      <div class="left-column">
        <RecipePreviewList ref="randomRecipes" :random="true" class="random-recipes" />
        <b-button class="refresh-button" @click="refreshRandomRecipes">Refresh Random Recipes</b-button>
      </div>
      <div class="right-column">
        <RecipePreviewList
          v-if="$root.store.username"
          :random="false"
        />
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
}

.title {
  text-align: center;
  margin: 20px 0;
}

.content-wrapper {
  display: flex;
}

.left-column {
  flex: 1;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center align the content horizontally */
}

.right-column {
  flex: 1;
  display: flex;
  justify-content: center; /* Center align the content horizontally */
}

.random-recipes {
  margin: 10px 0;
}

.refresh-button {
  margin-top: 20px;
  display: block;
}
</style>
