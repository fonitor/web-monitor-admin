<template>
  <el-header class="header">
    <el-row class="header-box">
      <el-col :span="20">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <div class="header-right">
          <router-link to="/">首页</router-link>
          <router-link to="/">用户</router-link>
          <el-dropdown class="err" @command="handleCommand">
            <span class="el-dropdown-link">
              错误<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" >
              <el-dropdown-item command='/js/error'>js 错误统计</el-dropdown-item>
              <el-dropdown-item>api 接口统计</el-dropdown-item>
              <el-dropdown-item>静态资源错误统计</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown class="err">
            <span class="el-dropdown-link">
              性能<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>接口耗时分析</el-dropdown-item>
              <el-dropdown-item>页面性能分析</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
export default {
  name: "xlHeader",
  data() {
    return {
      options: [
        {
          value: "1",
          label: "项目1",
        },
        {
          value: "2",
          label: "项目1",
        },
      ],
      value: "",
    };
  },
  methods: {
    /**
     * 跳转
     */
    handleCommand(path) {
      this.$router.push({
        path
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  background: #ffffff;
  width: 100%;
  height: 120px;
  overflow: hidden;
  box-shadow: 0 2px 0 rgba(37, 11, 54, 0.04);
  position: fixed;
  left: 0;
  top: 0;
  .header-box {
    margin-top: 20px;
  }
  .header-right {
    color: #493e54;
    margin-top: 20px;
    display: flex;
    line-height: 80px;
    a {
      display: flex;
      color: #493e54;
      margin-right: 25px;
      font-size: 36px;
    }
    .err {
      margin-right: 25px;
      .el-dropdown-link {
        font-size: 36px;
        color: #493e54;
      }
    }
  }
}
</style>