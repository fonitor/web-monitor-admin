<template>
  <div class="top">
    <div class="title">
      {{title}}<span>{{titleTip}}</span>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableBox",
  props: {
    title: {
        type: String,
        default: ''
    },
    titleTip: {
        type: String,
        default: ''
    }
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
    margin-top: 10px;
  }
}
</style>