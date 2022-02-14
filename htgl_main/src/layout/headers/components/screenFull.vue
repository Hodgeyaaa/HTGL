<template>
  <div id="screen">
    <svg-icon :icon="isFullIcon" @click="handleScreenFull"></svg-icon>
  </div>
</template>

<script setup>
import screenfull from "screenfull";
import { ref, onMounted, onBeforeMount } from "vue";
// const isFullIcon = ref(screenfull.isFullscreen);
const isFullIcon = ref("fullscreen");
const handleScreenFull = () => {
  if (screenfull.isEnabled) {
    screenfull.toggle();
  }
  if (screenfull.isFullscreen) {
    isFullIcon.value = "fullscreen";
  } else {
    isFullIcon.value = "exit-fullscreen";
  }
  //   isFullIcon.value = screenfull.isFullscreen;
  //   console.log("dd", isFullIcon);
};
// const changeIcon = () => {
//   isFullIcon.value = screenfull.isFullscreen;
// };
// onMounted(() => {
//   screenfull.on("change", changeIcon);
// });
// onBeforeMount(() => {
//   screenfull.off("change");
// });
</script>

<style></style>
