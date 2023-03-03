<template>
    <div class="home">
<div id="suggestions"  class=" w-full md:flex">
  <ul class=" flex h-24 ">
      <li v-for="menuItem in menuItems"><a href="#" class="text-texts  rounded-xl bg-inputs p-2 mt-12">{{ menuItem.name }}</a></li>
  </ul> 
    </div>
    <div class="md:flex">
<CourseCard />
    </div>
    </div>
  </template>
  
  <script>
import CourseCard from '../components/CourseCard.vue';
import api from '../axios';
  export default {
    name: "Home",
    data(){
      return{
        courses:[],
        menuItems:[
          {id:1,name:"Development"},
          {id:2,name:"Business"},
          {id:3,name:"Finance&Accounting"},
          {id:4,name:"It&Software"},
          {id:5,name:"Design"},
          {id:6,name:"Marketing"},
          {id:7,name:"Health&Fitness"},
          {id:8,name:"Music"},
          {id:9,name:"FilmMaking"},
          {id:10,name:"Photography"},
      ]
      } 
    },
    components:{
CourseCard
    },
    mounted() {
    // Execute GET method here
    api.get('/recommendedCourses')
      .then(response => {
        this.courses = response.data.courses;
      })
      .catch(error => {
        console.error(error);
      });
  },
    methods:{

    }
}
  </script>
  
  <style scoped>
  #suggestions{
    width: 100%;
    white-space: nowrap;
    overflow: auto;
     }
  #suggestions::-webkit-scrollbar {
  display: none;
}
  #suggestions li{
    border-radius: 12px;
  
    margin-left: 5px;
    margin: 12px;
  }
  </style>
  