<template>
  <div :class="[className, 'echarts-box']"></div>
</template>

<script>
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
    this.initChart();
  },
  methods: {
    initChart() {
      setTimeout(() => {
        if (!this.chart) {
          this.dom = document.getElementsByClassName(this.className)[0];
          this.chart = this.$echarts.init(this.dom);
        }
        if (!!this.options) {
          this.chart.setOption(this.options);
        }
      }, 300);
    },
  },
  watch: {
    options: function(){
      this.initChart();
    },
  },
};
</script>

<style lang="scss" scoped>
.echarts-box {
  width: 100%;
  height: 100%;
  div {
    width: 100%;
    height: 100%;
  }
}
.echarts {
  width: 100%;
  height: 100%;
}
</style>
