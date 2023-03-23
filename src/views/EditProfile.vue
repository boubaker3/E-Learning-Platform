<template>
<h1 class="text-texts  bold text-sm md:text-xl ">Edit your profile</h1>
<div class="block justify-center items-center"> 
<form @submit.prevent="photoPath" enctype="multipart/form-data">

<label  for="photo"> 
        <div    class=" rounded-xl items-center justify-center flex p-2">
            
       <img  :src="photo " 
       class="   w-64 h-64 rounded-xl object-cover"/>

        <input id="photo" class="hidden" name="thumb" type="file" @change="onFileSelected"  accept="image/png, image/jpeg" >

        </div>
</label>
</form>
<form @submit.prevent="updateProfile" >

<div class="mb-6">
    <p class="block mb-2 text-sm font-medium text-primaru-variant  ">{{errors}}</p>
    <label for="fullname" class="block mb-2 text-sm font-medium text-texts ">Your name</label>
    <input v-model="fullname" type="text" id="fullname" class=" shadow-sm bg-inputs text-texts text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-1/4 p-2.5  " placeholder="enter your name"  >
  </div>
  <div class="mb-6">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900  text-texts">Your email</label>
    <input disabled  v-model="email"  id="email" class="opacity-50 shadow-sm bg-inputs text-texts text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-1/4 p-2.5  " placeholder="name@example.com"  >
  </div>
  <div class="mb-6">
    <label for="password" class="block mb-2 text-sm font-medium text-texts">Your old password</label>
    <input v-model="oldPassword"   id="password" class="shadow-sm bg-inputs text-texts text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-1/4 p-2.5  " placeholder="enter your old password"  >
  </div>
  <div class="mb-6">
    <label for="newpassword" class="block mb-2 text-sm font-medium text-texts">Your new password</label>
    <input v-model="newPassword"  id="newpassword" class="shadow-sm bg-inputs text-texts  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-1/4 p-2.5  " placeholder="enter your new password "  >
  </div>

  <div class="mb-6">
    <label for="description" class="block mb-2 text-sm font-medium text-texts">Your bio</label>
    <input v-model="description"   id="description" class="shadow-sm bg-inputs text-texts  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-1/4 p-2.5  " placeholder="write your bio "  >
  </div>
<p class="text-inputs text-sm md:text-xl font-bold mb-2">Links:</p>
<input v-model="facebook"    class="shadow-sm mb-2 bg-inputs text-texts  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-1/4 p-2.5  " placeholder="facebook link  "  >
<input v-model="twitter"   class="shadow-sm  mb-2 bg-inputs text-texts  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-1/4 p-2.5  " placeholder="twitter link"  >
<input v-model="instagram"  class="shadow-sm mb-2 bg-inputs text-texts  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-1/4 p-2.5  " placeholder="instagram link"  >
<br/>
      <p class="flex w-1/6 text-texts font-boldml-4">{{ errors }}</p>

<button  type="submit" class="text-texts   hover:text-gray-800 px-4 py-2 bg-primary-variant ml-2 rounded p-2 mt-2">Update Profile</button> 
</form>
<br/>

</div>
</template>
<script>
import store from '../store';
import user from "../assets/darkuser.png"
import api from '../axios';
import localhost from '../../localhost';
export default{
    name:"editProfile",
    data(){
        return{
             photo:user,
            userid:"",
            fullname:"",
            email:"",
            oldPassword:"",
            newPassword:"",
            description:"",
            facebook:"",
            instagram:"",
            twitter:"",
            errors:"",
            image:null

        }
    }, 
    async mounted(){
       await store.dispatch("getUserdata",this.$route.params.userid)
        this.setUserdata

    },
    methods:{
      updateProfile(){
    if(this.fullname.length<8 ){
      this.errors="fullname must contain at least 8 chars";
    } else if(this.oldPassword.length>0||this.newPassword>0){ 
      if(this.oldPassword.length<8||this.newPassword.length<8){
      this.errors="your password must contain at least 8 chars";
      }
      else{
        api.post(`updateProfile?userid=${this.userid}`,{fullname:this.fullname,password:this.oldPassword,email:this.email,newPassword:this.newPassword,description:this.description
                                         ,facebook:this.facebook,twitter:this.twitter,instagram:this.instagram})
            .then(response=>{
              console.log(response.data)
              if(response.data.res){
                this.errors="your old password is incorrect";
              }else{ 
              localStorage.setItem("user",JSON.stringify(response.data.user));
              localStorage.setItem("token",JSON.stringify(response.data.token));
              console.log("profile updated");
              window.location.reload();
            }

            }).catch(error=>{
              console.log(error);

            });
      }
    } 
   
      },
      updatePhoto(){
        const formData=new FormData()
        formData.append('photo',this.image)
        api.post(`updatePhoto?userid=${this.userid}`,formData)
            .then(response=>{
              localStorage.setItem("user",JSON.stringify(response.data.user));
              console.log("photo updated");
              window.location.reload();

            }).catch(error=>{
              console.log(error);

            });
      },
      onFileSelected(e){
          this.photo=URL.createObjectURL(e.target.files[0])
          this.image=e.target.files[0]
          this.updatePhoto()
      }
    },
    computed:{
      setUserdata(){

        this.userid=store.state.userdata.userid
        this.fullname=store.state.userdata.fullname
        if(store.state.userdata.photo!=""){
          this.photo=localhost+"photos\\"+store.state.userdata.photo 
          console.log(this.photo)
        }
        this.email=store.state.userdata.email
        this.description=store.state.userdata.description
        this.facebook=store.state.userdata.facebook
        this.instagram=store.state.userdata.instagram
        this.twitter=store.state.userdata.twitter
        this.facebook=store.state.userdata.facebook
        
      },
       
    }
}
</script>