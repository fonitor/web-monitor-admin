<template>
  <div class="js-list">
    <el-table :data="jsLists" stripe style="width: 100%">
      <el-table-column prop="errorMessage" label="错误信息" width="300">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            :content="scope.row.errorMessage"
            placement="bottom-end"
          >
            <div>{{scope.row.errorMessage.substr(0, 30)}}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="userId" label="用户"></el-table-column>
      <el-table-column prop="browserVersion" label="版本号"></el-table-column>
      <el-table-column prop="os" label="系统信息"></el-table-column>
      <el-table-column prop="deviceName" label="系统信息"></el-table-column>
      <el-table-column prop="createdAt" label="记录时间"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { jsList } from "../../api/js";

export default {
  name: "jsList",
  props: {
    projectApp: {
      type: [String, Number],
      default: "",
    },
    startTime: {
      type: [String, Number],
      defaule: "2021-01-13 00:00:00",
    },
    endTime: {
      type: [String, Number],
      default: "2021-01-13 23:59:59",
    },
  },
  data() {
    return {
      pageSize: 5,
      page: 1,
      jsLists: [],
      count: 0,
    };
  },
  mounted() {
    if (this.projectApp) {
      this.getJsList();
    }
  },
  methods: {
    // js 错误列表
    async getJsList() {
      let res = await jsList({
        startTime: this.startTime,
        endTime: this.endTime,
        app: this.projectApp,
        pageSize: this.pageSize,
        page: this.page,
      });
      if (!res.success) {
        return;
      }
      this.jsLists = res.model.lists || [];
      this.count = res.model.count || 0;
    },
  },
  watch: {
    projectApp() {
      if (this.projectApp) {
        this.getJsList();
      }
    },
  },
};
</script>

<style lang="scss">
.el-tooltip__popper {
    max-width: 400px;
}
</style>

<style lang="scss" scoped>
.js-list {
  width: 100%;
  height: auto;
  overflow: hidden;
  .message-item {
      width: 500px;
      height: 100px;
  }
}
</style>