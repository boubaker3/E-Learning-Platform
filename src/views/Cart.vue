<template>
  <div>
    <h1 class="text-lg text-texts font-bold">Your cart</h1>
    <CartCard
      @delete="showCartItems"
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
</template>

<script>
import api from "../axios";
import CartCard from "../components/CartCard.vue";
export default {
  name: "cart",
  components: {
    CartCard,
  },
  data() {
    return {
      courses: [],
    };
  },
  mounted() {
    this.showCartItems();
  },
  methods: {
    showCartItems() {
      const user = JSON.parse(localStorage.getItem("user"));
      api
        .get(`addedCartCourses?userid=${user.userid}`)
        .then((response) => {
          this.courses = response.data.cartCourses;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
