<template>
  <view class="center_menu">
    <view class="menu_item" v-for="item in menus" @click="menuClick(item)">
      <image :src="item.icon" mode="aspectFill"></image>
      <text>{{item.name}}</text>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        menus: [{
            name: '修改密码',
            icon: '../../static/fumou-center-template/xiugaiziliao.png',
            key: 1,
          },
          {
            name: '退出登录',
            icon: '../../static/fumou-center-template/tuichudenglu.png',
            key: 2,
          }
        ],
      };
    },
    methods: {
      menuClick(item) {
        if (item.key == 1) {
          uni.navigateTo({
            url:"/subpkg/setting/editPwd"
          })
        } else if (item.key == 2) {
          uni.clearStorageSync('token')
          uni.clearStorageSync('userPhoto')
          uni.clearStorageSync('userName')
          uni.reLaunch({
            url: "/subpkg/login/login"
          })
        } 
      },
    }
  }
</script>

<style lang="scss">
  .center_menu {
    width: 100%;
    display: inline-block;

    .menu_item {
      font-size: 28upx;
      letter-spacing: 1px;
      padding: 14px 5%;
      background: #FEFEFE;
      overflow: hidden;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      position: relative;
      border-bottom: 1px solid #EFEFEF;

      &:hover {
        background: #F6F6F6 !important;
      }

      &::after {
        content: '';
        width: 30upx;
        height: 30upx;
        position: absolute;
        right: 5%;
        background: url('../../static/fumou-center-template/right.png') no-repeat;
        background-size: 100%;
      }

      text:nth-of-type(1) {
        margin-left: 10px;
      }

      image {
        width: 40upx;
        height: 40upx;
      }

      &:nth-of-type(4) {
        margin-top: 10px;
      }
    }
  }
</style>