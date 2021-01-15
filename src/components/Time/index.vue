<template>
  <el-row>
    <el-col :span="8" class="item">
      <div class="xl-col col-flex">
        <label class="form-label">时间范围:</label>
        <div class="form-control">
          <el-date-picker
            v-model="timeDate"
            type="datetimerange"
            size="small"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="~"
            format="yyyy/MM/dd HH:mm"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :editable="false"
            @change="handleOrdTimeDate"
            :default-time="['00:00:00', '23:59:59']"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import pickerOptions from '../../utils/dataPicker'

export default {
  name: "topTime",
  data() {
    return {
      timeDate: [],
      pickerOptions,
    };
  },
  methods: {
    handleOrdTimeDate() {
        this.$emit('handleOrdTimeDate', this.timeDate)
    },
  },
};
</script>

<style lang="scss" scoped>
</style>