<template>
    <div class="p-12">
    <div class="flex text-texts">
    <div class=" w-full flex">
    <div class=" w-12 w-h rounded   items-center flex justify-center p-2">
    <img @click="toProfile" class="w-full rounded-md" :src="photoPath"/> 
    </div>
    <h1 @click="toProfile" class="mt-4 text-sm ">{{userdata.fullname}}</h1>
    <div class="ml-6 flex items-center text-lg">
        <p class="text-texts font-bold ">{{ courseDetails.rating }} </p>
        <i class="fas fa-star text-primary-variant"></i>

      </div>
      </div>
      <form @submit.prevent="save">
      <button type="submit" class="h-10 text-texts hover:text-gray-800 px-4 py-2 bg-primary-variant ml-2 rounded ">Save</button> 

    </form>
      <button  class="h-10 text-texts hover:text-gray-800 px-4 py-2 bg-secondary ml-2 rounded ">Share</button> 
      
    </div>

    <div class="md:flex  mt-4">

        <div class=" w-1/2 ">
        <div class="w-full rounded-lg bg-secondary relative">
        <video  :src="videoUrl"  ref="videoPlayer" class="w-full  " @loadedmetadata="onLoadedMetadata" ></video> 
        <div class="controls">
      <button @click="togglePlay"><i :class=" isPlaying ? 'fa fa-pause text-primary-variant' : 'fa fa-play text-primary-variant'  "></i></button>
      <input class="slider" type="range" :max="duration" :value="currentTime" @change="onSeek">
      <span>{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
      <button class="ml-2" @click="toggleFullScreen">
      <i  class="fa fa-expand text-primary-variant" ></i>
    </button>
    </div>
        </div>
        <div class="mt-2 text-texts text-sm  font-bold">
          <h1 class="text-base md:text-xl ">{{courseDetails.title}}</h1>

   <div class="flex mt-6">
    <p class="text-texts font-bold">Published at: {{
      new Date(courseDetails.created_at).toLocaleDateString('en-US',{year:"numeric",month:"long"})
      }}</p>
     
   </div>
          

          <h1 class="text-primary-variant  text-base lg:text-lg xl:text-xl">Course Details:</h1>

          <h2 class=" text-base lg:text-lg xl:text-xl mt-6">What you're gonna learn:</h2>
              <div v-for=" benefit in benefits" class="bg-inputs w-full p-2 rounded-md mt-4">
          <p class="text-texts font-bold">{{ benefit}}</p>
          </div>


          <h2 class=" text-base lg:text-lg xl:text-xl   mt-6">Description:</h2>
          <p >{{ courseDetails.description }}</p>
          <h2 class=" text-base lg:text-lg xl:text-xl mt-6">Requirements:</h2>
          <div v-for=" requirement in requirements" class="bg-primary-variant w-1/2 p-2 rounded-md mt-4">
    <p class="text-texts font-bold">{{ requirement}}</p>
    </div>
    <h2 class=" text-base lg:text-lg xl:text-xl   mt-6">Reviews:</h2>
    <div class="mb-6">
      <form @submit.prevent="postReview">
      <div v-if="user.userid!=courseDetails.userid" class=" flex mt-6">
  
      <div class=" w-16 h-16 rounded   items-center flex justify-center p-2">
    <img class="w-full rounded-md" :src="userPhoto"/> 
    </div>
    <input  v-model="review" type="text"  class="shadow-sm bg-inputs text-texts text-sm rounded-lg  block w-full   p-2.5  " placeholder="write your review here..."  >
    <div class="w-1/3 mt-2">
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
          <p class=" font-bold w-full">{{ review.review}}</p>
          <p class="text-sm "> {{
      new Date(courseDetails.created_at).toLocaleDateString('en-US',{year:"numeric",month:"long"})
      }}</p>

          </div>

  </div>

        </div>
        </div>
        <div  class=" w-1/2 ml-4 bg-secondary rounded-lg h-auto p-4">
            <div v-for="(video,index) in videos" @click="loadVideo(video.videoid)"  class=" text-texts items-center flex ">
                <h1>{{ index+1}}.</h1>

                <div class=" w-16 h-12 rounded items-center flex justify-center p-2">
                <img class="w-full rounded-md" :src="thumbPath"/> 
                </div>
                <h1>{{ video.title }}</h1>
            </div>
        
        </div>
    </div>
    </div>
        
        

</template>
<script>
import localhost from "../../localhost";
import api from "../axios";
import store from "../store";
import Rating from '../components/rating.vue'
import userDefault from "../assets/user.png"
export default{
    name:"courseDetails",
    data(){
        return{
            user:store.state.user,
            userPhoto:"",
            courseDetails:{},
            videos:[],
            userdata:{},
            photoPath:"",
            thumbPath:"",
            videoUrl: null,
            videoid:"",
            requirements:[],
            benefits:[],
            rating:2,
            review:"",
            reviews:[],
            isPlaying: false,
            duration: 0,
            currentTime: 0,
            isFullScreen: false

        }
    },
    components: {
    Rating
  },
       mounted(){
            this.$refs.videoPlayer.addEventListener('timeupdate', this.onTimeUpdate);
            this.$refs.videoPlayer.addEventListener('ended', this.onEnded);
         store.dispatch("getUserdata",this.$route.params.userid)


     
        api.get(`courseDetails?courseid=${this.$route.params.courseid}&userid=${this.$route.params.userid}`)
        .then(response=>{
            this.courseDetails=response.data.courseDetails
            this.videos=response.data.videos
            this.userdata=store.state.userdata
            this.photoPath=localhost+"photos\\"+this.userdata.photo
            this.thumbPath=localhost+"thumbs\\"+this.courseDetails.thumb
            this.userPhoto=localhost+"photos\\"+this.user.photo
            this.videoid=response.data.videos[0].videoid
            this.requirements=JSON.parse(response.data.courseDetails.requirements)
            this.benefits=JSON.parse(response.data.courseDetails.benefits)
 
            api.get(`viewVideo?videoid=${this.videoid}`, {
        responseType: 'blob',
      })
        .then(response=>{
        
          const videoBlob = new Blob([response.data], { type: 'video/mp4' });
        this.videoUrl = URL.createObjectURL(videoBlob);
        this.$refs.videoPlayer.load();
                }).catch(error=>{
            console.log(error)
        });
        this.getReviews()

        api.post("watched",{courseid:this.courseDetails.courseid,userid:this.user.userid})
        .then(response=>{
          console.log(response.data.res)
          this.getReviews()
        }).catch(error=>{
          console.log(error)
        });


         }).catch(error=>{
            console.log(error)
        });
        
      
    },
    methods:{
    toProfile(){
      store.dispatch("getUserdata", this.userid.userid)

    },
        togglePlay() {
      if (this.isPlaying) {
        this.$refs.videoPlayer.pause();
      } else {
        this.$refs.videoPlayer.play();
      }
      this.isPlaying = !this.isPlaying;
    },
    onLoadedMetadata() {
      this.duration = Math.floor( this.$refs.videoPlayer.duration);
    },
    onTimeUpdate() {
      this.currentTime = Math.floor( this.$refs.videoPlayer.currentTime);
    },
    onSeek(event) {
      const seekTime = event.target.value;
      this.$refs.videoPlayer.currentTime = seekTime;
    },
    onEnded() {
      this.isPlaying = false;
    },
    formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = time - minutes * 60;
      return `${minutes}:${String(seconds).padStart(2, '0')}`;
    },
    toggleFullScreen() {
      const videoPlayer = this.$refs.videoPlayer
      if (!this.isFullScreen) {
        if (videoPlayer.requestFullscreen) {
          videoPlayer.requestFullscreen()
        } else if (videoPlayer.mozRequestFullScreen) { /* Firefox */
          videoPlayer.mozRequestFullScreen()
        } else if (videoPlayer.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
          videoPlayer.webkitRequestFullscreen()
        } else if (videoPlayer.msRequestFullscreen) { /* IE/Edge */
          videoPlayer.msRequestFullscreen()
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.mozCancelFullScreen) { /* Firefox */
          document.mozCancelFullScreen()
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
          document.webkitExitFullscreen()
        } else if (document.msExitFullscreen) { /* IE/Edge */
          document.msExitFullscreen()
        }
      }
      this.isFullScreen = !this.isFullScreen
    },
       loadVideo(arg){
        api.get(`viewVideo?videoid=${arg}`, {
        responseType: 'blob',
      })
        .then(response=>{
        
          const videoBlob = new Blob([response.data], { type: 'video/mp4' });
        this.videoUrl = URL.createObjectURL(videoBlob);
        this.$refs.videoPlayer.load();
                }).catch(error=>{
            console.log(error)
        });
       },
       onRatingUpdate(value) {
        this.rating=value
           }
           ,
       postReview(){
        api.post("postReview",{senderid:this.user.userid,receiverid :this.$route.params.userid,
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
       save(){
        api.post("save",{courseid:this.courseDetails.courseid,userid:this.user.userid})
        .then(response=>{
          console.log(response.data.res)
          this.getReviews()
        }).catch(error=>{
          console.log(error)
        });
       },
        reviewPhotoPath(photo){
      return photo!=""? localhost+"photos\\"+photo:userDefault
    }
   
    }, 
}
</script>
<style>
.video-player {
  position: relative;
}

.controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
}

.controls button {
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}
 

.controls span {
  font-size: 14px;
}
.slider {
  flex-grow: 1;
  margin: 0 8px;
    -webkit-appearance: none;
    appearance: none;
 
    height: 5px;
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    outline: none;
    
    -webkit-transition: .2s;
    transition: opacity .2s;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: green;
    cursor: pointer;
  }

  .slider::-moz-range-thumb {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: green;
    cursor: pointer;
  }

  .slider::-ms-thumb {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: green;
    cursor: pointer;
  }
</style>