<template>
  <view class="center">
    <view class="box">
      <dy-floating-ball class="dyFloatingBall" @diyEvent="diyEvent">
        <view class="ball" slot="ball">
          <image class="image" src="@/static/Snipaste_2023-09-24_09-45-10.jpg" width="100rpx" height="100rpx"
            style="width: 100rpx; height: 100rpx;"></image>
        </view>
      </dy-floating-ball>
    </view>
    <view class="center_top"
      :style="{ 'background-image': 'url('+(userInfo.backUrl!='' ? userInfo.backUrl:'../static/my/bj.png')+')','background-size': 'cover','height': '400rpx' }">
      <view class="mask"></view>
    </view>
    <view class="center_box_bg">
      <view class="profily">
        <view class="base">
          <view class="profily_header"
            :style="{ 'background-image': 'url(' + (userInfo.userPhoto!='' ? userInfo.userPhoto : '../static/my/tx.png') + ')' }">
          </view>
          <text>{{userInfo.nickName}}</text>
          <image src="../../static/fumou-center-template/a-shezhi.png" mode="" @click="setttingClick"></image>
        </view>
        <view class="order_status">
          <view class="status" v-for="item in status" @click="orderClick(item)">
            <image class="icon" :src="item.url" mode="aspectFit"></image>
            <text>{{item.name}}</text>
          </view>
        </view>
      </view>
      <view class="baiban">
      </view>
      <!-- 遮罩层 -->
      <u-modal :show="show" :title="title" :content='content' @confirm="show=false"></u-modal>

      <view class="gotoReport" @click="gotoReport">
        <image class="ReportImg" src="@/static/MTXX_MH20230924_124123023.jpg" width="100%" mode="widthFix"></image>
      </view>
      <view class="center_menu">
        <view class="menu_item" v-for="item in menus" @click="menuClick(item)">
          <image :src="item.icon" mode="aspectFill"></image>
          <text>{{item.name}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    getUserInfo
  } from "@/network/user.js"
  import dyFloatingBall from '@/components/dy-floating-ball';
  export default {
    onLoad() {
      this.getUserInfo();
    },
    onShow() {
      this.getUserInfo();
    },
    components: {
      dyFloatingBall
    },
    data() {
      return {
        show: true,
        status: [{
            key: 1,
            name: '已学课程',
            url: '../../static/fumou-center-template/xiaidekecheng.png'
          },
          {
            key: 2,
            name: '积分商城',
            url: '../../static/fumou-center-template/jifenshangcheng.png'
          },
          {
            key: 3,
            name: '我的收藏',
            url: '../../static/fumou-center-template/wodeshoucang.png'
          },
          {
            key: 4,
            name: '任务',
            url: '../../static/fumou-center-template/woderenwu.png'
          }
        ],
        menus: [{
            name: '修改资料',
            icon: '../../static/fumou-center-template/xiugaiziliao.png',
            key: 1,
          },
          {
            name: '历史浏览',
            icon: '../../static/fumou-center-template/lishijilu.png',
            key: 5,
          },
          {
            name: 'AI工具合集',
            icon: '../../static/fumou-center-template/AIgongju.png',
            key: 6,
          },
          {
            name: '版本',
            icon: '../../static/fumou-center-template/dangqianbanben.png',
            key: 2,
          },
          {
            name: '关于我们',
            icon: '../../static/fumou-center-template/banben.png',
            key: 3,
          },
          {
            name: '退出登录',
            icon: '../../static/fumou-center-template/tuichudenglu.png',
            key: 4,
          }
        ],
        show: false,
        title: '版本',
        content: '处于开发阶段的1.0.0',
        userInfo: {}
      };
    },
    methods: {
      diyEvent(e) {
        if (e.num == 1) {
          uni.reLaunch({
            url: '/subpkg/user/ai_tools'
          })
        }
      },
      getUserInfo() {
        getUserInfo().then(res => {
          let code = res.data.code;
          if (code == '00000') {
            console.log(res.data.data)
            uni.setStorageSync('userInfo', res.data.data)
            if (res.data.data.userPhoto != '' && 'userPhoto' in res.data.data) {
              res.data.data.userPhoto = this.$beforeImgUrl + res.data.data.userPhoto;
            }
            if (res.data.data.backUrl != '' && 'backUrl' in res.data.data) {
              res.data.data.backUrl = this.$beforeImgUrl + res.data.data.backUrl;
            }
            this.userInfo = {
              userPhoto: res.data.data.userPhoto ? res.data.data.userPhoto : '',
              backUrl: res.data.data.backUrl ? res.data.data.backUrl : '',
              nickName: res.data.data.nickName ? res.data.data.nickName : '新同学',
              userSex: res.data.data.userSex ? res.data.data.userSex : 0
            }
            console.log(this.userInfo)

          } else {
            console.log("请求失败")
          }
        }).catch(err => {
          console.log(err)
        })
      },
      setttingClick() {
        uni.navigateTo({
          url: "/subpkg/setting/setting"
        })
      },
      menuClick(item) {
        if (item.key == 2) {
          this.show = true
        } else if (item.key == 4) {
          uni.clearStorageSync('token')
          uni.clearStorageSync('userPhoto')
          uni.clearStorageSync('userName')
          uni.reLaunch({
            url: "/subpkg/login/login"
          })
        } else if (item.key == 5) {
          uni.navigateTo({
            url: "/subpkg/user/tieHistory"
          })
        } else if (item.key == 6) {
          uni.navigateTo({
            url: "/subpkg/user/ai_tools"
          })
        } else if (item.key == 1) {
          uni.navigateTo({
            url: "/subpkg/user/editInfo"
          })
        }
      },
      orderClick(e) {
        if (e.key == 1) {
          uni.navigateTo({
            url: "/subpkg/user/course"
          })
        } else if (e.key == 2) {
          uni.navigateTo({
            url: "/subpkg/user/jfshop"
          })
        } else if (e.key == 3) {
          uni.navigateTo({
            url: "/subpkg/user/collect"
          })
        } else if (e.key == 4) {
          uni.navigateTo({
            url: "/subpkg/home_grid/jf_center"
          })
        }
      },
      //跳转到学习报告
      gotoReport(){
        uni.navigateTo({
          url:'/subpkg/user/report'
        })
      }
    },
  }
</script>

<style lang="scss">
  page {
    height: 100%;
  }

  .image {
    border-radius: 50%;
  }

  .profily,
  .profily_header {
    border-radius: 8px;
  }

  .gotoReport {
    width: 84%;
    margin: 0 auto;
    border-radius: 40rpx;

    .ReportImg {
      border-radius: 40rpx;
      width: 100%
    }
  }

  .center {
    height: 130vh;

    &_top {
      height: 30%;
      // background: url('../../static/fumou-center-template/header.jpg') no-repeat 0% 50%;
      background-size: cover;

      // background: #E6E6E6;
      .mask {
        background: rgba(0, 0, 0, .4);
        height: 100%;
      }
    }

    &_box_bg {
      background: #F9F9F9;
      position: relative;

      .profily {
        position: absolute;
        width: 90%;
        // border:1px solid #F7F7F7;
        margin: 0 auto;
        top: -100upx;
        left: 5%;
        background: #FEFEFE;
        padding: 35upx;
        box-sizing: border-box;
        box-shadow: 0px 2px 5px #EDEDED;
      }
    }
  }

  .base {
    display: flex;
    align-items: center;
    border-bottom: 2px solid #F6F6F6;
    padding-bottom: 35upx;
    position: relative;

    .profily_header {
      height: 130upx;
      width: 130upx;
      // background-image: url('../../static/fumou-center-template/header.jpg');
      background-size: 100%;
    }

    text {
      margin-left: 20px;
      font-size: 30upx;
    }

    image {
      position: absolute;
      height: 40upx;
      width: 40upx;
      right: 0px;
      top: 0px;
    }
  }

  .order_status {
    display: flex;
    justify-content: space-between;
    margin-top: 35upx;

    .status {
      width: 140upx;
      font-size: 24upx;
      text-align: center;
      letter-spacing: .5px;
      display: flex;
      flex-direction: column;

      .icon {
        width: 60upx;
        height: 60upx;
        margin: 0 auto;
        margin-bottom: 5px;

      }
    }
  }

  .baiban {
    background: #FEFEFE;
    height: 300upx;
  }

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

  .warp {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .rect {
    width: 120px;
    height: 120px;
    background-color: #fff;
  }
</style>