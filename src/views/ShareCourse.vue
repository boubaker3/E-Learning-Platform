<template>
    <div class="p-2">
  <form  @submit.prevent="share" enctype="multipart/form-data">
        <h1 class="text-texts text-sm md:text-base lg:text-lg xl:text-xl">Share A Course</h1>
        <br/>
        <h1 class="text-texts text-sm md:text-base lg:text-lg xl:text-xl flex items-center justify-center">course info</h1>
        <div class="w-full h-1 bg-secondary "></div>
        <br/>
 <label  for="coursethumb"> 
        <div   class="  w-full md:w-1/2 h-72 rounded-xl bg-secondary items-center justify-center flex">
            <img v-if="courseThumb"  :src="courseThumb" class="w-full h-full object-cover"/>
            <img style="{z-index: 0}" v-if="!courseThumb" src="../assets/image_holder.png" class=" w-1/4 h-auto  object-cover opacity-50 rounded-xl"/>
 
            <input id="coursethumb" class="hidden" name="thumb" type="file" @change="onFileSelected"  accept="image/png, image/jpeg" >

        </div>
</label>

        <br/>
        <div class="mb-6">
    <label for="title" class="block mb-2 text-sm font-medium text-gray-900  text-texts">course title</label>
    <input  v-model="title" type="text" id="title" class="shadow-sm bg-inputs text-texts text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-1/4  p-2.5  " placeholder="example: learn html5"  >
  </div>

  <div class="mb-6">
    <label for="description" class="block mb-2 text-sm font-medium text-gray-900  text-texts">course description</label>
    <textarea style="resize: none;overflow: hidden;" rows="4" cols="50" v-model="description" type="text" id="description" class="shadow-sm bg-inputs text-texts text-sm rounded-lg
                                                                 focus:ring-blue-500 focus:border-blue-500 block w-full md:w-1/4  p-2.5"
     placeholder="describe the course" ></textarea>
  </div>

  <div class="mb-6">
    <div v-for="benefit in benefits" class="bg-inputs w-1/4 p-2 rounded-md mt-4">
    <p class="text-texts font-bold">{{ benefit}}</p>
    </div>
    <br/>
    <label for="benefit" class="block mb-2 text-sm font-medium text-gray-900  text-texts">What you're gonna learn:</label>
    <input  v-model="benefit" type="text" id="benefit" class="shadow-sm bg-inputs text-texts text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-1/4  p-2.5  " placeholder="what it takes to start this course?"  >
    <br/>
    <button :disabled="benefits.length>20" @click="addBenefit"
         class="text-texts hover:text-gray-800 px-4 py-2 bg-inputs ml-2 font-bold rounded ">add benefit</button>
  
</div>

  <div class="mb-6">
    <div v-for="req in requirements" class="bg-primary-variant w-1/4 p-2 rounded-md mt-4">
    <p class="text-texts font-bold">{{ req}}</p>
    </div>
    <br/>
    <label for="req" class="block mb-2 text-sm font-medium text-gray-900  text-texts">course requirements</label>
    <input  v-model="requirement" type="text" id="req" class="shadow-sm bg-inputs text-texts text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-1/4  p-2.5  " placeholder="what it takes to start this course?"  >
    <br/>
    <button :disabled="requirements.length>10" @click="addReq"
         class="text-texts hover:text-gray-800 px-4 py-2 bg-primary-variant ml-2 font-bold rounded ">add requirement</button>
  
</div>
<div class="mb-6">
<label for="categories" class="block mb-2 text-sm font-medium text-gray-900  text-texts">course category</label>
<select v-model="category"  class="w-1/4 outline-0 bg-secondary text-texts p-2 rounded-md"  id="categories">
    <option  v-for="category in categories" :value="category.name">{{ category.name }}</option>
</select>
</div>

<div class="block mb-2 text-sm font-medium text-gray-900  text-texts flex" >
<p>is it paid or free?</p>
<input v-model="paid_or_free" type="radio" id="paid" class="ml-2" name="freeorpaid"  value="paid" checked>
<label for="paid" class="ml-2">Paid</label> 
<input v-model="paid_or_free" type="radio" class="ml-2" id="free" name="freeorpaid" value="free">
<label for="free" class="ml-2">Free</label> 
</div> 
<div v-if="paid_or_free=='paid'" class="mb-6">
    <label for="title" class="block mb-2 text-sm font-medium text-gray-900  text-texts">course price</label>
    <input  v-model="price" type="text" id="title" class="shadow-sm bg-inputs text-texts text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-1/4  p-2.5  " placeholder="whats the price in $"  >
  </div>
<h1 class="text-texts text-sm md:text-base lg:text-lg xl:text-xl flex items-center justify-center">course content</h1>
        <div class="w-full h-1 bg-secondary "></div>
        <br/>
<div>
    <div class="text-texts text-sm md:text-base   flex items-center justify-center "
        v-for="videoname in videonames">
        <i class="fas fa-play"></i>
        <p class="ml-2">{{ videoname }}</p>
    </div>
    <br/>

 <div class="flex w-full text-texts font-bold ">
      <label for="addvideo"><i class="fas fa-add hover:text-gray-800 px-4 py-2 bg-primary-variant ml-2 rounded"></i></label>
      <p class="ml-4">add video</p>
    </div>
         <input id="addvideo" class="hidden" name="videos[]" type="file" @change="addVideo" accept="video/*" multiple>
<br/>
      <p class="flex w-1/6 text-texts font-boldml-4">{{ errors }}</p>
<br/>

<div class="flex justify-center">
<button type="submit" class="text-texts hover:text-gray-800 px-4 py-2 bg-primary-variant ml-2 font-bold rounded  ">publish</button>
</div>

</div>    
  </form>
</div>
</template>
<script>
import api from "../axios"
import store from "../store"
 export default{
name:"ShareCourse",
data(){
    return{
      user:store.state.user,
        title:"",
        courseThumb:null,
        description:"",
        requirement:"",
        requirements:[],
        benefit:"",
        benefits:[],
        categories:[
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
      ],
      category:"",
       paid_or_free:"paid",
       price:"",
       videos:[],
       videonames:[],
       thumb:"",
       errors:""



    }  
},
mounted(){
console.log(this.user.userid)
},
methods:{
    onFileSelected(e){
        const image=e.target.files[0]
        this.courseThumb=URL.createObjectURL(image)
        this.thumb=image
    },
    addReq(){
        if(this.requirement!=""&&this.requirement.length>2){

          this.requirements.push(this.requirement)
          this.requirement=""
 
        }
        },
        addBenefit(){
        if(this.benefit!=""&&this.benefit.length>10){

          this.benefits.push(this.benefit)
          this.benefit=""
 
        }},   
    addVideo(e){
        const file=e.target.files[0]
        this.videos.push(file)
        this.videonames.push(file.name)
    },
   async share(){
    if(this.title==""||this.courseThumb==null||this.description==""||
    this.requirements.length==0||this.benefits.length==0||this.videos.length==0){
        this.errors="All fields are required"
    
    }
    else{
      let  formData=new FormData()
        for (let i = 0; i < this.videos.length; i++) {
          formData.append('videos[]', this.videos[i])
      } 
      
      formData.append('userid',this.user.userid) 
 
      formData.append('title',this.title) 
      formData.append('thumb',this.thumb) 
      formData.append('category',this.category) 
      formData.append('description',this.description)
      formData.append('requirements',JSON.stringify(this.requirements))
      formData.append('paid_or_free',this.paid_or_free)
      formData.append('price',this.price)
      formData.append('benefits',JSON.stringify(this.benefits))
 
        await api.post("/sharecourse",formData)
                .then(res=>{
                  console.log(res.data)
                }).catch(error=>{
                    console.log(error.response.data)
                })

    }
   } 
}
}
</script>