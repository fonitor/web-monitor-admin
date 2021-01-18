<template>
  <div class="http-box">
    <top-time @handleOrdTimeDate="handleOrdTimeDate"></top-time>
    <div class="card">
      <el-row :gutter="24">
        <el-col :span="6" class="item">
          <el-card class="box-card" shadow="always">
            <div class="title">
              <span class="">请求失败数</span>
              <span class="num">{{ httpCountData.errorCount || 0 }}</span>
            </div>
            <div class="data">
              <div class="item">
                <span>日同比</span>
                <span>-</span>
              </div>
              <div class="item">
                <span>日环比</span>
                <span>-</span>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6" class="item">
          <el-card class="box-card" shadow="always">
            <div class="title">
              <span class=""
                >请求成功数({{
                  (
                    httpCountData.successCount /
                    (httpCountData.successCount + httpCountData.errorCount)
                  ).toFixed(2) * 100
                }}%)</span
              >
              <span class="num">{{ httpCountData.successCount || 0 }}</span>
            </div>
            <div class="data">
              <div class="item">
                <span>日同比</span>
                <span>-</span>
              </div>
              <div class="item">
                <span>日环比</span>
                <span>-</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <http-top :data="data"></http-top>
    <div class="http-api-list">
      <table-box title="HTTP请求概况" topHeight="420">
        <div class="page-list">
          <el-table :data="httpLists" stripe style="width: 100%">
            <el-table-column prop="simpleUrl" label="page"></el-table-column>
            <el-table-column prop="httpUrl" label="api" width="400"></el-table-column>
            <el-table-column prop="httpUrlCount" label="请求总数"></el-table-column>
            <el-table-column prop="successCount" label="请求成功数"></el-table-column>
            <el-table-column prop="errorCount" label="请求失败数"></el-table-column>
            <el-table-column label="请求成功率">
              <template slot-scope="scope">
                {{ (scope.row.successCount/scope.row.httpUrlCount).toFixed(2) * 100 }}%
              </template>
            </el-table-column>
            <el-table-column label="请求耗时(毫秒)">
              <template slot-scope="scope">
                {{ (scope.row.loadSumTime/scope.row.httpUrlCount).toFixed(2) }}
              </template>
              
            </el-table-column>
          </el-table>
          <div class="page">
            <el-pagination background layout="prev, pager, next" :page-size="apiPageSize" @current-change="apiPageChange" :total="apiCount">
            </el-pagination>
          </div>
        </div>
      </table-box>
    </div>
  </div>
</template>

<script>
import { httpCount, httpApiLists } from "../../api/http";
import { datTime } from "../../utils/index";
import topTime from "../../components/Time/index";
import httpTop from "../../components/Http/top";
import tableBox from "../../components/Table/index";

export default {
  name: "httpLog",
  components: {
    topTime,
    httpTop,
    tableBox,
  },
  data() {
    return {
      initData: {
        app: "wuc",
        startTime: "",
        endTime: "",
      },
      httpCountData: {},
      data: {},
      httpLists: [],
      apiPageSize: 5,
      apiCount: 0,
      apiPage: 1,
    };
  },
  mounted() {
    let time = datTime();
    this.initData = {
      app: this.$route.query.app,
      startTime: time[0],
      endTime: time[1],
    };
    
    this.init();
  },
  methods: {
    init() {
      this.getHttpCount();
      this.getListApi();
    },
    handleOrdTimeDate() {
      if (!time || time.length <= 0) return;
      this.initData = {
        app: this.initData.app,
        startTime: time[0],
        endTime: time[1],
      };
    },
    // 错误列表概括
    async getListApi() {
      let params = JSON.parse(JSON.stringify(this.initData))
      params.page = this.apiPage
      params.pageSize = this.apiPageSize
      let res = await httpApiLists(params);
      if (!res.success) return
      this.httpLists = res.model.lists
      this.apiCount = res.model.count
      console.log(res.model);
    },
    // 错误列表分页
    apiPageChange(v) {
      this.apiPage = v
      this.getListApi()
    },
    // 统计总数图表
    async getHttpCount() {
      let res = await httpCount(this.initData);
      if (!res.success) return;
      let useData = res.model;
      this.httpCountData = useData.count;
      this.data = {
        errorLists: useData.errorLists,
        successLists: useData.successLists,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.http-box {
  width: 100%;
  height: auto;
  overflow: hidden;
  padding: 20px 30px 0 30px;
  display: flex;
  flex-direction: column;
  .card {
    width: 100%;
    height: auto;
    overflow: hidden;
    margin-top: 10px;
    .title {
      display: flex;
      flex-direction: column;
      span {
        color: rgba(0, 0, 0, 0.7);
        font-size: 14px;
        line-height: 22px;
        height: 22px;
      }
      .num {
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        white-space: nowrap;
        color: #108ee9;
        margin-top: 4px;
        margin-bottom: 0;
        font-size: 30px;
        line-height: 38px;
        height: 38px;
      }
    }
    .data {
      width: 100%;
      height: auto;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      .item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        line-height: 30px;
      }
    }
  }
  .http-api-list {
    width: 100%;
    height: auto;
    overflow: hidden;
    .page-list {
      padding: 0px 10px;
      box-sizing: border-box;
      width: 100%;
      height: auto;
      overflow: hidden;
    }
  }
  .page {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
}
</style>