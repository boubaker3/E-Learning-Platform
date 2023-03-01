import { createStore } from 'vuex'
import api from '../axios'

 
const store=createStore({
    state:{ 
            user:{
                 
            },
            token:"",
       
           isAuthenticated:false,
           showLogin:false,
           showSignup:false
    },
    getters:{

    },
    actions:{
       async signup ({ commit },  credentials) {
            return await api.post('/signup', credentials ,{
                headers:{
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':"*"
                }
            })
              .then(response => {
                
                return Promise.resolve(response)
              })
              .catch(error => {
                return Promise.reject(error)
              })
          },
          async login ({ commit },  credentials) {
            return await api.post('/login', credentials ,{
                headers:{
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':"*"
                }
            })
              .then(response => {
                
                return Promise.resolve(response)
              })
              .catch(error => {
                return Promise.reject(error)
              })
          }
    },
    mutations:{
        setToken(state, token  ) {
            state.token = token
        },
        setUser(state,user){
            state.user=JSON.parse(user)
         },
        authenticate(){
            this.state.isAuthenticated=true
        },
        logout(){
           localStorage.clear()
        },
      setLogin(state){
        state.showLogin=!state.showLogin
        state.showSignup=state.showSignup&&false
      },
      setSignup(state){
        state.showSignup=!state.showSignup
        state.showLogin=state.showLogin&&false

      }
    },
    modules:{}
})
export default store;