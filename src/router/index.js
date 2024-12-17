import { createRouter, createWebHistory } from 'vue-router'
import Index from "../Pages/Index.vue";
import Auth from "../Pages/Auth.vue";
import Login from "../components/Auth/Login.vue";
import Register from "../components/Auth/Register.vue";
import Feed from "../Pages/Feed.vue";

const routes = [
    { path: '/', name: 'index', component: Index },
    { path: '/auth',
      component: Auth,
      children: [
          {
              path: "",
              name: "Login",
              component: Login
          },
          {
              path: "register",
              name: "Register",
              component: Register
          }
      ]
    },
    { path: '/feed', name: 'feed', component: Feed },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0)
    next()
})

export default router;
