<template>
  <div class="project-box">
    <!-- <top-time @handleOrdTimeDate="handleOrdTimeDate"></top-time> -->
    <div class="list-box">
      <el-table :data="projectLists" stripe style="width: 100%">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="app" label="项目"></el-table-column>
        <el-table-column prop="projectType" label="系统信息">
          <template slot-scope="scope">
            <div>
              {{
                scope.row.projectType == 1
                  ? "web"
                  : scope.row.projectType == 2
                  ? "微信"
                  : "支付宝"
              }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="goPath('/js/error', scope.row)"
              >js诊断</el-button
            >
            <el-button
              size="mini"
              type="success"
              @click="goPath('/http/log', scope.row)"
              >API请求</el-button
            >
            <el-button
              size="mini"
              type="success"
              @click="goPath('/page/index', scope.row)"
              >总览</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="query.pageSize"
        @current-change="pageChange"
        :total="count"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import topTime from "../../components/Time/index";
import { projectList } from "../../api/project";

export default {
  name: "projectList",
  components: {
    topTime,
  },
  data() {
    return {
      query: {
        pageSize: 15,
        page: 1,
      },
      projectLists: [],
      count: 0,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    handleOrdTimeDate(time) {},
    /**
     * 列表
     */
    async getList() {
      let res = await projectList(this.query);
      if (!res.success) return;
      this.projectLists = res.model.lists;
      this.count = res.model.count;
    },
    pageChange(v) {
      this.query.page = v;
      this.getList()
    },
    goPath(path, item) {
        this.$router.push({
            path,
            query: {
                app: item.app
            }
        })
    }
  },
};
</script>

<style lang="scss" scoped>
.project-box {
  width: 100%;
  height: auto;
  overflow: hidden;
  padding: 20px 30px 0 30px;
  display: flex;
  flex-direction: column;
  .list-box {
    margin-top: 20px;
  }
  .page {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
}
</style>