<template>
    <div id="app">
      <Header />
    <div class="md:ml-72">
      <router-view/>
      <div v-if="showLogin" class="w-full p-4  flex justify-center items-center ">
      <Login />
      </div>
      <div v-if="showSignup" class="w-full  p-4  flex justify-center items-center ">
      <Signup />
      </div>

    </div>
    </div>
  </template>
  
  <script>
import Header from './components/header.vue';
import Login from './views/Login.vue';
import Signup from './views/Signup.vue';
import ShareCourse from './views/ShareCourse.vue';
import store from './store';


  export default {
    name: 'App',
    data(){
      return{
     
      }
    },
    components:{
      Header,
      Login,
      Signup,
      ShareCourse
    },
    computed:{
      showLogin(){
        return store.state.showLogin
      },
      showSignup(){
        return store.state.showSignup
      }
    }
  
  }
  </script>
  
<style>
#app{
  overflow-x: hidden;
}
h1{
  font-family: 'Montserrat', sans-serif;
}
li:hover{
  transition: all ease-in-out 0.5s;
  opacity: 0.8;
}
button:hover{
  transition: all ease-in-out 1.5s;
  opacity: 0.8;
}

</style>
  