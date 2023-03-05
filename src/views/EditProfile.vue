<template>
<h1 class="text-texts  bold text-sm md:text-xl ">Edit your profile</h1>
<div class="block justify-center items-center"> 

<label  for="photo"> 
        <div    class=" rounded-xl items-center justify-center flex p-2">
            
            <img :src="photo" class="   w-64 h-64 rounded-xl object-cover"/>

        <input id="photo" class="hidden" name="thumb" type="file" @change="onFileSelected"  accept="image/png, image/jpeg" >

        </div>
</label>
<div class="mb-6">
    <p class="block mb-2 text-sm font-medium text-primaru-variant  ">{{errors}}</p>
    <label for="fullname" class="block mb-2 text-sm font-medium text-texts ">Your name</label>
    <input v-model="fullname" type="text" id="fullname" class="shadow-sm bg-inputs text-texts text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-1/4 p-2.5  " placeholder="enter your name"  >
  </div>
  <div class="mb-6">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900  text-texts">Your email</label>
    <input  v-model="email"  id="email" class="shadow-sm bg-inputs text-texts text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-1/4 p-2.5  " placeholder="name@example.com"  >
  </div>
  <div class="mb-6">
    <label for="password" class="block mb-2 text-sm font-medium text-texts">Your old password</label>
    <input v-model="oldPassword" type="password" id="password" class="shadow-sm bg-inputs text-texts text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-1/4 p-2.5  " placeholder="enter your old password"  >
  </div>
  <div class="mb-6">
    <label for="newpassword" class="block mb-2 text-sm font-medium text-texts">Your new password</label>
    <input v-model="newPassword" type="password" id="newpassword" class="shadow-sm bg-inputs text-texts  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-1/4 p-2.5  " placeholder="enter your new password "  >
  </div>

  <div class="mb-6">
    <label for="description" class="block mb-2 text-sm font-medium text-texts">Your bio</label>
    <input v-model="description"   id="description" class="shadow-sm bg-inputs text-texts  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-1/4 p-2.5  " placeholder="write your bio "  >
  </div>
<p class="text-inputs text-sm md:text-xl font-bold mb-2">Links:</p>
<input v-model="facebook"    class="shadow-sm mb-2 bg-inputs text-texts  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-1/4 p-2.5  " placeholder="facebook link  "  >
<input v-model="twitter"   class="shadow-sm  mb-2 bg-inputs text-texts  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-1/4 p-2.5  " placeholder="twitter link"  >
<input v-model="instagram"  class="shadow-sm mb-2 bg-inputs text-texts  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-1/4 p-2.5  " placeholder="instagram link"  >
<button type="submit" class="text-texts   hover:text-gray-800 px-4 py-2 bg-primary-variant ml-2 rounded p-2 mt-2">Update Profile</button> 

</div>
</template>
<script>
import store from '../store';
import user from "../assets/darkuser.png"
export default{
    name:"editProfile",
    data(){
        return{
             photo:user,
            fullname:"",
            email:"",
            oldPassword:"",
            newPassword:"",
            description:"",
            facebook:"",
            instagram:"",
            twitter:"",
            errors:"",

        }
    },
    methods:{
        onFileSelected(e){
            this.photo=URL.createObjectURL(e.target.files[0])
        }
    },
    mounted(){
        store.dispatch("getUserdata",this.$route.params.userid)
            .then(response=>{
                console.log(response.data)
                this.fullname=response.data.userdata.fullname
                if(response.data.userdata.photo!=null){
                    this.photo=response.data.userdata.photo
                }

            }).catch(error=>{
                console.log(error.response)
            })
    }
}
</script>