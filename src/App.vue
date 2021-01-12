<template>
  <div id="main">
   <layout></layout>
  </div>
</template>

<script>
import { getCookie } from './common/js/utils'
export default {
  name: 'ebs',
  data() {
    
  },
  mounted() {
  },
  components: {
    layout: () => import('./components/layout/AdminLayout')
  }
}
</script>

<style>
@import "common/css/common.scss";
</style>
