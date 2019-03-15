import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import store from "./store";

Vue.use(Router);

let entryUrl = null;

const authGuard = (to, from, next) => {
  if (store.getters.getUsername === "") {
    entryUrl = to.path;
    return next("/login");
  } else {
    if (entryUrl) {
      const url = entryUrl;
      entryUrl = null;
      return next(url);
    } else {
      return next();
    }
  }
};

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      beforeEnter: authGuard
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    }
  ]
});
