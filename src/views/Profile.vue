<template>
<h1 class="text-texts  bold text-sm md:text-xl  mt-6">{{userdata.fullname}}'s profile</h1>

    <div class="lg:flex">
   
<div class="w-full lg:w-1/4 h-auto shadow-2xl rounded-xl text-texts p-4 mt-2">
    <div   class="fixed relative">
<a v-if="userdata.reviews!=null" class=" ">1000 review</a> <a v-if="userdata.students!=null" class="ml-6 p-2 mb-2">5000 student</a>
    </div>
<img :src="userdata.photo!=null?userdata.photo:userDefault" class="w-48 h-48 rounded-xl  mx-auto object-cover"/>
<h1 class="  bold text-sm md:text-base lg:text-lg xl:text-xl text-center mt-6">{{userdata.fullname}}</h1>
<h1 class=" bold text-sm md:text-base  mt-6">About me</h1>
<p v-if="userdata.description==''||userdata.description==null">no description added</p>
<p>{{userdata.description}}</p>
<p class=" mt-6">Joined At : {{userdata.created_at }}</p>
<h1 class=" bold text-sm md:text-base  mt-4">Social Media:</h1>
<div class="flex  mt-4">

    <img v-for="sm in socialMedias" :src="sm.img" class="w-8 h-auto  ml-2"/>

</div>
<div class="hidden items-center md:flex mt-4 ">
    <router-link :to="{path:`/editProfile/${userid}`}">
    <button v-if="userid==this.$route.params.userid" class="text-texts   hover:text-gray-800 px-4 py-2 bg-secondary ml-2 rounded p-2">Edit Profile</button> 
    </router-link> 
    <button  class="text-texts hover:text-gray-800 px-4 py-2 bg-secondary ml-2 rounded p-2">Follow</button> 

    </div>
</div>
<div class="w-full lg:w-1/2">

</div>
    </div>
</template>
<script>
 import facebook from "../assets/facebook.png"
import instagram from "../assets/instagram.png"
import twitter from "../assets/twitter.png"
import userDefault from "../assets/darkuser.png"
import store from "../store"
export default{
    name:"Profile",
    data(){
        return{
            socialMedias:[{img:facebook,name:'facebook'},{img:instagram,name:'instagram'},{img:twitter,name:'twitter'}],
            userDefault,
            userdata:{},
            userid:store.state.user.userid
        }
    },
    mounted(){ 
            store.dispatch("getUserdata",this.$route.params.userid)
            .then(response=>{
                this.userdata=response.data.userdata

            }).catch(error=>{
                console.log(error.response)
            })
        

    }
}

</script>