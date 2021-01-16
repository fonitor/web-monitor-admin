<template>
  <div class="eboss-container" id="eboss-container">
    <el-aside
      :width="menueWidth"
      class="menu-sidebar"
      :class="{ closed: menuSwitch }"
    >
      <div class="sidebar-container">
        <div class="logowrap">
          <router-link :to="{ path: '/' }" class="logo">
            <span class="logo-mini"></span>
            <span class="logo-lg"></span>
          </router-link>
        </div>
        <sidebar-item
          :routes="permission_routers"
          :collapse="menuSwitch"
        ></sidebar-item>
      </div>
    </el-aside>
    <el-container>
      <el-header :height="headerheight" :class="{ dashboardType: isdashboard }">
        <dl>
          <dd>
            <el-button
              class="eboss-icon-menu"
              id="toggle-menue"
              type="text"
              @click="operateSwitch"
            ></el-button>
          </dd>
          <div class="tab-menue">
            <tab-menue
              :routes="permission_routers"
              v-if="isShowMenue"
            ></tab-menue>
          </div>
          <dt class="box-flex">
            <i class="iconfont icon-user"> </i>
            <span id="welcome_w"> {{ adminName }} </span>
            <div class="global-backlog"></div>
            <el-button
              type="text"
              class="global-refresh el-icon-refresh"
              @click="handleRefresh"
            ></el-button>
            <el-button
              type="text"
              class="eboss-white icon-out"
              @click="loginout"
            >退出</el-button>
          </dt>
        </dl>
      </el-header>
      <eboss-main ref="ebossMain"></eboss-main>
    </el-container>
  </div>
</template>

<script>
import { asyncRouterMap } from "../../router";
import SidebarItem from "./AdminSidebarItem";
import EbossMain from './EbossMain'

export default {
  data() {
    return {
      permission_routers: [
        {
          id: 1,
          label: "项目管理",
          resIcon: "http://missxiaolin.com/project-20210116.png",
          thumbnail: "http://missxiaolin.com/project-20210116.png",
          children: [
            {
              id: 192,
              label: "项目列表",
              check: false,
              riskLevel: 2,
              resType: 2,
              wholeId: "40-192",
              resClassify: 0,
              resClassifyOff: 1,
              hidden: false,
              uri: "/project/list",
            }
          ]
        }
      ],
      menueWidth: "200px",
      headerheight: '50px',
      menuSwitch: false,
      isdashboard: false,
      isShowMenue: false,
      adminName: '小林', // 管理员名称
      newApprovalSign: false,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // this.permission_routers = asyncRouterMap;
    },
    operateSwitch() {
      this.menuSwitch = !this.menuSwitch
      this.menueWidth = this.menuSwitch == false ? '200px' : '64px'
    },
    // 刷新
    handleRefresh() {
      
    },
    loginout() {
      
    }
  },
  components: {
    "sidebar-item": SidebarItem,
    EbossMain
  },
  
};
</script>

<style lang="scss">
.eboss-container {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 1;
  display: flex;
  .menu-sidebar {
    position: relative;

    &.closed {
      .sidebar-container {
        .logowrap {
          a {
            .logo-mini {
              display: block;
            }
            .logo-lg {
              display: none;
            }
          }
        }
      }
    }

    .sidebar-container {
      .logowrap {
        background-color: #334142 !important;
        height: 88px;
        padding: 25px 0 25px;
        a {
          -webkit-transition: width 0.3s ease-in-out;
          -o-transition: width 0.3s ease-in-out;
          transition: width 0.3s ease-in-out;
          display: block;
          display: block;
          span {
            display: block;
            height: 38px;
            background-size: auto 100%;
          }
          &:hover {
            text-decoration: none;
            color: #fff;
          }
          .logo-mini {
            // background: url("https://energymonster.oss-cn-shanghai.aliyuncs.com/frontrs/%E5%B0%8F%E6%80%AA%E5%85%BD.png")
              // no-repeat center;
            background-size: auto 100%;
            display: none;
          }
          .logo-lg {
            // background: url("https://energymonster.oss-cn-shanghai.aliyuncs.com/frontrs/icon.png")
              // no-repeat center;
            background-size: auto 100%;
          }
        }
      }

      .menu-wrapper {
        width: 100%;
        position: absolute;
        top: 88px;
        bottom: 0;
        background-color: #334142 !important;
        overflow: hidden;
        .eboss-menu-search {
          width: 90%;
          position: relative;
          left: 5%;
          .el-input__inner {
            background: #526366;
            border: 1px solid #617477;
          }
        }
        .menu-scroll {
          width: 110%;
          padding-right: 10%;
          position: absolute;
          top: 40px;
          bottom: 0;
          overflow: hidden;
          // overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          // overflow-x: hidden;

          li.el-submenu {
            &.is-opened {
              .el-submenu__title {
                color: #fff;
              }
            }
            .el-menu {
              .el-submenu {
                .el-submenu__title {
                  padding-left: 47px !important;
                  color: #cfe0e7 !important;
                }
                .el-menu-item {
                  padding-left: 55px !important;
                }
              }
            }
          }
          .el-menu-item,
          .el-submenu__title {
            height: 44px;
            line-height: 44px;
            .eb-icon-box {
              width: 14px;
              overflow: hidden;
              height: 44px;
              display: inline-block;
              margin-right: 5px;
              i.eboss-icon-menu {
                transform: scaleX(-1);
                -webkit-transform: scaleX(-1);
                &:before {
                  content: "\e68e";
                }
              }
              i.eboss-icon-pic {
                width: 14px;
                height: 14px;
                display: inline-block;
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                img {
                  width: 14px;
                  display: inline-block;
                }
              }
            }
          }
          .el-menu {
            border-right: 0;
            background-color: #334142 !important;
            .el-menu-item:hover {
              background: #2d3c42;
            }
            .el-submenu__title {
              color: #cfe0e7 !important;
              background: #334142;
              font-size: 13px;
              overflow: hidden;
              width: 100%;
            }
            // .el-icon-arrow-down:before {
            //   content: "\e791" !important;
            //   font-family: "iconfont" !important;
            // }
            .el-menu-item {
              padding-right: 20px !important;
              &.eboss-icon-menu::before {
                content: "\e600";
                color: #b8c7ce;
                padding-right: 5px;
              }

              a {
                color: #b8c7ce !important;
                font-size: 13px;
                padding-left: 7px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 100%;
                &.router-link-exact-active {
                  color: #fff !important;
                }
              }
              &.is-active {
                background: #4c5859;
                a {
                  color: #75ecee !important;
                }
              }
            }
          }
        }
      }
    }
  }
  .el-container {
    position: relative;
    background: #fbfbfb;
    .el-header {
      padding: 0 !important;
      dl {
        @extend .box-flex;
        height: 50px;
        padding: 0 20px;
        background-color: #29c1c2 !important;
        color: #fff;
        line-height: 50px;
        @extend .transition1;
        dd {
          button.eboss-icon-menu {
            &:before {
              content: "\e682";
              color: #fff;
              font-size: 24px;
            }
          }
        }
        dt {
          text-align: right;
          button {
            color: #eee;
            margin-left: 10px;
            &::before {
              font-weight: 600;
            }
            &::after {
              font-family: "iconfont" !important;
              margin-left: 5px;
              font-size: 18px;
              font-weight: 600;
            }
            &.icon-backlog::after {
              content: "\e601";
            }
            &.icon-out::after {
              content: "\e601";
            }
          }
          a {
            color: #fff;
            margin-right: 10px;
          }
        }
      }
      .global-refresh {
        padding: 0 5px;
        color: #fff !important;
        font-size: 18px;
        font-weight: 600;
        span {
          font-weight: 600 !important;
        }
      }
      .tab-menue {
        flex: 1;
        overflow: hidden;
        .tabs-view-container {
          display: flex;
          padding-top: 5px;
          .tabs-menue-list {
            display: flex;
            flex: 1;
            padding: 0 20px;
            &.is-show-arrow {
              padding: 0;
              .menue-btn {
                display: block !important;
              }
            }
            .menue-btn {
              font-size: 18px;
              &::before {
                content: "\e62f";
                display: block;
              }
              &.eb-arrow-left::before {
                transform: rotate(180deg);
              }
            }

            .min-menue-list {
              display: flex;
              width: 0;
              flex: 1;
              padding: 0 10px;
              overflow: hidden;
              .tabs-container {
                display: flex;
                transition: all 200ms;
                padding-top: 13px;
                div {
                  display: flex;
                  transition: all 200ms;
                  .tabs-view {
                    height: 32px;
                    cursor: pointer;
                    position: relative;
                    z-index: 1;
                    border-radius: 10px 10px 0 0;

                    .el-tag {
                      border: 0 !important;
                      cursor: pointer;
                      padding: 0 8px 0 15px !important;
                      height: 32px;
                      line-height: 30px;
                      font-size: 12px;
                      border-radius: 4px 4px 0 0 !important;
                      background: transparent !important;
                      display: block;
                      justify-content: center;
                      display: flex;
                      white-space: nowrap;
                      a {
                        color: #495a5a !important;
                      }
                      span {
                        pointer-events: none;
                        max-width: 120px !important;
                        overflow: hidden;
                        display: block;
                        margin-right: 5px;
                      }
                      .el-icon-close {
                        color: #495a5a !important;
                        right: -1px !important;
                        top: 7px !important;
                        &:hover {
                          background: #fff !important;
                          color: #26d2d3 !important;
                        }
                      }
                      &::before,
                      &::after {
                        content: "";
                        display: block;
                        width: 10px;
                        height: 10px;
                        position: absolute;
                        bottom: 0;
                      }
                    }
                    &:hover {
                      .el-tag {
                        background: #adeeee !important;
                        &::before {
                          left: -10px;
                          background-image: radial-gradient(
                            circle at left top,
                            transparent 10px,
                            #adeeee 10px
                          );
                        }
                        &::after {
                          right: -10px;
                          background-image: radial-gradient(
                            circle at right top,
                            transparent 10px,
                            #adeeee 10px
                          );
                        }
                      }
                      .el-icon-close {
                        &:hover {
                          background: #26d2d3 !important;
                          color: #fff !important;
                        }
                      }
                    }
                    &.active,
                    &.active:hover {
                      z-index: 2;
                      .el-tag {
                        background: #fff !important;
                        color: #29c1c2 !important;
                        &::before {
                          left: -10px;
                          background-image: radial-gradient(
                            circle at left top,
                            transparent 10px,
                            #fff 10px
                          );
                        }
                        &::after {
                          right: -10px;
                          background-image: radial-gradient(
                            circle at right top,
                            transparent 10px,
                            #fff 10px
                          );
                        }
                      }

                      .el-icon-close {
                        color: #26d2d3 !important;
                        &:hover {
                          background: #26d2d3 !important;
                          color: #fff !important;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          .menue-btn {
            color: #fff !important;
            margin: 0 10px;
            display: none;
            &.el-icon-d-arrow-right {
              margin: 0 15px 0 5px;
              i {
                padding-right: 5px;
                transition: all 200ms;
              }
              &::before {
                float: right;
                transform: rotate(90deg);
                transition: all 200ms;
              }
              &.open-arrow::before {
                transform: rotate(270deg);
              }
            }

            &.btn-gray {
              color: #84dede !important;
            }
          }

          @media screen and (max-width: 768px) {
            margin: 0 10px;
            overflow-x: scroll !important;
            -webkit-overflow-scrolling: touch;
            .menue-btn {
              display: none !important;
            }
            .tabs-menue-list {
              .min-menue-list {
                width: auto;
                overflow-x: scroll;
              }
            }
          }
        }
      }

      &.dashboardType {
        dl {
          background: rgba(255, 255, 255, 1) !important;
          dd {
            button.eboss-icon-menu {
              &:before {
                color: #2ac0c2;
              }
            }
          }
          .global-refresh {
            color: #2ac0c2 !important;
          }
          dt {
            color: #3c3c58;
            button {
              color: #2ac0c2 !important;
              margin-left: 10px;
            }
            a {
              color: #2ac0c2 !important;
              margin-right: 10px;
            }
          }
        }
        .tab-menue {
          flex: 1;
          overflow: hidden;
          // &.collapse{ margin-right: 0;}
          .tabs-view-container {
            .menue-btn {
              color: #29c1c2 !important;
              margin: 0 10px;
              &.btn-gray {
                color: #d8e7e7 !important;
                background: none !important;
                border: none !important;
              }
            }
            .min-menue-list {
              .tabs-container {
                div {
                  .tabs-view {
                    &.active,
                    &.active:hover {
                      z-index: 2;
                      background: #26d2d3;
                      .el-tag {
                        background: #29c1c2 !important;
                        a {
                          color: #fff !important;
                        }
                        &::before {
                          left: -10px;
                          background-image: radial-gradient(
                            circle at left top,
                            transparent 10px,
                            #29c1c2 10px
                          );
                        }
                        &::after {
                          right: -10px;
                          background-image: radial-gradient(
                            circle at right top,
                            transparent 10px,
                            #29c1c2 10px
                          );
                        }
                      }
                      .el-icon-close {
                        color: #26d2d3 !important;
                        &:hover {
                          background: #26d2d3 !important;
                          color: #fff !important;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    .el-main {
      position: relative;
      padding: 0;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }
    .el-footer {
      background: #fff;
      border-top: 1px solid #d2d6de;
    }
  }
}
.box-flex {
  display: flex !important;
}
.transition0 {
  transition: all 200ms ease-out;
  -webkict-transition: all 200ms ease-out;
  -moz-transition: all 200ms ease-out;
}
.transition1 {
  transition: all 300ms ease-out;
  -webkict-transition: all 300ms ease-out;
  -moz-transition: all 300ms ease-out;
}
.transition2 {
  transition: all 600ms ease-out;
  -webkict-transition: all 600ms ease-out;
  -moz-transition: all 600ms ease-out;
}
</style>