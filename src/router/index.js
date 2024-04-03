import { createWebHistory, createRouter } from "vue-router";

import Home from "../pages/Home.vue"
import Login from "../pages/Login.vue"
import Register from "../pages/Register.vue"
import authGuard from "../guards/authGuard";
import guestGuard from "../guards/guestGuard";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        beforeEnter: authGuard
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        beforeEnter: guestGuard
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        beforeEnter: guestGuard
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;