<template>
  <div class="top">
    <div class="title">
      错误总览<span>点击曲线可以查看指定时间点的异常信息</span>
    </div>
    <div class="header">
      <div class="item">
        <span><i class="el-icon-s-data"></i>错误数</span>
        <span class="num">{{ jsErrorCount }}</span>
      </div>
      <div class="item">
        <span><i class="el-icon-s-data"></i>影响用户数</span>
        <span class="num">{{ errUserCount }}</span>
      </div>
    </div>
    <div class="content">
      <vue-echarts :options="options"></vue-echarts>
    </div>
  </div>
</template>

<script>
import VueEcharts from "../../components/VueEcharts/index";
import { jsCount } from "../../api/js";

export default {
  name: "jsTop",
  props: {
    initData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      errUserCount: 0,
      jsErrorCount: 0,
      options: {},
    };
  },
  components: {
    VueEcharts,
  },
  mounted() {
    if (this.initData && !!this.initData.app) {
      this.getJsCount();
    }
  },
  methods: {
    // js 图表
    async getJsCount() {
      let options = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["错误数"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [], // x轴坐标data
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: "错误数",
            type: "line",
            stack: "总量",
            data: [],
          },
        ],
      };
      let res = await jsCount({
        app: this.initData.app,
        startTime: this.initData.startTime,
        endTime: this.initData.endTime,
      });
      if (!res.success) {
        return;
      }
      let useData = res.model;
      this.errUserCount = useData.errUserCount;
      this.jsErrorCount = useData.jsErrorCount;
      let xData = [],
        errorCount = [];
      useData.jsCount.forEach((v) => {
        xData.push(v.time);
        errorCount.push(v.count);
      });
      options.xAxis.data = xData;
      options.series[0].data = errorCount;
      this.options = options;
    },
  },
  watch: {
    initData() {
      if (this.initData && !!this.initData.app) {
        this.getJsCount();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.top {
  border: 1px solid #ddd;
  margin: 10px 0 5px;
  width: 100%;
  height: 344px;
  background-color: #fdfdfd;
  display: flex;
  flex-direction: column;
  .title {
    background-color: #f8f8f8;
    height: 40px;
    width: 100%;
    padding-left: 15px;
    line-height: 40px;
    font-weight: 700;
    span {
      margin-left: 10px;
      font-weight: 400;
      font-size: 10px;
    }
  }
  .header {
    width: 100%;
    height: 112px;
    display: flex;
    justify-content: center;
    .item {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .num {
        font-size: 40px;
        font-weight: 700;
      }
    }
  }
  .content {
    flex: 1;
  }
}
</style>