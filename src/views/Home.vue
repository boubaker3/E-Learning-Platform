<template>
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
  name: "home",
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
      console.log(user);
      if (user) {
        api
          .get(
            `recommendedCourses?userid=${user.userid}&page=${this.$route.params.page}`
          )
          .then((response) => {
            this.courses = response.data.recommendedCourses;
            this.totalCourses = response.data.totalCourses;
            console.log(response.data.recommendedCourses);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        const userid = null;
        api
          .get(
            `mostPopularCourses?userid=${userid}&page=${this.$route.params.page}`
          )
          .then((response) => {
            this.courses = response.data.recommendedCourses;
            console.log(response.data.recommendedCourses);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    incrementPage() {
      this.currentPage += 1;
      route.push(`/home/${this.currentPage}`);
    },
    decrementPage() {
      this.currentPage -= 1;
      route.push(`/home/${this.currentPage}`);
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
