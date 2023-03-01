import { createApp } from 'vue'
 import App from './App.vue'
import store from './store'
import './index.css'
import route from './router'
 
import '@fortawesome/fontawesome-free/css/all.css'
const token=localStorage.getItem("token")
const user=  localStorage.getItem("user") 
 if(token&&user){
    store.commit('setToken',token )
    store.commit('setUser',user )
    store.commit("authenticate")

} 
route.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (store.state.isAuthenticated==false) {
          // If the user is not authenticated, redirect them to the login page
        route.push("/")
      } else {
        // If the user is authenticated, allow them to access the route
        next()
      }
    } else {
      // If the route does not require authentication, allow access
      next()
    }
  })

createApp(App)
.use(store)
.use(route) 
 .mount('#app')
