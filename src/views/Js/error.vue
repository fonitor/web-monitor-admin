<template>
  <div class="js-box">
    <top-time @handleOrdTimeDate="handleOrdTimeDate"></top-time>
    <top-header :initData="initData"></top-header>
    <div class="js-content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="错误列表" name="list">
          <js-list v-if="activeName == 'list'" :initData="initData"></js-list>
        </el-tab-pane>
        <el-tab-pane label="错误分布" name="spread">
          <js-spread-count
            :initData="initData"
            v-if="activeName == 'spread'"
          ></js-spread-count>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import jsList from "../../components/Js/list";
import jsSpreadCount from "../../components/Js/spread";
import topHeader from "../../components/Js/top.vue";
import topTime from '../../components/Time/index'

export default {
  name: "jsError",
  components: {
    topHeader,
    jsList,
    jsSpreadCount,
    topTime
  },
  data() {
    return {
      initData: {
        app: "",
        startTime: '',
        endTime: ''
      },
      activeName: "list",
    };
  },
  mounted() {
    this.initData = {
      app: this.$route.query.app,
      startTime: "2021-01-13 00:00:00",
      endTime: "2021-01-13 23:59:59",
    }
  },
  methods: {
    handleClick() {},
    /**
     * 更换时间
     */
    handleOrdTimeDate(time) {
      if (!time || time.length <= 0) return
      this.initData = {
        app: this.initData.app,
        startTime: time[0],
        endTime: time[1]
      }
    }
  },
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