<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" class="custom-navbar">
      <b-navbar-brand href="#">Vue Recipes</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <router-link
            tag="b-nav-item"
            :to="{ name: 'main' }"
            active-class="active-link"
            exact-active-class="exact-active-link"
            @click.native="handleNavItemClick"
          >
            Home
          </router-link>
          <router-link
            tag="b-nav-item"
            :to="{ name: 'search' }"
            active-class="active-link"
            exact-active-class="exact-active-link"
            @click.native="handleNavItemClick"
          >
            Search
          </router-link>
          <router-link
            v-if="$root.store.username"
            tag="b-nav-item"
            :to="{ name: 'create-recipe' }"
            active-class="active-link"
            exact-active-class="exact-active-link"
            @click.native="handleNavItemClick"
          >
            Create Recipe
          </router-link>
          <router-link
            tag="b-nav-item"
            :to="{ name: 'about' }"
            active-class="active-link"
            exact-active-class="exact-active-link"
            @click.native="handleNavItemClick"
          >
            About
          </router-link>
          <!-- Dropdown menu -->
          <b-nav-item-dropdown right v-if="$root.store.username">
            <template #button-content>
              <em>Recipes</em>
            </template>
            <b-dropdown-item @click="goToFavorites">Favorites</b-dropdown-item>
            <b-dropdown-item @click="goToMyRecipes">My Recipes</b-dropdown-item>
            <b-dropdown-item @click="goToFamilyRecipes">Family Recipes</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto d-flex align-items-center">
          <template v-if="!$root.store.username">
            <span class="mr-2 guest-text">Guest:</span>
            <router-link
              tag="b-nav-item"
              :to="{ name: 'register' }"
              active-class="active-link"
              exact-active-class="exact-active-link"
              @click.native="handleNavItemClick"
            >
              Register
            </router-link>
            <router-link
              tag="b-nav-item"
              class="ml-2"
              :to="{ name: 'login' }"
              active-class="active-link"
              exact-active-class="exact-active-link"
              @click.native="handleNavItemClick"
            >
              Login
            </router-link>
          </template>
          <template v-else>
            <b-nav-item-dropdown right>
              <template #button-content>
                <em>{{ $root.store.username }}</em>
              </template>
              <b-dropdown-item @click="logout">Logout</b-dropdown-item>
            </b-nav-item-dropdown>
          </template>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    handleNavItemClick() {
      console.log("Nav item clicked");
    },
    logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
    goToFavorites() {
      this.$router.push({ name: 'MyFavorite' });
    },
    goToMyRecipes() {
      this.$router.push({ name: 'MyRecipes' });
    },
    goToFamilyRecipes() {
      // Define your navigation logic for Family Recipes
      this.$router.push({ name: 'family_recipe' });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

.custom-navbar {
  background-color: #664f23; 
  // background-color: #664f23; 
  //background-color: #5d8754;
  font-size: 1.1rem; /* Slightly bigger font size */
}

.custom-navbar .navbar-brand,
.custom-navbar .nav-link {
  color: #ffffff !important; /* Ensure text is white for contrast */
}

.custom-navbar .nav-link {
  transition: color 0.3s; /* Smooth transition for color change */
}

.custom-navbar .nav-link:hover,
.custom-navbar .nav-link:active {
  color: #c0a707 !important; /* Change text color to teal on hover and active */
}

.custom-navbar .nav-link.active-link {
  background-color: #3949ab; /* Feedback color on click */
  color: #ffffff !important; /* Ensure text is white for contrast */
}

.custom-navbar .nav-link.exact-active-link {
  border-bottom: 2px solid #ffffff; /* Indicate active page */
}

.custom-navbar .guest-text {
  color: #ffffff; /* Make the "Guest" text white */
}
</style>