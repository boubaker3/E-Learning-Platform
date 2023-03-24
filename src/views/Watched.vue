<template>
  <h1 class="text-lg text-texts font-bold">Your Watched List</h1>
  <div class="flex flex-wrap">
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
  </div>
  <div v-if="totalCourses > 0" class="w-full flex items-center justify-center">
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
</template>

<script>
import api from "../axios";
import CourseCard from "../components/CourseCard.vue";
import route from "../router";
export default {
  name: "watched",
  components: {
    CourseCard,
  },
  data() {
    return {
      courses: [],
      currentPage: 1,
      perPage: 10,
      totalCourses: 0,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      const user = JSON.parse(localStorage.getItem("user"));

      api
        .get(`showWatched?userid=${user.userid}&page=${this.currentPage}`)
        .then((response) => {
          this.courses = response.data.courses;
          this.totalCourses = response.data.totalCourses;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    incrementPage() {
      this.currentPage += 1;
      route.push(`/watched/${this.currentPage}`);
    },
    decrementPage() {
      this.currentPage -= 1;
      route.push(`/watched/${this.currentPage}`);
    },
  },
  watch: {
    $route(from, to) {
      this.fetchData();
    },
  },
};
</script>

<style></style>
