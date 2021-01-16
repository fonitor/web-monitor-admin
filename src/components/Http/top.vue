<template>
  <div class="top">
    <div class="title">
      HTTP请求整体实时趋势<span>点击曲线可以查看指定时间点的信息</span>
    </div>
    <div class="content">
      <vue-echarts :options="options"></vue-echarts>
    </div>
  </div>
</template>

<script>
import VueEcharts from "../../components/VueEcharts/index";

export default {
  name: "httpTop",
  props: {
    data: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      options: {},
    };
  },
  components: {
    VueEcharts,
  },
  mounted() {
    if (!!this.data && !!this.data.errorLists && !!this.data.successLists) {
      this.setOptions();
    }
  },
  methods: {
    setOptions() {
      let options = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["请求失败数", "请求成功数"],
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
            show: false,
          },
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            name: "请求失败数",
            type: "line",
            stack: "总量",
            data: [],
          },
          {
            name: "请求成功数",
            type: "line",
            stack: "总量",
            data: [],
          },
        ],
      };
      console.log(this.data);
      let xData = [],
        errorLists = this.data.errorLists || [],
        successLists = this.data.successLists || [],
        count = [],
        errorCount = [],
        successCount = [];
      console.log(errorLists);

      errorLists.forEach((v) => {
        xData.push(v.time);
        errorCount.push(v.count);
      });
      successLists.forEach((v) => {
        successCount.push(v.count);
      });
      
      options.series[0].data = errorCount;
      options.series[1].data = successCount;
      options.xAxis.data = xData;
      this.options = options;
    },
  },
  watch: {
    data() {
      if (!!this.data && !!this.data.errorLists && !!this.data.successLists) {
        this.setOptions();
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