<template>
  <div id="app">
    <el-container>
      <Header />
      <el-main>
        <router-view></router-view>
      </el-main>
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

</style>