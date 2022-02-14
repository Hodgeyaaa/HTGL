<template>
  <el-dropdown @command="toggleLanguage">
    <span class="el-dropdown-link">
      切换语言
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="currentLanguage === 'zh'" command="zh"
          >中文</el-dropdown-item
        >
        <el-dropdown-item :disabled="currentLanguage === 'en'" command="en"
          >English</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import store from "@/store";
const i18n = useI18n();
const currentLanguage = computed(() => {
  return i18n.locale.value;
});
const toggleLanguage = (val) => {
  i18n.locale.value = val;
  store.commit("app/changeLang", val);
};
</script>

<style></style>
