<template>
  <div class="w-full xl:w-1/2">
    <h1 class="text-primary-variant font-bold">Your Last Sellings</h1>
    <p v-if="amount > 0" class="text-primary-variant font-bold">
      Congrats you sold {{ amount }}$
    </p>
    <p v-if="amount <= 0" class="text-texts">
      unfortunatly you didn't sold anything yet
    </p>
    <div
      v-for="selling in yourSellings"
      class="bg-inputs w-full p-2 rounded-md mt-4 text-texts"
    >
      <div class="flex items-center">
        <div class="w-16 h-16 rounded p-2">
          <router-link :to="{ path: `/profile/${selling.userid}` }">
            <img class="w-full rounded-md" :src="notifPhoto(selling.photo)" />
          </router-link>
        </div>
        <h1 class="font-bold">{{ selling.fullname }}</h1>
        <div class="w-full flex items-center">
          <p class="text-sm ml-2">
            has purshased your {{ selling.title }} course
          </p>
        </div>
        <p class="text-sm font-bold text-primary">
          {{
            new Date(selling.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }}
        </p>
      </div>

      <p class="text-sm text-primary-variant font-bold">
        {{ selling.amount }}$
      </p>
    </div>
    <div
      v-if="totalSellings > 0"
      class="w-full flex items-center justify-center"
    >
      <button
        @click="decrementPage"
        v-if="currentPage > 1"
        class="h-10 text-texts hover:text-gray-800 px-4 py-2 bg-secondary ml-2 rounded"
      >
        prev
      </button>

      <button
        @click="incrementPage"
        v-if="currentPage > Math.ceil(totalSellings / perPage)"
        class="h-10 text-texts hover:text-gray-800 px-4 py-2 bg-secondary ml-2 rounded"
      >
        next
      </button>
    </div>
  </div>
</template>

<script>
import localhost from "../../localhost";
import api from "../axios";
import route from "../router";
export default {
  name: "yourSellings",
  data() {
    return {
      yourSellings: [],
      currentPage: 1,
      perPage: 10,
      totalSellings: 0,
      amount: 0,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      const user = JSON.parse(localStorage.getItem("user"));

      api
        .get(`showSellings?userid=${user.userid}&page=${this.currentPage}`)
        .then((response) => {
          this.yourSellings = response.data.yourSellings;
          this.totalSellings = response.data.yourSellings;
          this.amount = response.data.amount[0].total_amount;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    notifPhoto(photo) {
      return localhost + "photos\\" + photo;
    },

    incrementPage() {
      this.currentPage += 1;
      route.push(`/yoursellings/${this.currentPage}`);
    },
    decrementPage() {
      this.currentPage -= 1;
      route.push(`/yoursellings/${this.currentPage}`);
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
