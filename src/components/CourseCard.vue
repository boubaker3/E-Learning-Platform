<template>
  <div
    class="w-full md:w-1/2 lg:w-1/4 block p-2 text-texts text-sm md:text-base bg-secondary rounded-lg font-bold m-6"
  >
    <div class="flex">
      <div class="flex w-full m-2">
        <p class="w-8 text-sm text-texts rounded ml-2 mb-2 bg-primary-variant">
          {{ price }}$
        </p>
      </div>
      <div class="flex w-1/4 float-right m-2 ml-24">
        <p class="text-sm">{{ rating }}</p>
        <i class="fas fa-star text-yellow"></i>
      </div>
    </div>

    <div class="w-full h-38 relative">
      <img
        :src="thumbPath(thumb)"
        class="w-full h-38 object-cover rounded-md transition duration-500 ease-in-out opacity-100 hover:opacity-50"
      />
      <img
        src="../assets/play.png"
        class="w-12 h-12 absolute inset-0 mx-auto my-auto transition duration-500 ease-in-out opacity-0 hover:opacity-100"
      />
    </div>
    <div class="block justify-center items-center">
      <h2 class="text-center">{{ title }}</h2>
    </div>
    <div @click="toProfile" class="flex w-full">
      <img :src="photoPath(photo)" class="w-8 w-8 object-cover rounded-2xl" />

      <p class="text-sm opacity-50 m-2">{{ fullname }}</p>
    </div>
    <router-link
      :to="{
        path: purshased
          ? `/course/${courseid}/${userid}/course-view`
          : `/course/${courseid}/${userid}`,
      }"
    >
      <div class="flex justify-center items-center">
        <button
          type="submit"
          class="text-sm text-texts hover:text-gray-800 px-4 py-2 bg-primary-variant rounded mt-2 text-center"
        >
          watch course
        </button>
      </div>
    </router-link>
  </div>
</template>
<script>
import localhost from "../../localhost";
import api from "../axios";
import store from "../store";

export default {
  name: "CourseCard",
  props: {
    title: String,
    category: String,
    courseid: String,
    userid: String,
    thumb: String,
    rating: String,
    price: String,
    fullname: String,
    photo: String,
  },
  data() {
    return {
      purshased: false,
    };
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      api
        .get(`cartCourses?userid=${user.userid}&courseid=${this.courseid}`)
        .then((response) => {
          this.purshased = response.data.res;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  methods: {
    toProfile() {
      store.dispatch("getUserdata", { userid: this.userid, redirect: true });
    },
    thumbPath(thumb) {
      return localhost + "thumbs\\" + thumb;
    },
    photoPath(photo) {
      return localhost + "photos\\" + photo;
    },
  },
};
</script>
