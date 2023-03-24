import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import "./index.css";
import route from "./router";

import "@fortawesome/fontawesome-free/css/all.css";
import api from "./axios";
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
if (token && user) {
  store.commit("setToken", token);
  store.commit("setUser", user);
  store.commit("authenticate");
}

route.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.state.isAuthenticated == false) {
      // If the user is not authenticated, redirect them to the login page
      route.push("/notLogged");
    } else {
      // If the user is authenticated, allow them to access the route
      next();
    }
  } else {
    // If the route does not require authentication, allow access
    next();
  }
});
if (user) {
  const parsedUser = JSON.parse(user);
  api
    .get(`userdata?userid=${parsedUser.userid}`)
    .then((response) => {
      if (response.data.status == "Token is Expired") {
        localStorage.clear();
        window.location.reload();
      }
    })
    .catch((error) => {});
}

createApp(App).use(store).use(route).mount("#app");
