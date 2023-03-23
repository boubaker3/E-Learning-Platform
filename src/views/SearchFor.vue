<template>
    <progressBar :loading="loading"></progressBar>

      <h1 class=" text-lg text-texts font-bold">Results for: {{ searchFor }}</h1>

    <div class="flex  flex-wrap">

      <course-card v-for="course in courses" :courseid="course.courseid" :userid="course.userid"
                                         :title="course.title" :thumb="course.thumb" :category="course.category"
                                         :rating="course.rating" :fullname="course.fullname" 
                                         :photo="course.photo" :price="course.price"/>
       <div class="w-full flex items-center justify-center  ">
  <button  @click="decrementPage" v-if="currentPage > 1" class="h-10 text-texts hover:text-gray-800 px-4 py-2 bg-secondary ml-2 rounded ">prev</button> 
 
  <button  @click="incrementPage" v-if="currentPage > Math.ceil(totalCourses / perPage)" class="h-10 text-texts hover:text-gray-800 px-4 py-2 bg-secondary ml-2 rounded ">next</button> 
  
  </div>
       </div>
  </template>
  
  <script>
  import api from "../axios";
  import CourseCard from "../components/CourseCard.vue";
import progressBar from "../components/progressBar.vue";
import route from "../router";

  export default {
    name:"search",
    components:{
      CourseCard,
    progressBar

    },
    data() {
      return {
      courses:[],
      searchFor:"",
      loading: true, 
      currentPage:1,
    perPage:10,
    totalCourses:0


      }
    },
    mounted(){
      this.search()
    },
    watch:{
      '$route' (to,from){
        this.loading = true;
  this.search()

      }
    },
    methods:{
      search(){
        this.searchFor=this.$route.params.searchFor
      console.log(this.searchFor)
      api.get(`search?searchfor=${this.searchFor}&page=${this.currentPage}` )
          .then(response=>{
          this.courses=response.data.courses
          this.loading = false;
                 
        }).catch(error=>{
            this.loading = false;

              console.log(error)
          });
      },
        
    incrementPage(){
      this.currentPage+=1
      route.push(`/home/${this.currentPage}`)
    },
    decrementPage(){
      this.currentPage-=1
      route.push(`/home/${this.currentPage}`)
    }
    }
     
  };
  </script>
  
  <style>
   
  </style>
  