<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
      <span class="no-redirect" v-if="breadcrumbList.length - 1 === index">{{
        $t(`menus.${item.name}`)
      }}</span>
      <span class="redirect" v-else @click="handleRedirect(item.path)">{{
        $t(`menus.${item.name}`)
      }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { watch, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const breadcrumbList = ref([]);
const initbreadcrumbList = () => {
  breadcrumbList.value = route.matched;
  console.log(route.matched);
};
// 不是最后一个点击可以跳转
const handleRedirect = (path) => {
  useRouter().push(path);
};
// 监听路由表route
watch(
  route,
  () => {
    initbreadcrumbList();
  },
  { deep: true, immediate: true }
);
</script>

<style lang="scss" scoped>
.no-redirect {
  color: #97a8be;
  cursor: text;
}
.redirect {
  color: #666;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    color: $menuBg;
  }
}
</style>
