<template>
  <div id="app">
   <layout></layout>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
    layout: () => import('./components/layout/AdminLayout')
  }
}
</script>

<style>
@import "common/css/common.scss";
</style>
