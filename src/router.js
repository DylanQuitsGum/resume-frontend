import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";

const AddEmployer = () => import("./components/AddEmployer.vue");
const EditEmployer = () => import("./components/EditEmployer.vue");

const AddEducation = () => import("./components/AddEducation.vue");
const EditEducation = () => import("./components/EditEducation.vue");

const AddAward = () => import("./components/AddAward.vue");
const EditAward = () => import("./components/EditAward.vue");

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
    path: "/addEmployer",
    name: "addemployer",
    meta: { requiresAuth: true },
    component: AddEmployer,
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
    path: "/editEmployer/:id",
    name: "editEmployer",
    meta: { requiresAuth: true },
    component: EditEmployer,
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
  {
    path: "/editEducation/:id",
    name: "editEducation",
    meta: { requiresAuth: true },
    component: EditEducation,
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
    path: "/addAward",
    name: "addaward",
    meta: { requiresAuth: true },
    component: AddAward,
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
    path: "/editAward/:id",
    name: "editAward",
    meta: { requiresAuth: true },
    component: EditAward,
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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;
