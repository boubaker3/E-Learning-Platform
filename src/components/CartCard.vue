<template>
  <div
    class="mt-6 w-full md:w-1/2 rounded-lg block p-2 text-texts text-sm md:text-base bg-secondary font-bold"
  >
    <router-link
      :to="{
        path: purshased
          ? `/course/${courseid}/${userid}/course-view`
          : `/yourcart`,
      }"
    >
      <div class="w-full flex">
        <img
          :src="thumbPath"
          class="w-1/2 object-cover rounded-md transition duration-500 ease-in-out opacity-100 hover:opacity-50"
        />
        <div class="items-center mx-auto my-auto block ml-2">
          <h2 class="text-center text-base md:text-xl">{{ title }}</h2>
          <div @click="toProfile" class="flex w-full mt-2">
            <img :src="photoPath" class="w-8 w-8 object-cover rounded-2xl" />

            <p class="text-sm opacity-50 m-2">{{ fullname }}</p>

            <p class="text-lg text-primary-variant ml-6">{{ price }}$</p>
          </div>
        </div>
      </div>
    </router-link>

    <button
      @click="purshase"
      type="button"
      class="text-sm w-24 h-8 text-texts hover:text-gray-800 px-4 py-2 bg-primary-variant ml-2 rounded mt-2 items-center"
    >
      Purshase
    </button>

    <button
      @click="deleteCartItem"
      type="button"
      class="text-sm w-24 h-8 text-texts hover:text-gray-800 px-4 py-2 bg-primary ml-2 rounded mt-2 items-center"
    >
      Delete
    </button>
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
      thumbPath: localhost + "thumbs\\" + this.thumb,
      photoPath: localhost + "photos\\" + this.photo,
      purshased: false,
    };
  },
  mounted() {
    api
      .get(`cartCourses?userid=${this.userid}&courseid=${this.courseid}`)
      .then((response) => {
        this.purshased = response.data.res;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    deleteCartItem() {
      api
        .get(`deleteCartItem?courseid=${this.courseid}`)
        .then((response) => {
          this.purshased = response.data.res;
          this.$emit("delete");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    purshase() {
      api
        .post("purshase", {
          amount: parseInt(this.price),
          userid: this.userid,
          courseid: this.courseid,
        })
        .then((response) => {
          window.location.href = response.data.approvalUrl;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    toProfile() {
      store.dispatch("getUserdata", { userid: this.userid, redirect: true });
    },
  },
};
</script>
