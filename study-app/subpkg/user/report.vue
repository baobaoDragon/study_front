<template>
  <view class="user">
    <!-- 底图 - 开始 -->
    <image class="user-header-image" src="https://img0.baidu.com/it/u=1335990509,116193079&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500"></image>
    <!-- 底图 - 结束 -->

    <!-- 用户信息 - 开始 -->
    <view class="user-info-box">
      <u-avatar :src="userInfo.userPhoto" shape="square"></u-avatar>
      <view class="user-info-right">
        <view class="user-nickname">{{ userInfo.name}}</view>
        </view>
    </view>
    <!-- 答题情况 -->
    <view class="content1">
      <view class="content1_top">
        <view style="width: 10rpx; height:50rpx;background-color: #91c7f2; margin-left: 10rpx;"></view>
        <view style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-weight: bold;margin-left: 10rpx;">知识擂台答题情况</view>
      </view>
      <image class="img" src="@/static/my/report1.png" style="width: 100%;" mode="widthFix"></image>
      <image class="img" src="@/static/my/report2.png" style="width: 100%;" mode="widthFix"></image>
      <image class="img" src="@/static/my/report3.png" style="width: 100%;" mode="widthFix"></image>
    </view>
  </view>
</template>

<script>
  import {
    getUserInfo
  } from "@/network/user.js"
  export default {
    onLoad() {
      let arr = uni.getStorageSync('userInfo')
      this.userInfo = {
        userPhoto: this.$beforeImgUrl + arr.userPhoto,
        name: arr.nickName
      }
    },
    data() {
      return {
        userInfo: {}
      }
    }
  }
</script>

<style lang="scss">
  page {
    background-color: #efefef;
  }

  .user {
    .user-header-image {
      width: 100%;
    }

    .user-info-box {
      background: #ffffff;
      padding: 30rpx;
      margin: -80rpx 20rpx 20rpx 20rpx;
      position: relative;
      border-radius: 20rpx;
      display: flex;
      align-items: center;
      .user-avg {
        width: 100rpx;
        height: 100rpx;
        border-radius: 10rpx;
      }
      .user-nickname {
        margin-left: 20rpx;
      }
    }
    .content1{
      .content1_top{
        display: flex;
        margin: 30rpx 0;
        .img{
          width: 100%;
        }
      }
    }
  }
</style>