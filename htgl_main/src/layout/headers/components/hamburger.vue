<template>
  <div class="hamburger-container" @click="toggleClick" id="hamburger">
    <svg-icon :icon="hamburgerIcon"></svg-icon>
  </div>
</template>

<script setup>
import store from "@/store";
import { computed, ref } from "vue";

const toggleClick = () => {
  store.commit("app/changeSiderType");
};
const hamburgerIcon = computed(() => {
  //   return store.state.app.siderType;
  return store.getters.siderType ? "hamburger-opened" : "hamburger-closed";
});
</script>

<style lang="scss" scoped>
.hamburger-container {
  margin-right: 16px;
  box-sizing: border-box;
  cursor: pointer;
}
</style>
