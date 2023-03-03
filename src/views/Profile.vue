<template>
<h1 class="text-texts  bold text-sm md:text-xl  mt-6">username's profile</h1>

    <div class="lg:fixed">
   
<div class="w-full lg:w-1/4 h-auto shadow-xl rounded-xl text-texts p-4">
    <div  class="fixed relative">
<a class=" ">1000 review</a> <a class="ml-6">5000 student</a>
    </div>
<img src="../assets/photo_profile.jpeg" class="w-1/2 h-auto  mx-auto object-cover"/>
<h1 class="  bold text-sm md:text-base lg:text-lg xl:text-xl text-center mt-6">username</h1>
<h1 class=" bold text-sm md:text-base  mt-6">About me</h1>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis porro deserunt ab atque aliquam architecto voluptas sint officiis sequi exercitationem mollitia, adipisci fugit. Ducimus aut voluptatum harum error quas? Beatae.</p>
<p class=" mt-6">Joined At : 2020 may</p>
<h1 class=" bold text-sm md:text-base  mt-4">Social Media:</h1>
<div class="flex  mt-4">
    <img v-for="sm in socialMedias" :src="sm.img" class="w-12 h-auto  ml-2"/>
 

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
export default{
    name:"Profile",
    data(){
        return{
            socialMedias:[{img:facebook,name:'facebook'},{img:instagram,name:'instagram'},{img:twitter,name:'twitter'}]
        }
    }
}

</script>