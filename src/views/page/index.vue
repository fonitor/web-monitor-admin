<template>
  <div class="page-index">
    <top-time @handleOrdTimeDate="handleOrdTimeDate"></top-time>
    <div class="card">
      <el-row :gutter="24">
        <el-col :span="6" class="item">
          <el-card class="box-card" shadow="always">
            <div class="title">
              <span class="">页面访问量</span>
              <span class="num">{{ pageCountData.pvCount || 0 }}</span>
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
              <span class="">页面访问人数</span>
              <span class="num">{{ pageCountData.uvCount || 0 }}</span>
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
    <page-top :data="data"></page-top>
  </div>
</template>

<script>
import topTime from "../../components/Time/index";
import pageTop from "../../components/Page/top";
import { datTime } from "../../utils/index";
import { pageTrend } from "../../api/page";

export default {
  name: "pageIndex",
  components: {
    topTime,
    pageTop
  },
  data() {
    return {
      initData: {
        app: "wuc",
        startTime: "",
        endTime: "",
      },
      pageCountData: {},
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
      this.getCount()
    },
    handleOrdTimeDate() {
      if (!time || time.length <= 0) return;
      this.initData = {
        app: this.initData.app,
        startTime: time[0],
        endTime: time[1],
      };
      this.init()
    },
    async getCount() {
      let res = await pageTrend(this.initData)
      if (!res.success) return;
      let useData = res.model;
      this.pageCountData = useData.count;
      this.data = {
        pvLists: useData.pvLists,
        uvLists: useData.uvLists,
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.page-index {
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