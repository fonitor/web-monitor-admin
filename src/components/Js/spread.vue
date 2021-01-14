<template>
  <div>错误分布</div>
</template>

<script>
export default {
  name: "jsSpreadCount",
  props: {
    projectApp: {
      type: [String, Number],
      default: "",
    },
    startTime: {
      type: [String, Number],
      defaule: "2021-01-13 00:00:00",
    },
    endTime: {
      type: [String, Number],
      default: "2021-01-13 23:59:59",
    },
  },
  data: {},
};
</script>

<style lang="scss" scoped>
</style>