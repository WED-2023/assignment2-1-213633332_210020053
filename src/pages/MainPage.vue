<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <div class="content-wrapper">
      <div class="left-column">
        <RecipePreviewList title="find your taste" class="RandomRecipes" />
        <router-link v-if="!$root.store.username" to="/login" tag="button">
          You need to Login to view this
        </router-link>
        <RecipePreviewList
          title="Last Viewed Recipes"
          :class="{
            RandomRecipes: true,
            blur: !$root.store.username,
          }"
          disabled
        ></RecipePreviewList>
      </div>
      <div class="right-column">
        <!-- Placeholder for future content -->
            <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div>-->
      </div>
    </div>
  </div>
</template>


<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList
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
}

.right-column {
  flex: 1;
  /* Placeholder for future content, you can add styles here later */
}

.RandomRecipes {
  margin: 10px 0;
}

.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}

::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
