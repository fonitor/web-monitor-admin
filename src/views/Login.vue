<template>
  <div class="login-backdrop">
    <div class="user-login">
      <h2>登录平台</h2>
      <ul>
        <li>
          <el-input
            placeholder="请输入账号"
            v-model.trim="account"
            name="username"
            clearable
          >
          </el-input>
        </li>
        <li>
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model.trim="password"
            clearable
          >
          </el-input>
        </li>
      </ul>
      <el-button type="primary" class="login-system" @click="loginSystem"
        >登录</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      account: "", // 账号
      password: "", // 密码
      refshUrl: "", // 回传url
    };
  },
  mounted() {
    this.refshUrl = this.$route.query.url || ""
  },
  components: {},
  methods: {
    loginSystem() {
      if (this.account.length == 0) {
        this.$alert("请输入账号", "提示", { showClose: false });
        return;
      }
      if (this.password.length == 0) {
        this.$alert("请输入密码", "提示", { showClose: false });
        return;
      }
    },
  },
};
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}
/*登陆*/
.login-backdrop {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
  background: #29c1c2;
  .user-login {
    width: 25%;
    min-width: 450px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%);
    padding: 30px 50px;
    background: #fff;
    border-radius: 4px;
    h2 {
      width: 100%;
      text-align: center;
      font-size: 22px;
      line-height: 40px;
      padding-bottom: 20px;
      font-weight: bold;
    }
    ul {
      li {
        display: flex;
        padding: 10px 0;
        input {
          flex: 1;
        }

        button {
          width: 120px;
          margin-left: 15px;
          margin-top: 0;
        }
      }
    }
  }
  button.login-system {
    width: 100%;
    margin-top: 15px;
    letter-spacing: 3px;
    line-height: 44px;
    font-size: 17px;
  }

  h6 {
    padding-top: 15px;
    text-align: right;
    a {
      line-height: 20px;
      color: #29c1c2;
      &:hover {
        color: #409eff;
      }
    }
  }
}
</style>