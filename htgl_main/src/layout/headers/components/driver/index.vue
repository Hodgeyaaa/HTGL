<template>
  <div id="guide" @click.prevent.stop="handleGuide">
    <svg-icon icon="guide"></svg-icon>
  </div>
</template>

<script setup>
import Driver from "driver.js";
import "driver.js/dist/driver.min.css";
import { onMounted } from "vue";
import { steps } from "./steps";
import i18n from "@/i18n";
import { watch } from "vue";
import store from "@/store";

const t = i18n.global.t;

let driver;

//等dom加载完成后在创建driver对象
onMounted(() => {
  initDriver();
  // console.log(store.state.app.lang);
});
const initDriver = () => {
  driver = new Driver({
    animate: false, // 是否动画
    opacity: 0.75, // 背景不透明度 (0 表示只有 popovers 而没有overlay)
    padding: 10, // 元素到边缘的距离
    allowClose: true, // 点击覆盖是否应该关闭
    overlayClickNext: false, // 点击覆盖是否应该移动下一个
    doneBtnText: t("driver.doneBtnText"), // 最后一个按钮上的文本
    closeBtnText: t("driver.closeBtnText"), // 这一步的关闭按钮上的文本
    stageBackground: "#ffffff", // 背景颜色对于舞台后面突出显示的元素
    nextBtnText: t("driver.nextBtnText"), // 此步骤的下一个按钮文本
    prevBtnText: t("driver.prevBtnText"), // 此步骤的上一个按钮文本
  }); //粘贴github中的配置对象
};
const handleGuide = () => {
  driver.defineSteps(steps(t));
  driver.start();
};
// 监听语言的变化
watch(
  () => store.state.app.lang,
  () => {
    initDriver();
  },
  { deep: true }
);
</script>

<style></style>
