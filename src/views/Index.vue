<template>
  <div class="index-box">
      <div class="create-box">
        <div class="card-header">创建应用</div>
        <div class="card-body">
          <i class="el-icon-plus"></i>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'Index',
  components: {
  }
}
</script>

<style lang="scss" scoped>
.index-box {
  width: 100%;
  height: auto;
  display: flex;
  margin-right: 40px;
  .create-box {
    width: 1000px;
    height: 600px;
    opacity: .5;
    box-shadow: 8px 8px 24px 0 rgba(92,92,92,.28);
    display: flex;
    flex-direction: column;
    .card-header {
      height: 80px;
      padding: 0 40px;
      margin-top: 20px;
    }
    .card-body {
      flex: 1;
      display: flex;
      text-align:center;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      i {
        font-size: 160px;
      }
    }
  }
}
</style>