<template>
  <view>
    <view class="img-a">
      <view class="t-b">
        您好，
        <br />
        欢迎使用乐学AI
      </view>
    </view>
    <view class="login-view" style="">
      <view class="t-login">
        <form class="cl">
          <view class="t-a">
            <text class="txt">用户名</text>
            <input type="text" name="username" placeholder="请输入您的用户名"  v-model="config.username" />
          </view>
          <view class="t-a">
            <text class="txt">密码</text>
            <input type="password"  maxlength="18" placeholder="请输入您的密码" v-model="config.password" />
          </view>
          <button @tap="regist(config)">注 册</button>
        </form>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    regist
  } from "@/network/regist.js"
  export default {
    data() {
      return {
        config:{
          username: '', //用户名
          password: '' //密码
        }
      };
    },
    methods: {
      //当前登录按钮操作
      regist(config) {
        var that = this;
        if (!that.config.username) {
          uni.showToast({
            title: '请输入您的用户名',
            icon: 'none'
          });
          return;
        }
        if (!that.config.password) {
          uni.showToast({
            title: '请输入您的密码',
            icon: 'none'
          });
          return;
        }
        regist(config).then(res => {
          let code = res.data.code;
          if (code == '00000') {
            uni.showToast({
              title:"注册成功",
              icon:'none'
            })
            uni.navigateTo({
              url: "/subpkg/login/login"
            })
          } else {
            console.log("请求失败")
          }
        }).catch(err => {
          console.log(err)
        })
      },
    }
  }
</script>
<style>
  @import url('regist.css');
</style>