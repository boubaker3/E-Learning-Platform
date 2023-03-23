<template>
  <div class="flex  items-center justify-center  ">
    <div class="text-center">
      <h1 class="text-lg text-texts font-bold">You are not logged in for more access.</h1>
      <h1 class="text-lg text-texts font-bold">Please login or create a new account if you don't have one.</h1>
    </div>
  </div>
  </template>
  
  <script>
  import store from "../store"
  import route from "../router"

  export default {
    name:"notAuth", 
    data() {
      return {
      }
    } ,
    mounted(){
      console.log(store.state.isAuthenticated)
      if(store.state.isAuthenticated){
        route.push('/')
      }
    }
     
  };
  </script>
  
  <style>
   
  </style>
  