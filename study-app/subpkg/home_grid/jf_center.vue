<template>
  <view class="content">
    <view class="t-wrap">
      <view class="t-jf">
        <view class="t-jf-points">
          <view class="t-jf-title">我的积分</view>
          <view class="t-jf-info">
            <view class="t-jf-num">{{jifen}}</view>
            <view class="t-jf-detail" hover-class="t-hc" @click="toDetail">
              <text>积分明细</text>
              <image src="/static/jf/icon-right.png"></image>
            </view>
          </view>
        </view>
        <view class="t-jf-mall" hover-class="t-hc" @click="toMall">
          积分商城
        </view>
      </view>
      <view class="t-bg-wrap">
        <view class="t-bg"></view>
      </view>
    </view>
    <view class="t-sign-con">
      <view class="wrap">
        <view class="t-sign-top">
          <view class="lx">已连续签到<u--text :text="day"></u--text>天</view>
          <view class="gz" hover-class="t-hc" @click="openRule">签到规则<image src="/static/jf/icon-ask.png"></image>
          </view>
        </view>
        <view class="t-sign-body">
          <view :class="['t-sign-item',{'signed':isSigned}]">
            <view class="t-img-con">
              <view class="t-img">
                <image :src="'/static/jf/icon-'+(isSigned?'check':'uncheck')+'.png'"></image>
              </view>
            </view>
            <text>+100</text>
          </view>
          <view class="t-sign-item">
            <view class="t-img-con">
              <view class="t-img">
                <image src="/static/jf/icon-uncheck.png"></image>
              </view>
            </view>
            <text>+100</text>
          </view>
          <view class="t-sign-item">
            <view class="t-img-con">
              <view class="t-img">
                <image src="/static/jf/icon-uncheck.png"></image>
              </view>
            </view>
            <text>+100</text>
          </view>
          <view class="t-sign-item">
            <view class="t-img-con">
              <view class="t-img">
                <image src="/static/jf/icon-uncheck.png"></image>
              </view>
            </view>
            <text>+100</text>
          </view>
          <view class="t-sign-item">
            <view class="t-img-con">
              <view class="t-img">
                <image src="/static/jf/icon-uncheck.png"></image>
              </view>
            </view>
            <text>+100</text>
          </view>
          <view class="t-sign-item">
            <view class="t-img-con">
              <view class="t-img">
                <image src="/static/jf/icon-uncheck.png"></image>
              </view>
            </view>
            <text>+100</text>
          </view>
          <view class="t-sign-item">
            <view class="t-img-con">
              <view class="t-img">
                <image src="/static/jf/icon-uncheck.png"></image>
              </view>
            </view>
            <text>+100</text>
          </view>
        </view>
        <view @click="toSign" :class="['t-sign-btn',{'t-signed':isSigned}]">{{isSigned?'今日已签到':'立即签到'}}</view>
      </view>
    </view>
    <view class="t-task">
      <view class="t-title">做任务 赚积分</view>
      <view class="t-task-item">
        <view class="left">
          <view class="taskname">
            收藏课程<text>+100积分</text>
          </view>
          <view class="taskdesc">
            加入任意课程学习即可完成任务
          </view>
        </view>
        <view class="right" hover-class="t-hc" @click="gotoCourse">加入课程</view>
      </view>
      <view class="t-task-item">
        <view class="left">
          <view class="taskname">
            浏览帖子<text>+50积分</text>
          </view>
          <view class="taskdesc">
            浏览任意帖子即可完成任务
          </view>
        </view>
        <view class="right finish">已完成</view>
      </view>
    </view>
    <!-- 弹出层-签到领积分 -->
    <kevy-mask :show="showSignBox" @click="closeSign" :maskClose="true" :z-index="10">
      <view v-if="showSignBox" class="t-overlay" @mousemove.stop @click="closeSign">
        <view class="t-o-wrap">
          <image class="t-sign-bg" src="/static/jf/sign.png"></image>
          <view class="t-g-jf">+100积分</view>
          <view class="t-g-desc">已连续签到1天，继续签到有惊喜哦~</view>
          <view class="close-btn" @click="closeSign">确认</view>
        </view>
      </view>
    </kevy-mask>

    <!-- 弹出层-积分规则 -->
    <kevy-mask :show="showRuleBox" @click="closeRule" :maskClose="true" :z-index="10">
      <view class="t-o-wrap">
        <view class="t-rule">
          <view class="title">
            积分规则说明
          </view>
          <view class="desc">
            {{rule}}
          </view>
        </view>
        <image @click="closeRule" class="t-close" src="../../static/jf/close.png"></image>
      </view>
    </kevy-mask>
  </view>
</template>

<script>
  import kevyMask from '@/components/kevy-mask/kevy-mask.vue';
  export default {
    components: {
      kevyMask
    },
    data() {
      return {
        //今日是否签到
        isSigned: false,
        //是否显示签到弹框
        showSignBox: false,
        //是否显示签到规则弹框
        showRuleBox: false,
        //积分规则说明
        rule: "1.积分规则说明积分规则说明积分规则说明积分规则说明积分规则说明；\n2.积分规则说明积分规则说明积分规则说明积分规则说明积分规则说明；\n3.积分规则说明积分规则说明积分规则说明积分规则说明积分规则说明；\n4.积分规则说明积分规则说明积分规则说明积分规则说明积分规则说明；\n5.积分规则说明积分规则说明积分规则说明积分规则说明积分规则说明。",
        day:0,
        jifen:150
      }
    },
    onLoad() {

    },
    methods: {
      //签到点击
      toSign() {
        if (!this.isSigned) {
          //这里写签到逻辑，这里模拟成功后操作
          this.showSignBox = true;
        }
      },
      //关闭签到弹框--签到成功后点击
      closeSign() {
        this.showSignBox = false;
        this.isSigned = true;
        this.day=1;
        this.jifen=250
      },
      //打开签到弹框
      openRule() {
        this.showRuleBox = true;
      },
      //关闭签到弹框
      closeRule() {
        this.showRuleBox = false;
        this.day=1;
      },
      //跳转积分商城
      toMall() {
        uni.navigateTo({
          url: '/subpkg/user/jfshop'
        })
      },
      //跳转积分明细
      toDetail() {
        uni.navigateTo({
          url: '/subpkg/home_grid/jf_detail'
        })
      },
      gotoCourse() {
        uni.switchTab({
          url: "/pages/cate/cate"
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .content {
    box-sizing: border-box;
    padding-bottom: 20rpx;
    background: #fff;
    min-width: 100vw;
    min-height: 10vh;
  }

  .t-hc {
    opacity: 0.7;
  }

  .t-wrap {
    height: 280rpx;
    width: 100%;
    box-sizing: border-box;

    .t-jf {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding-bottom: 40rpx;
      background: linear-gradient(to bottom, #18ba7a, #88bf87);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .t-jf-points {
        padding-left: 70rpx;

        .t-jf-title {
          font-size: 32rpx;
          color: #fff;
        }

        .t-jf-info {
          margin-top: 20rpx;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: flex-end;

          .t-jf-num {
            font-size: 56rpx;
            font-weight: bold;
            color: #fff;
            line-height: 56rpx;
          }

          .t-jf-detail {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;

            text {
              font-size: 24rpx;
              color: #fff;
              margin-left: 20rpx;
            }

            image {
              width: 18rpx;
              height: 18rpx;
              margin-left: 6rpx;
            }
          }
        }
      }

      .t-jf-mall {
        margin-right: 70rpx;
        padding: 15rpx 30rpx;
        background: #fff;
        border-radius: 50rpx;
        color: #1abb7c;
      }
    }

    .t-bg-wrap {
      position: relative;
      align-self: flex-start;
      top: 54rpx;

      .t-bg {
        --width: 440vw;
        position: absolute;
        height: var(--width);
        width: var(--width);
        left: calc(var(--width)*-1/2 + 50vw - 40rpx);
        top: calc(var(--width)*-1 + 1vw);
        border-radius: 50%;
        z-index: -1;
        background: linear-gradient(to bottom, #18ba7a, #88bf87);
      }
    }
  }

  .t-sign-con {
    width: 100%;
    box-sizing: border-box;
    position: relative;
    padding: 0rpx 30rpx;

    .wrap {
      width: 100%;
      height: 360rpx;
      border-radius: 10rpx;
      background-color: #fff;
      position: relative;
      top: -50rpx;
      box-sizing: border-box;
      box-shadow: 0 30rpx 50px rgba(0, 0, 0, .4);

      .t-sign-top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        padding: 28rpx 20rpx;

        .lx {
          font-size: 32rpx;
          color: #333;
          display: flex;

          u--text {
            color: #18ba7a;
            margin: 0rpx 3rpx;
          }
        }

        .gz {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          font-size: 28rpx;
          color: #999;

          image {
            width: 28rpx;
            height: 28rpx;
            margin-left: 8rpx;
          }
        }
      }

      .t-sign-body {
        height: 124rpx;
        width: 100%;
        box-sizing: border-box;
        padding: 0rpx 20rpx;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .t-sign-item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          box-sizing: border-box;
          padding: 0rpx 12rpx;
          border-radius: 10rpx;

          &.signed {
            background: #27ba76;

            text {
              color: #fff !important;
            }
          }

          .t-img-con {
            width: 56rpx;
            height: 56rpx;
            border-radius: 50%;
            background: #57da78;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;

            .t-img {
              width: 40rpx;
              height: 40rpx;
              border-radius: 50%;
              background: #27ba76;
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;

              image {
                width: 24rpx;
                height: 24rpx;
              }
            }
          }

          text {
            font-size: 20rpx;
            color: #777;
            margin-top: 12rpx;
          }
        }
      }

      .t-sign-btn {
        width: 514rpx;
        height: 80rpx;
        text-align: center;
        line-height: 80rpx;
        border-radius: 50rpx;
        background-color: #17ba7a;
        font-size: 32rpx;
        color: #fff;
        margin: 32rpx auto 0rpx;

        &.t-signed {
          background-color: #b8b8b8 !important;
        }
      }
    }
  }

  .t-task {
    box-sizing: border-box;
    background: #fff;
    padding: 0rpx 30rpx;

    .t-title {
      font-size: 32rpx;
      color: #000;
      text-align: center;
    }

    .t-task-item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      height: 130rpx;
      box-sizing: border-box;
      border-bottom: 1rpx solid #cdcdcd;

      .left {
        .taskname {
          max-width: 550rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 28rpx;
          color: #333;

          text {
            color: #18ba7a;
            margin-left: 10rpx;
          }
        }

        .taskdesc {
          max-width: 510rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 26rpx;
          color: #999;
          margin-top: 14rpx;
        }
      }

      .right {
        padding: 16rpx 34rpx;
        border-radius: 50rpx;
        background-color: #17ba7a;
        text-align: center;
        font-size: 28rpx;
        color: #fff;

        &.finish {
          background-color: #b8b8b8 !important;
        }
      }
    }
  }

  .t-o-wrap {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    .t-sign-bg {
      width: 550rpx;
      border-bottom-left-radius: 20rpx;
      border-bottom-right-radius: 20rpx;
    }

    .t-g-jf {
      position: relative;
      top: -220rpx;
      font-size: 36rpx;
      color: #17ba7a;
    }

    .t-g-desc {
      position: relative;
      top: -200rpx;
      font-size: 28rpx;
      color: #999;
    }

    .close-btn {
      position: relative;
      top: -173rpx;
      width: 300rpx;
      height: 60rpx;
      border-radius: 50rpx;
      background: #17ba7a;
      text-align: center;
      line-height: 60rpx;
      font-size: 28rpx;
      color: #fff;
    }

    .t-rule {
      width: 690rpx;
      background: #fff;
      border-radius: 20rpx;
      padding: 30rpx;
      box-sizing: border-box;

      .title {
        text-align: center;
        color: #333;
        font-size: 32rpx;
        margin-top: 10rpx;
      }

      .desc {
        text-align: justify;
        margin-top: 20rpx;
        white-space: pre-line;
        font-size: 32rpx;
        color: #666;
        line-height: 50rpx;
      }
    }

    .t-close {
      width: 60rpx;
      height: 60rpx;
      margin-top: 40rpx;
      padding: 10rpx;
    }
  }
</style>