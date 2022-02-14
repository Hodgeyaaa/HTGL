<template>
  <div>
    <el-dialog
      :model-value="dialogVisible"
      :title="props.dialogTitle"
      width="40%"
      :before-close="handleClose"
      @close="handleClose"
    >
      <el-form ref="formRef" :model="form" label-width="70px" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          v-if="dialogTitle === '添加用户'"
        >
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="handleComfirm">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { defineEmits, defineProps, ref, watch } from "vue";
import { addUser, editUser } from "@/api/users.js";
import { ElMessage } from "element-plus";
import i18n from "@/i18n";

const formRef = ref(null);
const form = ref({
  username: "",
  password: "",
  email: "",
  mobile: "",
});
const rules = ref({
  username: [
    {
      required: true,
      message: "Please input Activity name",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "Please input Activity name",
      trigger: "blur",
    },
  ],
  email: [
    {
      required: true,
      message: "Please input Activity name",
      trigger: "blur",
    },
    {
      type: "email",
      message: "请输入正确邮箱",
      trigger: ["blur", "change"],
    },
  ],
  mobile: [
    {
      required: true,
      message: "Please input Activity name",
      trigger: "blur",
    },
  ],
});
const emits = defineEmits(["update:modelValue", "initUserList"]);
const handleClose = () => {
  emits("update:modelValue", false);
};
const props = defineProps({
  dialogVisible: {
    type: Boolean,
  },
  dialogTitle: {
    type: String,
    default: "",
    required: true,
  },
  dialogTableValue: {
    type: Object,
    default: () => {},
  },
});
watch(
  props.dialogTableValue,
  () => {
    form.value = props.dialogTableValue;
    console.log(form.value);
  },
  { deep: true, immediate: true }
);
const handleComfirm = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      props.dialogTitle === "添加用户"
        ? await addUser(form.value)
        : await editUser(form.value);
      handleClose();
      ElMessage({
        message: i18n.global.t("message.updateSuccess"),
        type: "success",
      });
      emits("initUserList");
    } else {
      console.log("error submit!!");
      return false;
    }
  });
};
</script>

<style></style>
