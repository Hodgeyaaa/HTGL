<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar :size="50" :src="circleUrl"></el-avatar>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { ref } from "vue";
import store from "@/store";
const circleUrl = ref(
  "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202004%2F14%2F20200414160109_vywth.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647250290&t=cb7b0453e4d3cb48e2f1fd5e35d7a891"
);
const logout = () => {
  store.dispatch("app/logout");
};
</script>

<style lang="scss" scoped></style>
