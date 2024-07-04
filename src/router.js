import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";

const AddEducation = () => import("./components/AddEducation.vue");
const Profile = () => import("./components/Profile.vue");
const BoardAdmin = () => import("./components/BoardAdmin.vue");
const BoardUser = () => import("./components/BoardUser.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    beforeEnter: (to, from, next) => {
      const user = JSON.parse(localStorage.getItem("user"));
      if(user){
        next(
          {
            name: "user"
          }
        );
      }
      next();
    }
  },
  {
    path: "/home",
    component: Home,
    beforeEnter: (to, from, next) => {
      const user = JSON.parse(localStorage.getItem("user"));
      if(user){
        next(
          {
            name: "user"
          }
        );
      }
      next();
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/profile",
    name: "profile",
    meta: { requiresAuth: true },
    component: Profile,
    beforeEnter: (to, from, next) => {
      const user = JSON.parse(localStorage.getItem("user"));
      if(!user){
        next(
          {
            name: "login"
          }
        );
      }
      next();
    }
  },
  {
    path: "/admin",
    name: "admin",
    meta: { requiresAdmin: true },
    component: BoardAdmin,
    beforeEnter: (to, from, next) => {
      const user = JSON.parse(localStorage.getItem("user"));
      if(!user){
        next(
          {
            name: "login"
          }
        );
      }
      next();
    }
  },
  {
    path: "/user",
    name: "user",
    meta: { requiresAuth: true },
    component: BoardUser,
    beforeEnter: (to, from, next) => {
      const user = JSON.parse(localStorage.getItem("user"));
      if(!user){
        next(
          {
            name: "login"
          }
        );
      }
      next();
    }
  },
  {
    path: "/addEducation",
    name: "addeducation",
    meta: { requiresAuth: true },
    component: AddEducation,
    beforeEnter: (to, from, next) => {
      const user = JSON.parse(localStorage.getItem("user"));
      if(!user){
        next(
          {
            name: "login"
          }
        );
      }
      next();
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;
