<template>
  <div class="project-box">
    <div class="top-box">
      <el-button size="mini" type="primary" @click="goAddProject"
        >添加</el-button
      >
      <el-dialog
        title="添加项目"
        :modal-append-to-body="false"
        :visible.sync="dialogFormVisible"
        :modal="true"
      >
        <el-form :model="form">
          <el-form-item label="项目名称" :label-width="formLabelWidth">
            <el-input v-model="form.app" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="项目类型" :label-width="formLabelWidth">
            <el-select v-model="form.projectType" placeholder="请选择项目类型">
              <el-option label="web" value="1"></el-option>
              <el-option label="微信" value="2"></el-option>
              <el-option label="支付宝" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveProject">确 定</el-button>
        </div>
      </el-dialog>
    </div>
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
            <el-button size="mini" @click="goPath('/js/error', scope.row)"
              >js诊断</el-button
            >
            <el-button size="mini" @click="goPath('/http/log', scope.row)"
              >API请求</el-button
            >
            <el-button size="mini" @click="goPath('/page/index', scope.row)"
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
import { projectList, projectSave } from "../../api/project";

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
      form: {
        app: "",
        projectType: "",
      },
      formLabelWidth: "120px",
      dialogFormVisible: false,
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
    // 分页
    pageChange(v) {
      this.query.page = v;
      this.getList();
    },
    /**
     * 跳转
     */
    goPath(path, item) {
      this.$router.push({
        path,
        query: {
          app: item.app,
        },
      });
    },
    goAddProject() {
      this.dialogFormVisible = true;
    },
    async saveProject() {
      let res = await projectSave(this.form);
      this.form = {
        app: "",
        projectType: "",
      };
      this.dialogFormVisible = false;
      this.getList();
    },
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