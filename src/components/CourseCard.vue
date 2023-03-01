<template>
    <div class="bg-white shadow-md rounded-md p-6">
  <h2 class="text-xl font-bold mb-2">Card Title</h2>
  <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget risus non lorem fermentum imperdiet.</p>
    </div>
</template>
<script>
export default{
    name:"CourseCard",
    props:[
        title,
        thumb,
        created_at,
        rating,
        fullname,
        photo
    ],
    data(){
        return{
            

        }
    }
}


</script>