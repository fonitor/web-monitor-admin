<template>
  <div class="js-box">
    <top-header :projectApp="app"></top-header>
    <div class="js-content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="错误列表" name="list">
          <js-list :projectApp="app"></js-list>
        </el-tab-pane>
        <el-tab-pane label="错误分布" name="spread">错误分布</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import jsList from '../../components/Js/list'
import topHeader from '../../components/Js/top.vue';

export default {
  name: "jsError",
  components: {
    topHeader,
    jsList
  },
  data() {
    return {
      app: "",
       activeName: 'list'
    };
  },
  mounted() {
    this.app = this.$route.query.app;
  },
  methods: {
    handleClick() {
      
    }
  }
};
</script>

<style lang="scss" scoped>
.js-box {
  width: 100%;
  height: auto;
  overflow: hidden;
  padding: 20px 30px 0 30px;
  display: flex;
  flex-direction: column;
  .js-content {
    flex: 1;
  }
}
</style>