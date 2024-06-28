import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/Home.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("./views/Register.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      meta: {
        requiresAuth: true,
      },
      component: () => import("./views/user/UserHome.vue"),
      children: [
        {
          path: "",
          name: "userdefault",
          component: () => import("./views/user/UserHome.vue")
        },
      ],
    }
  ],
});

export default router;
