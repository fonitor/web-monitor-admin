<template>
  <div :class="[className, 'echarts-box']"></div>
</template>

<script>
import Echarts from "echarts";
import { generateUUID } from "../../utils/index";

export default {
  name: "VueEcharts",
  props: {
    options: Object,
    theme: [String, Object],
  },
  data() {
    return {
      chart: null,
      dom: null,
      className: null,
    };
  },
  mounted() {
    this.className = `echarts-${generateUUID()}`;
  },
  methods: {
    initChart() {
      if (!this.chart) {
        this.dom = document.getElementsByClassName(className)[0];
        this.chart = Echarts.init(dom, ctx.theme);
      }
      if (ctx.options) {
        this.chart.setOption(ctx.options);
      }
    },
  },
  watch: {
    options: () => {
      this.initChart();
    },
  },
};
</script>

<style lang="scss" scoped>
.echarts-box {
  width: 100%;
  height: 100%;
}
</style>
