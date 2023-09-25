<template>
  <view class="main">
    <!-- 搜索框 -->
    <view class="my-search-container" @click="gotoSearch">
      <view class="my-search-box">
        <u-icon name="search" size="17"></u-icon>
        <text class="placeholder">搜索</text>
      </view>
    </view>
    <!-- 轮播图 -->
    <view class="swiper">
      <u-swiper :list="swiperList" indicator indicatorMode="line" circular height="330rpx"></u-swiper>
    </view>
    <!-- ai新闻热榜 -->
    <view class="hotnew">
      <view class="hotnew_top">
        <view class="left">
          ai新闻
        </view>
        <view class="right">
          热榜
        </view>
      </view>
      <!-- 循环渲染热榜 -->
      <navigator class="hotnew_bangdan" v-for="(item,i) in hotsList" :key="i" :url="'/subpkg/news_detail/news_detail?id='+ item.id" >
        <image :src="`../../static/hotnew/shuzi${i+1}.png`"
          style="width:30px" mode="widthFix"></image>
        <u--text style="margin-left: 5%;" :lines="1" :text="item.title" size="18"></u--text>
      </navigator>
    </view>
    
    <!-- 分割线 -->
    <u-divider
            text="AI新闻推荐"
            textColor="#4395ff"
            lineColor="#4395ff"
            textSize="20"
    ></u-divider>
    <!-- 循环渲染列表 -->
    <view class="ul-list">
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
  import {
    getNewsList
  } from "@/network/news.js"
  export default {
    onLoad() {
      this.getNews();
      
    },
    data() {
      return {
        swiperList: [],
        hotsList: [],
        newsList:[]
      };
    },
    methods: {
      gotoSearch() {
        console.log("点击事件")
        uni.navigateTo({
          url: "/subpkg/search/search"
        })
      },
      getNews() {
        getNewsList().then(res=>{
          console.log(res)
          let code=res.data.code;
          if(code == '00000'){
            res.data.data.forEach(item=>{
              item.image=this.$beforeImgUrl+item.image
            })
            this.swiperList=[]
            this.newsList=res.data.data;
            this.hotsList=this.newsList.slice(4,7)
            this.newsList.slice(1,7).forEach(e=>{
              this.swiperList.push(e.image)
            })
          }else{
            console.log("请求失败")
          }
        }).catch(err=>{
           console.log(err)
        })
      }
    }
  }
</script>

<style lang="scss">
  .main {
    width: 90%;
    margin: 0 auto;

    // 搜索框
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

    .hotnew {
      width: 100%;
      height: auto;
      border-radius: 30px;
      background-color: #f2f2f2;
      padding-top: 30rpx;
      padding-left: 20rpx;
      margin-top: 40rpx;
      .hotnew_top {
        display: flex;
        margin-bottom: 20rpx;
        .left {
          width: 100rpx;
          height: 50rpx;
          color: white;
          background-color: #fbc21d;
          text-align: center;
          margin: auto 0;
          margin-right: 20rpx;
        }
        .right {
          font-size: 26px;
          color: red;
        }
      }
      .hotnew_bangdan {
        display: flex;
        margin-bottom: 40rpx;
      }
    }
    .news_item {
      display: flex;
      padding: 10rpx 20rpx;
      border-bottom: 1px solid blanchedalmond;
      margin-top: 30rpx;

      image {
        min-width: 200rpx;
        max-width: 200rpx;
        height: 150rpx;
      }

      .right {
        margin-left: 15rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .tit {
          font-size: 40rpx;
        }

        .info {
          font-size: 24rpx;

          text:nth-child(2) {
            margin-left: 30rpx;
          }
        }
      }
    }
    
    .ul-list .li{
    	overflow: hidden;
    	border-bottom: 1px solid #f6f6f6;
    }
    .ul-list .con{
    	overflow: hidden;
    	padding: 20rpx;
    }
    .ul-list .pic{
    	float: left;
    	width: 220rpx;
    	height: 170rpx;
    	overflow: hidden;
    	border-radius: 8rpx;
    	margin-right: 25rpx;
    }
    .ul-list .txt{
    	overflow: hidden;
    }
    .ul-list h3{
    	color: #1e2138;
    	font-size: 30rpx;
    	padding-top: 0rpx;
    	margin-bottom: 10rpx;
    	text-overflow: ellipsis;
    	display: -webkit-box;
    	-webkit-box-orient: vertical;
    	-webkit-line-clamp:1;
    }
    .ul-list .desc{
    	color: #666666;
    	font-size: 25rpx;
    	height: 80rpx;
    	line-height: 35rpx;
    	overflow: hidden;
    	text-overflow: ellipsis;
    	display: -webkit-box;
    	-webkit-box-orient: vertical;
    	-webkit-line-clamp:2;
    }
    .ul-list .info{
    	overflow: hidden;
    	width: 100%;
      margin-top: 70rpx;
    	color: #ababab;
    	font-size: 25rpx;
    }
    .ul-list .info .t2{
    	color: #63d58a;
    }
    .ul-list .info .date{
    	float: left;
    }
    .ul-list .info .look{
    	float: right;
    }
    .fooder{
    	height: 40rpx;
    }
  }
</style>