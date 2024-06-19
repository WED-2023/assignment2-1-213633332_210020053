import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";
import BModalPage from './pages/BModalPage.vue';
import About from './pages/About'; // Import the About page

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/viewPage",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
  {
    path: "/MyRecipes",
    name: "MyRecipes",
    component: () => import("./pages/MyRecipesPage"),
  },
  {
    path: "/MyFavoriteRecipes",
    name: "MyFavorite",
    component: () => import("./pages/FavoritePage"),
  },
  {
    path: '/create-recipe',
    name: 'create-recipe',
    component: BModalPage
  },
  {
    path: '/about',
    name: 'about',
    component: About
  }
];

export default routes;
