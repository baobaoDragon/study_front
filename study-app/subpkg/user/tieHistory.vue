<template>
  <view>
    <z-tabs ref="tabs" :list="tabList" :current="current" @change="tabsChange" />
    <view class="content" v-if="current==0">
      <zero-waterfall :list="dataList">
        <!--  #ifdef  MP-WEIXIN -->
        <view v-for="(item, index) of dataList" :key="index" slot="slot{{item.id}}">
          <view class="cnt">
            <view class="text">{{ item.extra }}</view>
          </view>
        </view>
        <!--  #endif -->

        <!-- #ifndef  MP-WEIXIN -->
        <template v-slot:default="item">
          <view class="cnt">
            <view class="text">{{ item.extra }}</view>
          </view>
        </template>
        <!-- #endif -->
      </zero-waterfall>
      <zeroLoad bg-color="rgb(240, 240, 240)" :status="loadStatus" @clickLoadMore='loadMore'></zeroLoad>
    </view>

    <view class="ul-list" v-else>
      <view class="li" v-for="(it,i) in newsList" :key="i">
        <navigator class="con" :url="'/subpkg/news_detail/news_detail?id='+ it.id" hover-class="none">
          <view class="pic">
            <image style="width: 100%;" :src="it.image" mode="widthFix"></image>
          </view>
          <view class="txt">
            <view class="tit">
              <h3>{{it.title}}</h3>
            </view>
            <view class="info">
              <view class="date">
                <text class="t2">{{it.updateTime}}</text>
              </view>
              <view class="look">
                <text class="t1">来源:</text>
                <text class="t2">{{it.sourceName}}</text>
              </view>
            </view>
          </view>
        </navigator>
      </view>
    </view>
  </view>

</template>

<script>
  import zero from "@/uni_modules/zero-lazy-load/components/zero-lazy-load/zero-lazy-load.vue"
  import {
    getTiesList
  } from "@/network/ties.js"
  import {
    getNewsList
  } from "@/network/news.js"
  export default {
    onLoad() {
      this.getTieInfo();
      this.getNews();
    },
    components: {
      zeroLoad: zero
    },
    data() {
      return {
        TieArr: [],
        loading: false,
        dataList: [],
        loadStatus: 'more',
        page: 1,
        pageSize: 10,
        isloading: false,
        tabList: ['帖子历史', '新闻历史'],
        current: 0, // tabs组件的current值，表示当前活动的tab选项
        newsList: []
      };
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
      getTieInfo() {
        //获取帖子信息
        getTiesList().then(res => {
          let code = res.data.code;
          if (code == '00000') {
            res.data.data.forEach((item, i) => {
              item.imageUrl = this.$beforeImgUrl + item.imageUrl
            })
            this.TieArr = res.data.data
            console.log(this.TieArr)
            this.dataList = this.TieArr.slice(0, 10)
          } else {
            console.log("请求失败")
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getNews() {
        getNewsList().then(res => {
          console.log(res)
          let code = res.data.code;
          if (code == '00000') {
            res.data.data.image = this.$beforeImgUrl + res.data.data.image
            this.newsList = res.data.data;
          } else {
            console.log("请求失败")
          }
        }).catch(err => {
          console.log(err)
        })
      },
      loadMore() {
        this.loadStatus = 'loading';
        this.page++
        this.dataList = this.dataList.concat(this.TieArr.slice(this.dataList.length, this.page * this.pageSize))
      },
      //tabs通知swiper切换
      tabsChange(index) {
        this.current = index;
      },
      //swiper滑动中
      swiperTransition(e) {
        this.$refs.tabs.setDx(e.detail.dx);
      },
      //swiper滑动结束
      swiperAnimationfinish(e) {
        this.current = e.detail.current;
        this.$refs.tabs.unlockDx();
      }
    }
  }
</script>

<style lang="scss">
  .ul-list .li {
    overflow: hidden;
    border-bottom: 1px solid #f6f6f6;
  }

  .ul-list .con {
    overflow: hidden;
    padding: 20rpx;
  }

  .ul-list .pic {
    float: left;
    width: 220rpx;
    height: 170rpx;
    overflow: hidden;
    border-radius: 8rpx;
    margin-right: 25rpx;
  }

  .ul-list .txt {
    overflow: hidden;
  }

  .ul-list h3 {
    color: #1e2138;
    font-size: 30rpx;
    padding-top: 0rpx;
    margin-bottom: 10rpx;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .ul-list .desc {
    color: #666666;
    font-size: 25rpx;
    height: 80rpx;
    line-height: 35rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .ul-list .info {
    overflow: hidden;
    width: 100%;
    margin-top: 70rpx;
    color: #ababab;
    font-size: 25rpx;
  }

  .ul-list .info .t2 {
    color: #63d58a;
  }

  .ul-list .info .date {
    float: left;
  }

  .ul-list .info .look {
    float: right;
  }

  .fooder {
    height: 40rpx;
  }
</style>