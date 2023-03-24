<template>
  <h1 class="text-texts bold text-sm md:text-xl mt-6">
    {{ userdata.fullname }}'s profile
  </h1>

  <div class="block">
    <div
      class="w-full lg:w-1/2 h-auto shadow-2xl rounded-xl text-texts p-4 mt-2"
    >
      <div class="fixed relative">
        <a v-if="userdata.reviews != null" class=" ">1000 review</a>
        <a v-if="userdata.students != null" class="ml-6 p-2 mb-2"
          >5000 student</a
        >
      </div>
      <img :src="photoPath" class="w-48 h-48 rounded-xl mx-auto object-cover" />
      <h1
        class="bold text-sm md:text-base lg:text-lg xl:text-xl text-center mt-6"
      >
        {{ userdata.fullname }}
      </h1>
      <h1 class="bold text-sm md:text-base mt-6">About me</h1>
      <p v-if="userdata.description == '' || userdata.description == null">
        no description added
      </p>
      <p>{{ userdata.description }}</p>
      <p class="mt-6">Joined At : {{ userdata.created_at }}</p>
      <h1 class="bold text-sm md:text-base mt-4">Social Media:</h1>
      <div class="flex mt-4">
        <img v-for="sm in socialMedias" :src="sm.img" class="w-8 h-auto ml-2" />
      </div>
      <div class="hidden items-center md:flex mt-4">
        <router-link :to="{ path: `/editProfile/${userid}` }">
          <button
            v-if="userid == this.$route.params.userid"
            class="text-texts hover:text-gray-800 px-4 py-2 bg-secondary ml-2 rounded p-2"
          >
            Edit Profile
          </button>
        </router-link>
        <form @submit.prevent="follow">
          <button
            type="submit"
            v-if="userid != this.$route.params.userid"
            class="text-texts hover:text-gray-800 px-4 py-2 bg-secondary ml-2 rounded p-2"
          >
            {{ followed ? "unfollow" : "follow" }}
          </button>
        </form>
      </div>
    </div>
    <div class="w-full lg:ml-12">
      <h1
        class="bold text-texts text-sm md:text-base lg:text-lg xl:text-xl text-center mt-6"
      >
        courses:
      </h1>

      <course-card
        v-for="course in courses"
        :courseid="course.courseid"
        :userid="course.userid"
        :title="course.title"
        :thumb="course.thumb"
        :category="course.category"
        :rating="course.rating"
        :fullname="course.fullname"
        :photo="course.photo"
        :price="course.price"
      />

      <div class="w-full flex items-center justify-center">
        <button
          @click="decrementPage"
          v-if="currentPage > 1"
          class="h-10 text-texts hover:text-gray-800 px-4 py-2 bg-secondary ml-2 rounded"
        >
          prev
        </button>

        <button
          @click="incrementPage"
          v-if="currentPage > Math.ceil(totalCourses / perPage)"
          class="h-10 text-texts hover:text-gray-800 px-4 py-2 bg-secondary ml-2 rounded"
        >
          next
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import facebook from "../assets/facebook.png";
import instagram from "../assets/instagram.png";
import twitter from "../assets/twitter.png";
import userDefault from "../assets/darkuser.png";
import store from "../store";
import localhost from "../../localhost";
import api from "../axios";
import CourseCard from "../components/CourseCard.vue";
import route from "../router";

export default {
  name: "Profile",
  data() {
    return {
      socialMedias: [
        { img: facebook, name: "facebook" },
        { img: instagram, name: "instagram" },
        { img: twitter, name: "twitter" },
      ],
      userid: store.state.user.userid,
      userdata: {},
      courses: [],
      followed: false,
      currentPage: 1,
      perPage: 10,
      totalCourses: 0,
    };
  },
  components: {
    CourseCard,
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.userdata = store.state.userdata;
      console.log(JSON.stringify(store.state.userdata));
      this.checkFollowed();

      api
        .get(
          `profileCourses?userid=${this.$route.params.userid}&page=${this.currentPage}`
        )
        .then((response) => {
          this.courses = response.data.courses;
          this.totalCourses = response.data.totalCourses;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    follow() {
      api
        .post(
          `follow?receiverid=${this.$route.params.userid}&senderid=${this.userid}`
        )
        .then((response) => {
          this.checkFollowed();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    checkFollowed() {
      api
        .get(
          `followed?receiverid=${this.$route.params.userid}&senderid=${this.userid}`
        )
        .then((response) => {
          this.followed = response.data.res;
          console.log(response.data.res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    incrementPage() {
      this.currentPage += 1;
      route.push(`/profile/${this.currentPage}`);
    },
    decrementPage() {
      this.currentPage -= 1;
      route.push(`/profile/${this.currentPage}`);
    },
  },
  computed: {
    photoPath() {
      return this.userdata.photo != ""
        ? localhost + "photos\\" + this.userdata.photo
        : userDefault;
    },
  },
  watch: {
    $route(from, to) {
      this.fetchData();
    },
  },
};
</script>
