<template>
  <progressBar :loading="loading"></progressBar>

  <div>
    <h1 class="text-lg text-texts font-bold mt-6">Validate Payment</h1>
    <div
      v-if="!loading"
      class="w-full md:w-1/2 rounded-lg items-center justify-center block bg-secondary"
    >
      <h2 class="text-lg text-texts font-bold text-center">{{ res }}</h2>
      <h1 class="text-lg text-texts font-bold text-center">
        You purshased that course
      </h1>

      <img class="mx-auto mt-6" :src="thumbPath" />
      <h1 class="text-lg text-texts font-bold text-center">
        {{ course.title }}
      </h1>
      <router-link to="/yourcart">
        <button
          type="button"
          class="mx-auto font-bold text-texts hover:text-gray-800 px-4 py-2 bg-primary-variant rounded ml-6 m-6 text-center"
        >
          Go to my Cart
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import localhost from "../../localhost";
import api from "../axios";
import progressBar from "../components/progressBar.vue";
export default {
  name: "validatePayment",
  data() {
    return {
      course: {},
      res: "",
      thumbPath: "",
      loading: false,
    };
  },
  props: {
    userid: String,
    courseid: String,
    amount: Number,
    paymentId: String,
    payerId: String,
  },
  components: {
    progressBar,
  },
  mounted() {
    this.loading = !this.loading;
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      api
        .post("/validatePayment", {
          sellerid: user.userid,
          userid: this.userid,
          courseid: this.courseid,
          amount: this.amount,
          paymentid: this.paymentId,
          payerid: this.payerId,
        })
        .then((response) => {
          this.loading = !this.loading;

          this.res = response.data.message;
          this.course = response.data.course;
          this.thumbPath = localhost + "thumbs\\" + this.course.thumb;
          console.log(this.res);
        })
        .catch((error) => {
          this.loading = !this.loading;

          console.log(error);
        });
    }
  },
};
</script>

<style></style>
