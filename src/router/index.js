import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../components/LoginPage.vue'
import RegisterPage from '../components/RegisterPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import NotFoundPage from '../components/NotFoundPage.vue'
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
    path: "/:catchAll(.*)",
    name: 'NotFoundPage',
    component: NotFoundPage

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  // if (to.params.pageTitle !== "undefined") {
  //   document.title = `${to.name} | ${to.params.pageTitle}  | ${process.env.Title_app}`


  // }

  if (to.name == null) {
    document.title = "Unknown page"
  }
  else {
    document.title = to.name
  }


  next();


})

export default router
