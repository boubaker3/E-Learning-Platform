<template>
    
  <div class=" shadow-xl rounded px-8 pt-6 pb-8 mb-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ">

<form>
  <h1 class="text-sm md:text-base lg:text-lg xl:text-xl font-bold text-texts">Login to ElEA</h1>
  <p class="block mb-2 text-sm font-medium text-secondary-variant  ">{{errors}}</p>

  <div class="mb-6">
    <label for="email"  class="block mb-2 text-sm font-medium text-texts ">Your email</label>
    <input type="email" v-model="email" id="email" class="  bg-inputs   text-sm rounded-lg    block w-full  p-2.5  " placeholder="name@example.com" required>
  </div>
  <div class="mb-6">
    <label for="password" class="block mb-2 text-sm font-medium text-texts  ">Your password</label>
    <input v-model="password" type="password" id="password" class=" bg-inputs  text-sm rounded-lg block w-full p-2.5  " required>
  </div>
 
  <div class="flex items-start mb-6">
    <div class="flex items-center h-5">
      <input id="terms" type="checkbox" value="" class="w-4 h-4 border  border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primay  " required>
    </div>
    <label for="terms" class="ml-2 text-sm font-medium text-texts">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
  </div>
  <button type="submit" class="text-texts  bg-secondary hover:bg-blue-800  focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  ">Login</button>
  <button @click="showSignup" type="button" class="text-texts bg-transparent hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Register new account</button>
</form>

    </div>
  </template>
  
  <script>
  import store from '../store'
  export default {
    name: 'Login',
    data() {
      return {
        email: '',
        password: '',
        errors:''
      }
    }, 
    methods: {
       login() {
 if (this.email.length==0|| this.password.length==0 ){
  this.errors="all the fields must be filled!"
} else{
  store.dispatch('login',{
        email: this.email,
        password: this.password})
        .then(response=>{
          const token = response.data.token
                const user=response.data.user
                localStorage.setItem("token",token)
                localStorage.setItem("user",JSON.stringify(user))
                this.reloadPage()
        }).catch(error=>{
          console.log(error) 
      
        })
}
        }, 
    reloadPage() {
      window.location.reload();
    }, 
    showSignup(){
      store.commit("setSignup")
      
    }
    }
  }
  </script>
  
  <style>
  /* Styles for the Login component */
  </style>
  