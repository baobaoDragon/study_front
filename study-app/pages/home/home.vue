<template>
  <view style="background-color: #edeef2;">
    <view class="box">
      <dy-floating-ball class="dyFloatingBall" @diyEvent="diyEvent">
       <view class="ball" slot="ball">
       			<image class="image" src="@/static/Snipaste_2023-09-24_09-45-10.jpg" width="100rpx" height="100rpx" style="width: 100rpx; height: 100rpx;"></image>
       		</view>

      </dy-floating-ball>
    </view>
    <!-- 搜索框 -->
    <view class="my-search-container" :style="{'background-color': bgcolor}" @click="gotoSearch">
      <view class="my-search-box" :style="{'border-radius': radius + 'px'}">
        <u-icon name="search" size="17"></u-icon>
        <text class="placeholder">搜索</text>
      </view>
    </view>
    <view class="notice">
      <u-notice-bar mode="horizontal" :text="notice" :is-circular="true"></u-notice-bar>
    </view>
    <!-- 轮播图 -->
    <view class="content">
      <carousel :img-list="swiperList" url-key="imageUrl" @selected="selectedBanner" />
    </view>
    <!-- 宫格布局 -->
    <view class="order_status">
      <view class="status" v-for="item in status" @click="orderClick(item)">
        <image class="icon" :src="item.url" mode="aspectFit"></image>
        <text>{{item.name}}</text>
      </view>
    </view>
    <!-- 发帖论坛 -->
    <view v-if="TieArr.length==0">
      <u-empty mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png">
      </u-empty>
    </view>
    <view class="content" v-else>
      <zero-waterfall :list="dataList">
        <!--  #ifdef  MP-WEIXIN -->
        <view v-for="(item, index) of dataList" :key="index" slot="slot{{item.id}}">
          <view class="cnt">
            <view class="text" style="display: flex;margin-left: 250rpx;">
              <img src="../../static/grid_icons/aixin.png" alt="" width="45rpx" height="45rpx"
                style="width: 45rpx; height: 45rpx;">
              <text style="font-weight: bold;width: 45rpx; line-height: 45rpx;">{{item.likes}}</text>
            </view>
          </view>
        </view>
        <!--  #endif -->

        <!-- #ifndef  MP-WEIXIN -->
        <template v-slot:default="item">
          <view class="cnt">
            <view class="text" style="display: flex;margin-left: 230rpx;">
              <img src="https://cdn0.iconfinder.com/data/icons/love-and-valentine-s-day/800/heart-1024.png" alt=""
                width="45rpx" height="45rpx" style="width: 45rpx; height: 45rpx;">
              <text style="font-weight: bold;width: 45rpx; line-height: 45rpx; margin-left: 5rpx;">{{item.likes}}</text>
            </view>
          </view>
        </template>
        <!-- #endif -->
      </zero-waterfall>
      <zeroLoad bg-color="rgb(240, 240, 240)" :status="loadStatus" @clickLoadMore='loadMore'></zeroLoad>
    </view>

    <u-back-top :scroll-top="scrollTop" top="300" :iconStyle="iconStyle" icon="arrow-up"></u-back-top>
  </view>
</template>

<script>
  import zero from "@/uni_modules/zero-lazy-load/components/zero-lazy-load/zero-lazy-load.vue"
  import carousel from '@/components/vear-carousel/vear-carousel'
  import dyFloatingBall from '@/components/dy-floating-ball';
  import {
    getTiesList
  } from "@/network/ties.js"
  import {
    getRotation
  } from "@/network/rotation.js"
  import {
    getNotice
  } from "@/network/notice.js"
  import {
    getUserInfo
  } from "@/network/user.js"
  export default {
    props: {
      // 背景颜色
      bgcolor: {
        type: String,
        default: '#ffffff'
      },
      // 圆角尺寸
      radius: {
        type: Number,
        // 单位是 px
        default: 18
      }
    },
    onLoad() {
      this.getTieInfo();
      this.getRotationList();
      this.getNotice();
      this.getUserInfo();
    },
    data() {
      return {
        notice: "通知",
        swiperList: [],
        status: [{
            key: 4,
            name: '玩吧',
            url: '../../static/grid_icons/Airplane.png'
          }, {
            key: 1,
            name: '看吧',
            url: '../../static/grid_icons/fire-.png'
          },
          {
            key: 3,
            name: '学吧',
            url: '../../static/grid_icons/kecheng.png'
          },
          {
            key: 2,
            name: '签吧',
            url: '../../static/grid_icons/jifen.png'
          }
        ],

        baseList: [{
            name: 'order',
            title: '热门资讯'
          },
          {
            name: 'list-dot',
            title: '积分中心'
          },
          {
            name: 'star',
            title: '我的课程'
          },
          {
            name: 'gift',
            title: '积分兑换'
          },
        ],
        TieArr: [],
        loading: false,
        dataList: [],
        loadStatus: 'more',
        page: 1,
        pageSize: 8,
        isloading: false,
        scrollTop: 0,
        // 返回按钮样式
        iconStyle: {
          fontSize: '38rpx',
          color: '#2979ff',

        }
      };
    },
    components: {
      zeroLoad: zero,
      carousel,
      dyFloatingBall
    },
    onPullDownRefresh() {
      setTimeout(() => {
        uni.reLaunch({
          url: '/pages/home/home'
        })
      }, 100)
      uni.stopPullDownRefresh(); //停止刷新
    },
    onPageScroll(e) {
      this.scrollTop = e.scrollTop;
    },
    onReachBottom() {
      if (this.dataList.length >= this.TieArr.length) {
        this.loadingStatus = 'noMore'
      } else {
        this.loadStatus = 'more';
        setTimeout(() => {
          this.loadMore();
          this.loadStatus = 'loadmore';
        }, 10)
      }
    },
    methods: {
      diyEvent(e) {
        if (e.num == 1) {
          uni.reLaunch({
            url: '/subpkg/user/ai_tools'
          })
        }
      },
      getTieInfo() {
        //获取帖子信息
        getTiesList().then(res => {
          let code = res.data.code;
          if (code == '00000') {
            res.data.data.forEach((item, i) => {
              item.imageUrl = this.$beforeImgUrl + item.imageUrl
            })
            this.TieArr = res.data.data
            this.dataList = this.TieArr
            console.log(this.TieArr)
          } else {
            console.log("请求失败")
          }
        }).catch(err => {
          console.log(err)
        })
      },
      //获取轮播图信息
      getRotationList() {
        getRotation().then(res => {
          let code = res.data.code;
          if (code == '00000') {
            res.data.data.forEach((item, i) => {
              item.imageUrl = this.$beforeImgUrl + item.imageUrl
            })
            this.swiperList = res.data.data
            console.log(this.swiperList)
          } else {
            console.log("请求失败")
          }
        }).catch(err => {
          console.log(err)
        })
      },
      //获取新闻播报
      getNotice() {
        getNotice().then(res => {
          let code = res.data.code;
          if (code == '00000') {
            this.notice = res.data.data[0].title
          } else {
            console.log("请求失败")
          }
        }).catch(err => {
          console.log(err)
        })
      },
      //获取用户信息
      getUserInfo() {
        getUserInfo().then(res => {
          let code = res.data.code;
          if (code == '00000') {
            console.log(res.data.data)
            if (res.data.data.userPhoto != '' && 'userPhoto' in res.data.data) {
              res.data.data.userPhoto = this.$beforeImgUrl + res.data.data.userPhoto;
            }
            if (res.data.data.backUrl != '' && 'backUrl' in res.data.data) {
              res.data.data.backUrl = this.$beforeImgUrl + res.data.data.backUrl;
            }
          } else {
            console.log("请求失败")
          }
        }).catch(err => {
          console.log(err)
        })
      },
      orderClick(e) {
        if (e.key == 1) {
          uni.navigateTo({
            url: "/subpkg/home_grid/hot_new"
          })
        } else if (e.key == 2) {
          uni.navigateTo({
            url: "/subpkg/home_grid/jf_center"
          })
        } else if (e.key == 3) {
          uni.navigateTo({
            url: "/subpkg/user/course"
          })
        } else if (e.key == 4) {
          uni.navigateTo({
            url: "/subpkg/user/ai_tools"
          })
        }
      },
      selectedBanner(item, index) {
        console.log('🥒', item, index)
      },
      gotoSearch() {
        console.log("点击事件")
        uni.navigateTo({
          url: "/subpkg/search/search"
        })
      },
      loadMore() {
        this.loadStatus = 'loading';
        this.page++
        this.dataList = this.dataList.concat(this.TieArr.slice(this.dataList.length, this.page * this.pageSize))
      },
    }
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }
  
  .image{
    border-radius: 50%;
  }

  .grid {
    margin-top: 40rpx;
  }

  .grid-text {
    font-size: 14px;
    color: #909399;
    padding: 10rpx 0 20rpx 0rpx;
    box-sizing: border-box;
  }

  .text {
    margin-bottom: 8rpx;
  }

  .my-search-container {
    // 移除背景颜色，改由 props 属性控制
    // background-color: #ffffff;
    height: 50px;
    padding: 0 10px;
    display: flex;
    //纵向居中
    align-items: center;
    z-index: 999;
    position: sticky;
    top: 0;

    .my-search-box {
      height: 36px;
      background-color: #f2f2f2;
      // 移除圆角尺寸，改由 props 属性控制
      // border-radius: 15px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      .placeholder {
        font-size: 15px;
        margin-left: 5px;
      }
    }
  }

  .order_status {
    display: flex;
    justify-content: space-between;
    margin-top: 30upx;
    margin-bottom: 30rpx;

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
</style>