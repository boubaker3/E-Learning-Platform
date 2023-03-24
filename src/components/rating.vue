<template>
  <div>
    <span
      v-for="n in maxStars"
      :key="n"
      @click="setRating(n)"
      :class="{ 'filled text-base lg:text-2xl': n <= rating }"
    >
      <i class="fa fa-star"></i>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    maxStars: {
      type: Number,
      default: 5,
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    setRating(value) {
      this.$emit("update:rating", value);
    },
  },
};
</script>

<style>
.filled {
  color: orange;
}
</style>
