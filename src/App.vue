<template>
  <div id="app">
    <el-container>
      <Header />
      <div class="box">
        <el-main>
          <router-view></router-view>
        </el-main>
      </div>
    </el-container>
  </div>
</template>

<script>
import Header from './components/Header/index'
export default {
  name: "app",
  
  components: {
    Header
  },
};
</script>

<style lang="scss" scoped>
.box {
  margin-top: 120px;
}
</style>