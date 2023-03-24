<template>
  <div class="w-1/2">
    <h1 class="text-lg text-texts font-bold">Notifications</h1>

    <div
      v-for="notif in notifications"
      class="items-center flex bg-inputs w-full p-2 rounded-md mt-4 text-texts"
    >
      <div class="w-16 h-16 rounded p-2">
        <router-link :to="{ path: `/profile/${notif.senderid}` }">
          <img class="w-full rounded-md" :src="notifPhoto(notif.photo)" />
        </router-link>
      </div>
      <h1 class="font-bold">{{ notif.fullname }}</h1>
      <div class="w-full flex items-center">
        <p class="text-sm ml-2">{{ setNotif(notif) }}</p>
        <div
          v-if="notif.type == 'rating'"
          class="ml-2 flex items-center text-md"
        >
          <p class="text-texts font-bold">{{ notif.rating }}</p>
          <i class="fas fa-star text-primary-variant"></i>
        </div>
      </div>
      <p class="text-sm font-bold text-primary">
        {{
          new Date(notif.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        }}
      </p>
    </div>
    <div v-if="totalNotifs > 0" class="w-full flex items-center justify-center">
      <button
        @click="decrementPage"
        v-if="currentPage > 1"
        class="h-10 text-texts hover:text-gray-800 px-4 py-2 bg-secondary ml-2 rounded"
      >
        prev
      </button>

      <button
        @click="incrementPage"
        v-if="currentPage > Math.ceil(totalNotifs / perPage)"
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
  name: "notifications",
  data() {
    return {
      notifications: [],
      notification: "",
      currentPage: 1,
      perPage: 10,
      totalNotifs: 0,
    };
  },
  mounted() {
    this.fetchData();
  },
  watch: {
    $route(from, to) {
      this.fetchData();
    },
  },
  methods: {
    fetchData() {
      const user = JSON.parse(localStorage.getItem("user"));

      api
        .get(`showNotifications?userid=${user.userid}&page=${this.currentPage}`)
        .then((response) => {
          this.notifications = response.data.notifications;
          this.totalNotifs = response.data.totalNotifs;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    notifPhoto(photo) {
      return localhost + "photos\\" + photo;
    },
    setNotif(notif) {
      if (notif.type == "follow") {
        return "followed you";
      } else if (notif.type == "rating") {
        return "rated your course";
      } else {
        return "share a new course";
      }
    },

    incrementPage() {
      this.currentPage += 1;
      route.push(`/notifications/${this.currentPage}`);
    },
    decrementPage() {
      this.currentPage -= 1;
      route.push(`/notifications/${this.currentPage}`);
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
