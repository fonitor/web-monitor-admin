<template>
  <table-box
    title="访问趋势图"
  >
    <vue-echarts :options="options"></vue-echarts>
  </table-box>
</template>

<script>
import VueEcharts from "../../components/VueEcharts/index";
import tableBox from "../Table/index";

export default {
  name: "pageTop",
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
    tableBox,
  },
  mounted() {
    if (!!this.data && !!this.data.pvLists && !!this.data.uvLists) {
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
          data: ["pv", "uv"],
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
            name: "pv",
            type: "line",
            stack: "总量",
            data: [],
          },
          {
            name: "uv",
            type: "line",
            stack: "总量",
            data: [],
          },
        ],
      };
      let xData = [],
        pvLists = this.data.pvLists || [],
        uvLists = this.data.uvLists || [],
        count = [],
        pvCount = [],
        uvCount = [];

      pvLists.forEach((v) => {
        xData.push(v.time);
        console.log(v.count)
        pvCount.push(v.count);
      });
      uvLists.forEach((v) => {
        uvCount.push(v.count);
      });

      options.series[0].data = pvCount;
      options.series[1].data = uvCount;
      options.xAxis.data = xData;
      this.options = options;
    },
  },
  watch: {
    data() {
      if (!!this.data && !!this.data.pvLists && !!this.data.uvLists) {
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
  min-height: 344px;
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