<template>
    <div class="w-full  p-12">
    <div class="flex text-texts  ">
        <div @click="toProfile" class=" w-12 h-12 rounded items-center flex justify-center p-2">
        <img class="w-full rounded-md" :src="photoPath"/> 
      </div>
<h1 @click="toProfile" class="mt-4 text-sm w-full ">{{userdata.fullname}}</h1> 
<div class="ml-6 flex items-center text-lg">
        <p class="text-texts font-bold ">{{ courseDetails.rating }} </p>
        <i class="fas fa-star text-primary-variant"></i>

      </div>
      <form @submit.prevent="save">
      <button type="submit" class="h-10 text-texts hover:text-gray-800 px-4 py-2 bg-primary-variant ml-2 rounded ">Save</button> 

    </form>
      <button  class="h-10 text-texts hover:text-gray-800 px-4 py-2 bg-secondary ml-2 rounded ">Share</button> 
      
    </div>
    <div class="flex w-full h-96 text-texts relative">
<img class=" object-cover w-full h-full absolute" :src="thumbPath"/> 
<h1 class="text-base md:text-3xl bottom-0 m-4 absolute">{{courseDetails.title}}</h1>
</div>
<div class="md:flex mt-6 text-texts font-bold">
    <p class="w-full ">Published at: {{
      new Date(courseDetails.created_at).toLocaleDateString('en-US',{year:"numeric",month:"long"})
      }}</p>
     <div class=" md:w-1/4 flex">      
<form @submit.prevent="addToCart">
     <div class=" flex">      
        <p class="text-3xl text-primary-variant">  {{courseDetails.price}}$</p>
        <button type="submit" class="text-texts hover:text-gray-800 px-4 py-2 bg-primary-variant  ml-2 rounded ">Add to cart</button> 
     </div>
</form>
</div>

   </div> 
    <div class="text-texts ">
        <h1 class="text-primary-variant font-bold text-base lg:text-lg xl:text-xl">Course Details:</h1>

<h2 class="font-bold text-base lg:text-lg xl:text-xl mt-6">What you're gonna learn:</h2>
    <div v-for=" benefit in benefits" class="bg-inputs w-full md:w-1/2 p-2 rounded-md mt-4">
<p class="text-texts ">{{ benefit}}</p>
</div>


<h2 class=" text-base lg:text-lg xl:text-xl font-bold  mt-6">Description:</h2>
<p >{{ courseDetails.description }}</p>
<h2 class="font-bold text-base lg:text-lg xl:text-xl mt-6">Requirements:</h2>
<div v-for=" requirement in requirements" class="bg-primary-variant w-1/2 p-2 rounded-md mt-4">
<p class="text-texts font-bold">{{ requirement}}</p>
</div>
<h2 class=" text-base lg:text-lg xl:text-xl font-bold mt-6">Reviews:</h2>
<div class="mb-6">
<form @submit.prevent="postReview">
<div   v-if="user.userid!=courseDetails.userid" class="w-full md:flex mt-6">
  <div class=" flex w-full">

<div class=" w-16 h-16 rounded   items-center flex justify-center p-2">
<img class="w-full rounded-md" :src="photoPath"/> 
</div>
<input  v-model="review" type="text"  class="shadow-sm bg-inputs text-texts text-sm rounded-lg  block w-full   p-2.5  " placeholder="write your review here..."  >
</div>
 
<div class="md:w-1/2 mt-2 ">
<rating :max-stars="5" :rating="rating" @update:rating="onRatingUpdate" />
</div>
</div>
<button type="submit" class="text-texts hover:text-gray-800 px-4 py-2 bg-primary-variant ml-2 rounded mt-6 ">Post</button> 

</form>

<div class="w-full h-1 bg-secondary mt-4"></div>

<div v-for=" review in reviews" class="items-center flex bg-inputs w-full p-2 rounded-md mt-4 text-texts ">
  
<div class=" w-16 h-16 rounded  p-2">
<img class="w-full rounded-md" :src="reviewPhotoPath(review.photo)"/> 
</div>
<p class=" font-bold ">{{ review.review}}</p>
<div class="ml-6 flex items-center text-lg w-full">
        <i v-for="i in review.rating" class=" fas fa-star text-primary-variant flex"></i>

      </div>
<p class="text-sm "> {{
new Date(courseDetails.created_at).toLocaleDateString('en-US',{year:"numeric",month:"long"})
}}</p>

</div>

</div>
    </div>
    </div>
        
        

</template>
<script>
import localhost from "../../localhost";
import api from "../axios";
import store from "../store";
import userDefault from "../assets/user.png"
import Rating from '../components/rating.vue'

export default{
    name:"courseDetails",
    data(){
        return{
            user:store.state.user,
            courseDetails:{},
            videos:[],
            userdata:{},
             photoPath:"",
            thumbPath:"",
            requirements:[],
            benefits:[],
            review:"",
            rating:2,
            reviews:[],
        }
    },
    components: {
    Rating
  },
        mounted(){

         store.dispatch("getUserdata",this.$route.params.userid)

     
        api.get(`courseDetails?courseid=${this.$route.params.courseid}&userid=${this.$route.params.userid}`)
        .then(response=>{
            this.courseDetails=response.data.courseDetails
            this.videos=response.data.videos
            this.userdata=store.state.userdata
            this.photoPath=localhost+"photos\\"+this.userdata.photo
            this.thumbPath=localhost+"thumbs\\"+this.courseDetails.thumb
            this.videoid=response.data.videos[0].videoid
            this.requirements=JSON.parse(response.data.courseDetails.requirements)
            this.benefits=JSON.parse(response.data.courseDetails.benefits)
        this.getReviews()

         }).catch(error=>{
            console.log(error)
        });

      

      
         
    
    },
    methods:{
      toProfile(){
      store.dispatch("getUserdata", this.userid.userid)

    },
        postReview(){
        api.post("postReview",{senderid:this.user.userid,receiverid:  this.$route.params.userid,
                              courseid:this.courseDetails.courseid,review:this.review,rating:this.rating})
        .then(response=>{
          console.log(response.data.res)
          this.getReviews()
        }).catch(error=>{
          console.log(error)
        });
       },
       getReviews(){
        api.get(`showReviews?courseid=${this.courseDetails.courseid}`)
        .then(response=>{
          console.log(response.data.reviews)
          this.reviews=response.data.reviews
        }).catch(error=>{
          console.log(error)
        })
       },
       addToCart(){
        api.post("addToCart",{userid:this.user.userid, 
                              courseid:this.courseDetails.courseid})
        .then(response=>{
          console.log(response.data.res)
          window.location.reload()
        }).catch(error=>{
          console.log(error)
        });
       }, 
       save(){
        api.post("save",{courseid:this.courseDetails.courseid ,userid:this.user.userid})
        .then(response=>{
          console.log(response.data.res)
          this.getReviews()
        }).catch(error=>{
          console.log(error)
        });
      },
        reviewPhotoPath(photo){
      return photo!=""? localhost+"photos\\"+photo:userDefault
    },
    onRatingUpdate(value) {
        this.rating=value
           }
   
    }
}
</script>