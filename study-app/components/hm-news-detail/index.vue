<template>
  <div class="hm-news-detail">
    <div class="hd">
      <img class="yunshu" :src="options.userPhoto" />
      <div class="container">
        <div class="outer">
          <span class="author">{{ options.nickName }}</span>
          <div class="wrap">
            <img class="like" @click="islike = !islike"
              :src="islike ? 'http://m.rgbimg.com/cache1z1zKT/users/x/xy/xymonau/600/peVqHNG.jpg' : 'https://www.pngkey.com/png/detail/781-7817522_heart-png-outline-transparent-herz-rot.png'" />
          </div>
        </div>
        <span class="time">{{ options.updateTime }}</span>
      </div>
    </div>
    <span class="title">{{ options.title }}</span>
    <div class="main">
      <!-- 轮播图 -->
      <div class="entryPicWrap">
        <!-- <image class="img" :src="item" mode="widthFix"/> -->
        <swiper class="a" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
          <!-- 循环渲染轮播图的 item 项 -->
          <swiper-item v-for="(item,i) in options.imgUrl" :key="i">
            <!-- 动态绑定图片的 src 属性 -->
            <image class="img" :src="item" mode="widthFix" />
          </swiper-item>
        </swiper>
      </div>
    </div>
    <div class="ft">
      <rich-text class="content" :nodes="options.content"></rich-text>
    </div>
    <hr />
    <view class="comment">
      <br />
      <text style="height: 60rpx; line-height: 60rpx;">共{{this.commentList.length}}条评论</text>
      <u-button type="primary" style="width: 25%; height: 60rpx;margin-left: 350rpx"
        @click="submitInfo(options.p_id)">发表评论</u-button>
    </view>
    <view class="uni-padding-wrap">
      <scroll-view class="uni-comment" scroll-y="true">
        <view class="uni-comment-list" v-for="(item,i) in commentList" :key="i">
          <view class="uni-comment-face">
            <image :src="item.imageUrl" mode="widthFix"></image>
          </view>
          <view class="uni-comment-body">
            <view class="uni-comment-top">
              <text>{{item.name}}</text>
            </view>
            <view class="uni-comment-date">
              <text>{{item.updateTime}}</text>
            </view>
            <view class="uni-comment-content">{{item.content}}</view>
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="input_content">
      <u--textarea v-model="inputInfo" placeholder="请输入评论内容" autoHeight></u--textarea>
      <view>
        <like-button>
          <img src="https://assets.grooveapps.com/images/600ebc669144530072f0e902/1614668359_20210302_080609_0000.png"
            height="70rpx" width="70rpx" style="height: 70rpx; width: 70rpx;">
        </like-button>
      </view>
    </view>
  </div>
</template>
<script>
  import likeButton from '@/uni_modules/like-button/components/like-button/like-button.vue'
  import {
    getUserInfo
  } from "@/network/user.js"
  import {
    setComments
  } from '@/network/comment.js'
  export default {
    name: 'HmNewsDetail',
    props: {
      dataId: {
        type: String,
        default: 'hm-news-detail'
      },
      options: {
        type: Object,
        default: function() {
          return {
            yunshu: '/static/hm-news-detail/images/img_22946_0_0.png',
            author: '毫末科技',
            like: '/static/hm-news-detail/images/img_22946_0_1.png',
            time: '2 minutes ago',
            title: '如何用 Python 在笔记本上分析100GB 数据',
            img: '/static/hm-news-detail/images/img_22946_0_3.png',
            content: '第 1 种是对数据进行子抽样，但它有一个明显缺点：可能因忽略部分数据而错失关键信息，甚至误解数据表达的含义。第 2 种是使用分布式计算。虽然在某些情况下这是一种有效的方法，但是管理和维护集群会带来巨大开销。想象一下，要为一个刚超出内存大小、大概 30-50GB 的数据集就建立一套集群，对我来说，这似乎有点“用力过猛”。',

          };
        }
      },
      commentList: {
        type: Array,
        default: function() {
          return [{
              imageurl: "https://img1.baidu.com/it/u=2104662631,3018865509&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1695402000&t=527e96bd9c9534874c7422151949e04e",
              name: "瑞雅",
              updateTime: "08/10 08:12",
              content: "这个AI模型的效果令人惊叹，准确性超乎我的想象！"
            },
            {
              imageurl: "https://img0.baidu.com/it/u=2349666153,6980371&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1695402000&t=d3c854bc21ddbc93dccc79504815d16d",
              name: "娜娜",
              updateTime: "08/10 08:12",
              content: "AI技术的发展速度真是太快了，它正在改变我们的生活方式。"
            },
            {
              imageurl: "https://img2.baidu.com/it/u=1642897792,1115603974&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1695402000&t=236dc4e5bd2418dd4b58200d7105fd5b",
              name: "雅文",
              updateTime: "08/10 08:12",
              content: "我对这个AI应用的未来充满期待，它将为我们带来更多的便利和创新。"
            },
            {
              imageurl: "https://img0.baidu.com/it/u=1928632694,1581828195&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1695402000&t=c1e18d4466bbea8203ee1c880302ad39",
              name: "宁宁",
              updateTime: "08/10 08:12",
              content: "AI的潜力无限，它正在推动科学研究和技术进步的边界。"
            }
          ];
        }
      },
    },
    onLoad() {
      this.getUserInfo()
    },
    data() {
      return {
        inputInfo: '',
        userInfo: {},
        islike: false
      };
    },
    components: {
      likeButton
    },
    methods: {
      submitInfo(id) {
        var infos = {
          post_id: Number(id),
          type_id: 1,
          title: this.inputInfo
        }
        if (infos.title == '') {
          return
        }
        console.log(infos)
        this.inputInfo = ''
        setComments(infos).then(res => {
          let code = res.data.code;
          if (code == '00000') {
            console.log(res.data.message)
            var currentDate = new Date();
            var currentYear = currentDate.getFullYear();
            var currentMonth = currentDate.getMonth() + 1;
            var currentDay = currentDate.getDate();
            var currentHour = currentDate.getHours();
            var currentMinute = currentDate.getMinutes();
            var currentSecond = currentDate.getSeconds();
            var result = currentYear + "-" + currentMonth + "-" + currentDay + " " + currentHour + ":" +
              currentMinute + ":" + currentSecond
            let data = {
              imageUrl: this.$beforeImgUrl + uni.getStorageSync('userInfo').userPhoto,
              name: uni.getStorageSync('userInfo').nickName,
              updateTime: result,
              content: infos.title
            }
            console.log(data)
            this.commentList.unshift(data)
          } else {
            console.log("请求失败")
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getUserInfo() {
        getUserInfo().then(res => {
          let code = res.data.code;
          if (code == '00000') {
            console.log('啊？',res.data.data)
            if (res.data.data.userPhoto != '' && 'userPhoto' in res.data.data) {
              res.data.data.userPhoto = this.$beforeImgUrl + res.data.data.userPhoto;
            }
            this.userInfo = {
              userPhoto: res.data.data.userPhoto,
              nickName: res.data.data.nickName ? res.data.data.nickName : '新同学',
            }
            console.log('userInfo',this.userInfo)
          } else {
            console.log("请求失败")
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>
<style>
  @import './index.response.css';
</style>