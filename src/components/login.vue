<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/login.html">会员登录</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <div class="nav-tit">
            <a class="selected" href="javascript:;">账户登录</a>
            <i>|</i>
            <a href="/register.html">免费注册</a>
          </div>

          <div id="loginform" name="loginform" class="login-box">
            <div class="input-box">
              <input
                id="txtUserName"
                name="txtUserName"
                type="text"
                placeholder="用户名/手机/邮箱"
                v-model="username"
                maxlength="50"
              >
            </div>
            <div class="input-box">
              <input
                id="txtPassword"
                name="txtPassword"
                type="password"
                placeholder="输入登录密码"
                v-model="password"
                maxlength="16"
              >
            </div>
            <div class="btn-box">
              <input id="btnSubmit" name="btnSubmit" type="submit" @click.stop="loginIn" value="立即登录">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      // index: 2
    };
  },
 
  methods: {
    loginIn() {
      this.$axios
        .post("site/account/login", {
          user_name: this.username,
          password: this.password
        })
        .then(res => {
          if (res.data.status == 0) {
            Message({
              type: "success",
              message: "登录成功"
            });
            // this.$emit("senddata", this.index);
            this.$router.push({
              path: "/user"
            });
            localStorage.setItem('islogin','logined')
          } else {
            Message({
              type: "warning",
              message: "账户或密码错误"
            });
          }
        });
    }
  }
};
</script>

<style>
</style>
