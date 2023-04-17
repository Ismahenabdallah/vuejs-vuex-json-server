import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../components/LoginPage.vue'
import RegisterPage from '../components/RegisterPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
//import NotFoundPage from '../components/NotFoundPage.vue'
import DeleteRestaurent from "../Restaurent/DeleteRestaurent";
import UpdateRestaurent from "../Restaurent/UpdateRestaurent";
import MenuPage from '@/Restaurent/menu/MenuPage';
import AddNewCategories from "@/Restaurent/menu/AddNewCategories";
const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/home',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage
  },
  {
    path: '/profile',
    name: 'ProfilePage',
    component: ProfilePage
  },

  {
    path: "/delete/:RestaurentId ",
    name: 'DeleteRestaurent',
    component: DeleteRestaurent

  },
  {
    path: "/update/:RestaurentId ",
    name: 'UpdateRestaurent',
    component: UpdateRestaurent

  },
  {
    path: "/menu/:RestaurentId ",
    name: 'MenuPage',
    component: MenuPage

  },
  {
    path: "/addcategories/restaurentId/:RestaurentId ",
    name: 'AddNewCategories',
    component: AddNewCategories

  },
  {
    path: '/:catchAll(.*)*',
    name: 'HomePage',
    component: HomePage

  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.params.pageTitle !== "undefined") {
    document.title = `${to.name} | ${to.params.pageTitle}  | ${process.env.Title_app}`


  }

  if (to.name == null) {
    document.title = "Unknown page"
  }
  else {
    document.title = to.name
  }


  next();


})

export default router
