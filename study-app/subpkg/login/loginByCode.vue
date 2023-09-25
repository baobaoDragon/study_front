<template>
  <view class="container">
    <view class="top">
      <view class="title">登录</view>
    </view>
    <view class="main">
      <view class="center">
        <input placeholder="输入手机号/邮箱登录" class="info-input" v-model="value" />
        <view class="code">
          <input placeholder="验证码输入" class="info-input" v-model="code" />
          <u-button type="white" width="200rpx" :link="true" height="60rpx" @click="getCode()" v-if="T" shape="circle">验证码</u-button>
          <u-tag :text="count" mode="light" v-else/>
        </view>
      </view>

      <view class="regist">
        <u-button @click="loginByCode" type="primary" shape="circle">登录</u-button>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    sendDm,
    sendMsm
  } from "@/api/regist.js"
  import {
    tokenUtil
  } from "@/utils/token.js"
  import {
    loginByCode
  } from "@/api/login.js"
  import {
    isMobile,
    isEmail
  } from '@/utils/validate.js'

  export default {
    data() {
      return {
        T: true,
        count: 0,
        userInfo: {},
        value: '',
        code: '',
      }
    },
    methods: {
      getCode() {

        let isM = isMobile(this.value)
        let isE = isEmail(this.value)

        if (isM) {
          sendMsm(this.value).then(res => {
            uni.showToast({
              title: "发送成功"
            })
          })
        } else if (isE) {
          sendDm(this.value).then(res => {
            uni.showToast({
              title: "发送成功"
            })
            uni.navigateTo({
              url:"/pages/home/home"
            })
          })
        } else {
          uni.showToast({
            title: "请输入正确手机号或邮箱",
            icon: 'none'
          })
          return
        }

        this.T = false
        this.count = 60
        var times = setInterval(() => {
          this.count--; //递减
          if (this.count <= 1) {
            this.T = true
            clearInterval(times);
          }
        }, 1000)

      },

      loginByCode() {
        let isM = isMobile(this.value)
        let isE = isEmail(this.value)
        this.userInfo.code = this.code
        if (isM) {
          this.userInfo.phone = this.value
        } else if (isE) {
          this.userInfo.email = this.value
        }
        loginByCode(this.userInfo).then(res => {
          // if (res.data.res == 0) {
          //   uni.showToast({
          //     title: res.data.message
          //   })
          // } else {
          //   let user = res.data.userInfo
          //   tokenUtil.set(res.data.Jwt_token)
          //   uni.setStorageSync("userInfo", user)
          //   this.createWs()
            setTimeout(() => {
              uni.reLaunch({
                url: "/pages/home/home"
              });
            }, 500)
          // }
        })
      },
      createWs() {
        socket.onSocketOpen(function(res) {
          console.log('WebSocket连接已打开！');
        });
        socket.onSocketError(function(res) {
          //console.log('WebSocket连接打开失败，请检查！');
        });
        socket.onSocketMessage(function(res) {

          uni.$emit('messageCount', {
            'records': res.data
          })

        });
      },

    }
  }
</script>

<style scoped>
  @import url(./css/loginByCode.css);
</style>