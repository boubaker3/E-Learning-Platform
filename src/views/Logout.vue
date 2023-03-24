<template>
  <div class="flex">
    <h1 class="text-lg text-texts font-bold">Login out...</h1>
  </div>
</template>

<script>
import api from "../axios";
import route from "../router";
export default {
  name: "logout",
  data() {
    return {};
  },
  mounted() {
    api
      .post(`logout`)
      .then((response) => {
        localStorage.clear();
        route.push("/home/1");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style></style>
