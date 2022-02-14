<template>
  <div>
    <el-card>
      <el-row :gutter="20" class="header">
        <el-col :span="8">
          <el-input
            :placeholder="$t('table.placeholder')"
            clearable
            v-model="queryForm.query"
          ></el-input>
        </el-col>
        <el-button type="primary" :icon="Search" @click="getUserList">{{
          $t("table.search")
        }}</el-button>
        <el-button type="primary" @click="handleDialogValue()">{{
          $t("table.adduser")
        }}</el-button>
      </el-row>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column
          :prop="item.prop"
          :label="$t(`table.${item.label}`)"
          v-for="(item, index) in options"
          :key="index"
          :width="item.width"
        >
          <template v-slot="{ row }" v-if="item.prop === 'mg_state'">
            <el-switch v-model="row.mg_state" @change="changeState(row)" />
          </template>
          <template v-slot="{ row }" v-else-if="item.prop === 'create_time'">
            {{ filterTime(row.create_time) }}
          </template>
          <template #default="{ row }" v-else-if="item.prop === 'action'">
            <el-button
              type="primary"
              size="small"
              :icon="EditPen"
              @click="handleDialogValue(row)"
            ></el-button>
            <el-button type="warning" size="small" :icon="Setting"></el-button>
            <el-button
              type="danger"
              size="small"
              :icon="Delete"
              @click="delUser(row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:currentPage="queryForm.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryForm.pagesize"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-card>

    <!-- <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="30%"
      :before-close="handleClose"
    >
      <span>This is a message</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >Confirm</el-button
          >
        </span>
      </template>
    </el-dialog> -->
    <Dialog
      v-model="dialogVisible"
      :dialogVisible="dialogVisible"
      :dialogTitle="dialogTitle"
      :dialogTableValue="dialogTableValue"
      v-if="dialogVisible"
      @initUserList="getUserList"
    />
  </div>
</template>

<script setup>
import { Search, EditPen, Setting, Delete } from "@element-plus/icons-vue";
import { ref } from "vue";
import { userList, changeUserState } from "@/api/users.js";
import { ElMessage, ElMessageBox } from "element-plus";
import { useI18n } from "vue-i18n";
import Dialog from "./components/dialog.vue";
import { deleteUser } from "@/api/users.js";
const i18n = useI18n();
const queryForm = ref({
  query: "",
  pagenum: 1,
  pagesize: 5,
});
const tableData = ref([]);
const total = ref(0);
const dialogVisible = ref(false);
const dialogTitle = ref("");
const dialogTableValue = ref({});
const getUserList = async () => {
  const res = await userList(queryForm.value);
  tableData.value = res.users;
  total.value = res.total;
  console.log(tableData.value);
};
getUserList();

const handleSizeChange = (pageSize) => {
  queryForm.value.pagenum = 1;
  queryForm.value.pagesize = pageSize;
  getUserList();
};
const handleCurrentChange = (pageNum) => {
  queryForm.value.pagenum = pageNum;
  getUserList();
};

const options = [
  {
    label: "username",
    prop: "username",
    width: "200",
  },
  {
    label: "email",
    prop: "email",
  },
  {
    label: "mobile",
    prop: "mobile",
  },
  {
    label: "role_name",
    prop: "role_name",
  },
  {
    label: "mg_state",
    prop: "mg_state",
    width: "150",
  },
  {
    label: "create_time",
    prop: "create_time",
  },
  {
    label: "action",
    prop: "action",
    width: "300",
  },
];
// 处理时间dayjs
const dayjs = require("dayjs");
const filterTime = (val, format = "YYYY-MM-DD") => {
  if (!val || JSON.stringify(val) === "{}" || JSON.stringify(val) === "[]") {
    return "--";
  } else {
    val = parseInt(val) * 1000;
    return dayjs(val).format(format);
  }
};
// 可以使用全局属性：app.config.globalProperties，放到全局

// 改变用户状态
const changeState = async (info) => {
  await changeUserState(info.id, info.mg_state);
  ElMessage({
    message: i18n.t("message.updateSuccess"),
    type: "success",
  });
};
// 添加用户弹框

const handleDialogValue = (info) => {
  if (info) {
    dialogTitle.value = "编辑用户";
    dialogTableValue.value = JSON.parse(JSON.stringify(info));
  } else {
    dialogTitle.value = "添加用户";
  }
  dialogVisible.value = true;
};
const delUser = (info) => {
  ElMessageBox.confirm(
    i18n.t(`dialog.deleteTitle`) + "  " + info.username,
    "Warning",
    {
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      type: "warning",
    }
  )
    .then(async () => {
      ElMessage({
        type: "success",
        message: "Delete completed",
      });
      await deleteUser(info);
      getUserList();
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled",
      });
    });
};
</script>

<style lang="scss" scoped>
.header {
  padding-bottom: 20px;
  box-sizing: border-box;
  ::v-deep .el-input__suffix {
    align-items: center;
  }
}
::v-deep .el-pagination {
  padding-top: 20px;
  box-sizing: border-box;
  text-align: right;
}
</style>
