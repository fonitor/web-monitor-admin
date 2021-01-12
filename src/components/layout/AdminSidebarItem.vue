<template>
  <div class="menu-wrapper">
    <el-autocomplete
      class="eboss-menu-search"
      v-model.trim="query.name"
      size="small"
      prefix-icon="el-icon-search"
      :fetch-suggestions="handleMenuQuerySearch"
      placeholder="搜索模块、页面"
      popper-class="eboss-menu-search-autocomplete-suggestion"
      :trigger-on-focus="false"
      @select="handleMenuSelect"
      clearable
    >
      <template slot-scope="{ item }">
        <div>
          <b>{{ item.label }}</b>
          <span>{{ item.resTypeDesc }}({{ item.wholeName }})</span>
        </div>
      </template>
    </el-autocomplete>
    <div class="menu-scroll" ref="ebs-menu-scroll">
      <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :default-active="showActive"
        :default-openeds="openeds"
        :unique-opened="true"
        :collapse="collapse"
      >
        <el-submenu
          v-for="(item, index) in ssoroutes"
          :key="index"
          :index="'' + index"
        >

          <template slot="title">
            <cite class="eb-icon-box">
              <i
                class="eboss-icon-pic default-res-icon"
                v-if="!!!item.thumbnail"
              ></i>
              <i
                class="eboss-icon-pic"
                :style="{ backgroundImage: 'url(' + item.thumbnail + ')' }"
                v-else
              >
              </i>
            </cite>
            <span>{{ item.label }}</span>
          </template>
          <template v-for="child in item.children">
              <template v-if="!child.hidden">
                <!-- 一级页面 && 不存在二级页面 -->
                <el-menu-item
                  :index="'' + child.id"
                  :key="'' + child.id"
                  :data-id="child.id"
                  v-if="!child.pageMenu"
                >
                  <a
                    :href="child.uri"
                    onclick="return false; "
                    @click="jumpUrl(child.id, child.uri, child.label)"
                    :data-uri="child.uri"
                  >
                    {{ child.label }}
                  </a>
                </el-menu-item>
                <!-- 一级页面 && 存在二级页面 -->
                <el-submenu
                  v-if="child.pageMenu"
                  :key="'' + child.id"
                  :index="'' + child.id"
                >
                  <!-- 一级页面菜单标题 -->
                  <template slot="title">{{ child.label }}</template>
                  <template v-for="btn in child.children">
                    <template v-if="!btn.hidden">
                      <el-menu-item :index="'' + btn.id" :key="'' + btn.id">
                        <a
                          :href="btn.uri"
                          onclick="return false; "
                          @click="jumpUrl(btn.id, btn.uri, btn.label)"
                          :data-uri="btn.uri"
                        >
                          {{ btn.label }}
                        </a>
                      </el-menu-item>
                    </template>
                  </template>
                </el-submenu>
              </template>
            </template>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    routes: {
      type: Array,
    },
    collapse: {
      type: Boolean,
    },
  },
  data() {
    return {
      ssoroutes: [], // 路由
      isPermission: false,
      openeds: [],
      showActive: "", // 当前打开菜单id
      query: {
        name: "",
      },
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const routers = this.routes;
      routers.map((item) => {
        if (item.children) {
          item.children.map((sunItem) => {
            // 是否存在子集 页面/按钮级资源
            if (sunItem.children) {
              const isPageMenuArry = sunItem.children.filter(
                (item) => !item.hidden
              );
              if (isPageMenuArry.length > 0) {
                sunItem.pageMenu = true;
              } else {
                sunItem.pageMenu = false;
              }
            } else {
              sunItem.pageMenu = false;
            }
          });
        }
      });
      this.$nextTick(() => {
        this.ssoroutes = routers
      })
    },
    // 菜单模糊搜索
    handleMenuQuerySearch(queryString, cb) {
      console.log(queryString, cb);
    },
    /**
     * 选择搜索菜单内容
     */
    handleMenuSelect(node) {
      console.log(node);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 本地项目路由跳转
    jumprouters(route) {
      // this.$router.push({ path: route.path })
      console.log("========本地项目路由跳转========");
      console.log("path >>> ", route);
    },
  },
};
</script>

<style lang="scss" scoped>
.eboss-menu-search {
  width: 90%;
  position: relative;
  left: 5%;
  .el-input__inner {
    background: #526366;
    border: 1px solid #617477;
  }
}
</style>