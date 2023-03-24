<template>
  <div class="progress-bar" :style="{ display: loading ? 'block' : 'none' }">
    <div class="progress-bar-fill"></div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style>
.progress-bar {
  width: 100%;
  height: 2px;
  background-color: rgb(39, 39, 39);
}

.progress-bar-fill {
  height: 2px;
  background-color: rgb(34, 140, 39);
  width: 0%;
  box-shadow: 10px 10px 8px rgba(34, 140, 39, 0.5);

  animation: progress-animation 1s infinite ease-in-out;
}

@keyframes progress-animation {
  0% {
    width: -100%;
  }
  100% {
    width: 100%;
  }
}
</style>
