<template>
  <div class="http-box">
    <top-time @handleOrdTimeDate="handleOrdTimeDate"></top-time>
    <div class="card">
      <el-row :gutter="24">
        <el-col :span="6" class="item">
          <el-card class="box-card" shadow="always">
            <div class="title">
              <span class="">请求失败数</span>
              <span class="num">{{ httpCountData.errorCount || 0 }}</span>
            </div>
            <div class="data">
              <div class="item">
                <span>日同比</span>
                <span>-</span>
              </div>
              <div class="item">
                <span>日环比</span>
                <span>-</span>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6" class="item">
          <el-card class="box-card" shadow="always">
            <div class="title">
              <span class="">请求成功数({{(httpCountData.successCount / (httpCountData.successCount + httpCountData.errorCount)).toFixed(2) * 100}}%)</span>
              <span class="num">{{ httpCountData.successCount || 0 }}</span>
            </div>
            <div class="data">
              <div class="item">
                <span>日同比</span>
                <span>-</span>
              </div>
              <div class="item">
                <span>日环比</span>
                <span>-</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <http-top :data="data"></http-top>
  </div>
</template>

<script>
import { httpCount } from "../../api/http";
import { datTime } from "../../utils/index";
import topTime from "../../components/Time/index";
import httpTop from '../../components/Http/top'

export default {
  name: "httpLog",
  components: {
    topTime,
    httpTop
  },
  data() {
    return {
      initData: {
        app: "wuc",
        startTime: "",
        endTime: "",
      },
      httpCountData: {},
      data: {}
    };
  },
  mounted() {
    let time = datTime();
    this.initData = {
      app: this.$route.query.app,
      startTime: time[0],
      endTime: time[1],
    };
    this.init();
  },
  methods: {
    init() {
      this.getHttpCount();
    },
    handleOrdTimeDate() {
      if (!time || time.length <= 0) return;
      this.initData = {
        app: this.initData.app,
        startTime: time[0],
        endTime: time[1],
      };
    },
    async getHttpCount() {
      let res = await httpCount(this.initData);
      if (!res.success) return;
      let useData = res.model;
      console.log(useData);
      this.httpCountData = useData.count;
      this.data = {
        errorLists: useData.errorLists,
        successLists: useData.successLists,
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.http-box {
  width: 100%;
  height: auto;
  overflow: hidden;
  padding: 20px 30px 0 30px;
  display: flex;
  flex-direction: column;
  .card {
    width: 100%;
    height: auto;
    overflow: hidden;
    margin-top: 10px;
    .title {
      display: flex;
      flex-direction: column;
      span {
        color: rgba(0, 0, 0, 0.7);
        font-size: 14px;
        line-height: 22px;
        height: 22px;
      }
      .num {
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        white-space: nowrap;
        color: #108ee9;
        margin-top: 4px;
        margin-bottom: 0;
        font-size: 30px;
        line-height: 38px;
        height: 38px;
      }
    }
    .data {
      width: 100%;
      height: auto;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      .item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        line-height: 30px;
      }
    }
  }
}
</style>