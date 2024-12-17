import { createRouter, createWebHistory } from 'vue-router'
import Index from "../Pages/Index.vue";
import Auth from "../Pages/Auth.vue";
import Login from "../components/Auth/Login.vue";
import Register from "../components/Auth/Register.vue";
import Feed from "../Pages/Feed.vue";

const token = localStorage.getItem("authToken");

const routes = [
    { path: '/', name: 'index', component: Index },
    {
        path: '/auth',
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
    {
        path: '/feed',
        name: 'feed',
        component: Feed,
        meta: { requiresAuth: true } // Ruta que requiere autenticación
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: Index },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0);

    const token = localStorage.getItem("authToken");

    // Si se intenta acceder a login o registro y ya hay un token, redirige al feed
    if (to.path.includes('/auth') && token) {
        next({ name: 'feed' });
    }

    // Si se intenta acceder al feed y no hay token, redirige a login
    else if (to.meta.requiresAuth && !token) {
        next({ name: 'Login' });
    }
    else {
        next();
    }
});

export default router;
