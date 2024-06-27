import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import ("./views/Home.vue"),
        },
        {
            path: "/register",
            name: "register",
            component: () => import("./views/Register.vue"),
          },
    ],
});

export default router;