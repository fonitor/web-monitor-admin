<template>
  <div class="map-box" ref="myEchart"></div>
</template>

<script>
import echarts from "echarts";
import "../../../node_modules/echarts/map/js/china";

export default {
  name: "DataMap",
  props: {
    data: {},
    showPlaceName: {
        type: Boolean,
        default: false
    }
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.chinaConfigure();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    chinaConfigure() {
      let myChart = echarts.init(this.$refs.myEchart); //这里是为了获得容器所在位置
      myChart.setOption({
        // 进行相关配置
        tooltip: {}, // 鼠标移到图里面的浮动提示框
        dataRange: {
          show: false,
          min: 0,
          max: 1000,
          text: ["High", "Low"],
          realtime: true,
          calculable: true,
          color: ["orangered", "yellow", "lightskyblue"],
        },
        geo: {
          // 这个是重点配置区
          map: "china", // 表示中国地图
          roam: false,
          label: {
            normal: {
              show: this.showPlaceName, // 是否显示对应地名
              textStyle: {
                color: "rgba(0,0,0,0.4)",
              },
            },
          },
          itemStyle: {
            normal: {
              borderColor: "rgba(0, 0, 0, 0.2)",
            },
            emphasis: {
              areaColor: null,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
        series: [
          {
            type: "scatter",
            coordinateSystem: "geo", // 对应上方配置
          },
          {
            name: "报错次数", // 浮动框的标题
            type: "map",
            geoIndex: 0,
            data: this.data.map || [],
          },
        ],
      });
    },
  },
  watch: {
      data() {
          this.chinaConfigure();
      }
  }
};
</script>

<style lang="scss" scoped>
.map-box {
  width: 100%;
  height: 100%;
}
</style>