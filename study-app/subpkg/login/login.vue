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
            <input type="text" name="phone" placeholder="请输入您的用户名" v-model="config.username" />
          </view>
          <view class="t-a-a">
            <text class="txt">密码</text>
            <input type="password" name="code" maxlength="18" placeholder="请输入您的密码" v-model="config.password" />
          </view>
          <view class="forget" @tap="gotoForget()">忘记密码</view>
          <button @tap="login(config)">登 录</button>
          <view class="reg" @tap="reg()">注 册</view>
        </form>
      </view>
    </view>
  </view>
</template>

<script>
import {
    login
  } from "@/network/login.js"
  export default {
    data() {
      return {
        config:{
          username: '', //手机号码
          password: '' //密码
        }
        
      };
    },
    onLoad() {},
    methods: {
      //当前登录按钮操作
      login(config) {
        var that = this;
        // if (!that.phone) {
        //   uni.showToast({
        //     title: '请输入您的手机号',
        //     icon: 'none'
        //   });
        //   return;
        // }
        // if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(that.phone)) {
        //   uni.showToast({
        //     title: '请输入正确手机号',
        //     icon: 'none'
        //   });
        //   return;
        // }
        // if (!that.pwd) {
        //   uni.showToast({
        //     title: '请输入您的密码',
        //     icon: 'none'
        //   });
        //   return;
        // }
        login(config).then(res => {
          let code = res.data.code;
          if (code == '00000') {
            console.log(res.data.data)
            uni.setStorageSync("token",res.data.data.token)
            console.log(res.data.data.token)
              uni.switchTab({
                url:"/pages/home/home"
              })
          } else {
            console.log("请求失败")
          }
        }).catch(err => {
          console.log(err)
        })
      },
      //注册按钮点击
      reg() {
        uni.navigateTo({
          url:"/subpkg/regist/regist"
        })
      },
      gotoForget(){
        uni.navigateTo({
          url:"/subpkg/login/findPassword"
        })
      }
    }
  }
</script>
<style>
  @import url('css/login.css');
</style>