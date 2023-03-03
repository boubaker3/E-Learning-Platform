<template>
   
  <div class="bg-primary  shadow-xl rounded px-8 pt-6 pb-8 mb-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">

<form @submit.prevent="signup">
  <h1 class="text-sm md:text-base lg:text-lg xl:text-xl font-bold text-texts">Signup to ElEA</h1>
  <div class="mb-6">
    <p class="block mb-2 text-sm font-medium text-primaru-variant  ">{{errors}}</p>
    <label for="fullname" class="block mb-2 text-sm font-medium text-texts ">Your name</label>
    <input v-model="fullname" type="text" id="fullname" class="shadow-sm bg-inputs text-texts text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="enter your name"  >
  </div>
  <div class="mb-6">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900  text-texts">Your email</label>
    <input  v-model="email" type="email" id="email" class="shadow-sm bg-inputs text-texts text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  " placeholder="name@example.com"  >
  </div>
  <div class="mb-6">
    <label for="password" class="block mb-2 text-sm font-medium text-texts">Your password</label>
    <input v-model="password" type="password" id="password" class="shadow-sm bg-inputs text-texts text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  " placeholder="enter your password"  >
  </div>
  <div class="mb-6">
    <label for="confirmpassword" class="block mb-2 text-sm font-medium text-texts">Your password</label>
    <input v-model="confirmPassword" type="password" id="confirmpassword" class="shadow-sm bg-inputs text-texts  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  " placeholder="repeat your password "  >
  </div>
  <div class="flex items-start mb-6">
    <div class="flex items-center h-5">
      <input id="terms" type="checkbox" value="" class="w-4 h-4 text-texts rounded bg-gray-50 focus:ring-3 focus:ring-primay  " required >
    </div>
    <label for="terms" class="ml-2 text-sm font-medium text-texts">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
  </div>
  <button type="submit" class="text-texts bg-secondary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  ">Signup</button>

     <button @click="showLogin" type="button" class="text-texts  bg-transparent hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Already have an account</button>
 </form>
</div>  

  </template>
  
  <script>
import store from '../store'
  export default {
    name: 'SignUp',
    data() {
      return {
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors:""
      }
    },
    methods: {
       signup() {
if(this.password!=this.confirmPassword){
  this.errors="the passwords are not the same!"
}else if (this.fullname.length==0||this.email.length==0||this.password.length==0||this.confirmPassword.length==0){
  this.errors="all the fields must be filled!"
}else if(this.fullname.length<8||this.password.length<8){
  this.errors='fullname and password length must be >8'
}else{
  store.dispatch('signup',{ fullname: this.fullname,
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
    showLogin(){
      store.commit("setLogin")
    }
    }
  }
  </script>
  
  <style>
  /* Styles for the SignUp component */
  </style>
  