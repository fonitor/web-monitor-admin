<template>
  <div class="spread-box">
    <div>JsError上报UA占比（版本号、操作系统、手机型号）</div>
    <div class="data">
      <el-row>
        <el-col :span="8" class="item">
          <vue-echarts :options="versionErrorOptios"></vue-echarts>
        </el-col>
        <el-col :span="8" class="item">
          <vue-echarts :options="osErrorOptions"></vue-echarts>
        </el-col>
        <el-col :span="8" class="item">
          <vue-echarts :options="deviceErrorOptions"></vue-echarts>
        </el-col>
      </el-row>
    </div>
    <div class="data-map">
      <div class="left">
        <div class="item" v-for="(item, index) in mapData.map || []" v-bind:key="index">
          <div class="province">{{item.name}}</div>
          <div class="item-data">{{(item.value / mapData.count).toFixed(2) * 100}}%</div>
        </div>
      </div>
      <div class="right">
        <data-map :data="mapData"></data-map>
      </div>
    </div>
  </div>
</template>

<script>
import VueEcharts from "../../components/VueEcharts/index";
import DataMap from "../Map/index";
import { jsSpread } from "../../api/js";

export default {
  name: "jsSpreadCount",
  props: {
    projectApp: {
      type: [String, Number],
      default: "",
    },
    startTime: {
      type: [String, Number],
      default: "2021-01-13 00:00:00",
    },
    endTime: {
      type: [String, Number],
      default: "2021-01-13 23:59:59",
    },
  },
  components: {
    VueEcharts,
    DataMap,
  },
  data() {
    return {
      versionErrorOptios: {},
      osErrorOptions: {},
      deviceErrorOptions: {},
      mapData: {},
    };
  },
  mounted() {
    this.getSpread();
  },
  methods: {
    async getSpread() {
      if (!this.projectApp) return;
      let res = await jsSpread({
        app: this.projectApp,
        startTime: this.startTime,
        endTime: this.endTime,
      });
      if (!res.success) return;
      let useData = res.model;
      let initOption = {
        title: {
          left: "33%",
          top: "44%",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        series: [
          {
            type: "pie",
            radius: ["50%", "70%"],
            center: ["40%", "50%"],
            data: useData.versionError,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      initOption.title.text = "版本号";
      initOption.series[0].data = useData.versionError;
      this.versionErrorOptios = JSON.parse(JSON.stringify(initOption));
      initOption.title.text = "操作系统";
      initOption.title.left = "32%";
      initOption.series[0].data = useData.osError;
      this.osErrorOptions = JSON.parse(JSON.stringify(initOption));
      initOption.title.text = "手机型号";
      initOption.title.left = "32%";
      initOption.series[0].data = useData.deviceError;
      this.deviceErrorOptions = JSON.parse(JSON.stringify(initOption));
      this.mapData = {
        map: useData.provinceError,
        count: useData.errorCount,
      };
    },
  },
  watch: {
    projectApp() {
      if (this.projectApp) {
        this.getSpread();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.spread-box {
  width: 100%;
  height: auto;
  overflow: hidden;
  .data {
    width: 100%;
    height: 250px;
    overflow: hidden;
    margin-top: 20px;
    .item {
      height: 250px;
    }
  }
  .data-map {
    width: 100%;
    min-height: 300px;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    .left,
    .right {
      width: 50%;
      min-height: 300px;
    }
    .left {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      .item {
        width: 70px;
        margin: 10px;
        height: 70px;
        overflow: hidden;
        text-align: center;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        font-variant: tabular-nums;
        line-height: 1.5;
        list-style: none;
        font-feature-settings: "tnum";
        .province {
          padding-bottom: 5px;
        }
        .item-data {
          padding-top: 5px;
          font-size: 18px;
          font-weight: 700;
          border-top: 1px solid #ddd;
        }
      }
    }
  }
}
</style>