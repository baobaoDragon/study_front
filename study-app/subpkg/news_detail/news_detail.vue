<template>
  <view>
    <view class="banner">
        <image class="banner-img" src="https://img2.baidu.com/it/u=3276014886,401205413&fm=253&fmt=auto&app=138&f=JPEG?w=454&h=305"></image>
        <view class="banner-title">{{detailNew.title}}</view>
    </view>
    <view class="article-meta">
        <text class="article-author">{{detailNew.sourceName}}</text>
        <text class="article-text">发表于</text>
        <text class="article-time">{{detailNew.updateTime}}</text>
    </view>
    <view class="article-content">
        <rich-text :nodes="detailNew.content"></rich-text>
    </view>
  </view>
</template>

<script>
  import {
    getNewsDetail
  } from "@/network/news.js"
  export default {
    data() {
      return {
        id: 0,
        detailNew: [],
      };
    },
    onLoad(e) {
      this.id = e.id;
      this.getNewsById(e);
    },
    methods: {
      getNewsById(e) {
        uni.showLoading({
          title: "数据加载中...",
        })
        getNewsDetail(this.id).then(res => {
          this.detailNew = res.data.data
          console.log(this.detailNew)
          uni.hideLoading()
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style lang="scss">
  view {
      font-size: 28upx;
      line-height: 1.8;
  }
  
  .banner {
      height: 400upx;
      overflow: hidden;
      position: relative;
      background-color: #ccc;
  }
  
  .banner-img {
      width: 100%;
  }
  
  .banner-title {
      max-height: 84upx;
      overflow: hidden;
      position: absolute;
      left: 30upx;
      bottom: 5upx;
      width: 90%;
      font-size: 32upx;
      font-weight: 400;
      line-height: 42upx;
      color: white;
      z-index: 11;
  }
  
  .article-meta {
      padding: 20upx 40upx;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      color: gray;
  }
  
  .article-text {
      font-size: 26upx;
      line-height: 50upx;
      margin: 0 20upx;
  }
  
  .article-author,
  .article-time {
      font-size: 30upx;
  }
  
  .article-content {
      padding: 0 30upx;
      overflow: hidden;
      font-size: 30upx;
      margin-bottom: 30upx;
  }
</style>