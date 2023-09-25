<template>
  <view>
    <!-- 视频播放 -->
    <view v-html="videoHtml">
     <!-- <video id="myVideo" :src="courseList.video_url" @error="videoErrorCallback" enable-danmu danmu-btn controls
        style="width: 100%;"></video> -->
       <!-- <video controls autoplay :src="courseList.video_url" id="myVideo"  enable-danmu danmu-btn controls
        style="width: 100%;" @ready="onReady" initial-time="1" @error="videoErrorCallback" /> -->
        
    </view>
    <!-- tabs标签 -->
    <view class="body-view">
      <!-- 使用scroll-view实现tabs滑动切换 -->
      <scroll-view class="top-menu-view" scroll-x="true" :scroll-into-view="tabCurrent">
        <view class="menu-topic-view" v-for="item in tabs" :id="'tabNum'+item.id" :key="(item.id - 1)"
          @click="swichMenu(item.id - 1)">
          <view :class="currentTab==(item.id - 1) ? 'menu-topic-act' : 'menu-topic'">
            <text class="menu-topic-text">{{item.name}}</text>
            <view class="menu-topic-bottom">
              <view class="menu-topic-bottom-color"></view>
            </view>
          </view>
        </view>
      </scroll-view>
      <!-- 内容 -->
      <swiper class="swiper-box-list" :current="currentTab" @change="swiperChange">
        <swiper-item class="swiper-topic-list" v-for="(item,i) in swiperDateList" :key="i">
          <view class="swiper-item">
            <view v-if="item.id==1">
              <view class="top">
                {{courseList.title}}
              </view>
              <u-divider text="课程简介" textPosition="left" textColor="#2979ff" lineColor="#2979ff"></u-divider>
              <view class="courseinfo">
                {{courseList.content}}
              </view>
              <!-- 底部导航 -->
              <view class="goods_nav">
                <text style="line-height: 100%;color: #a8a8a8;">已经有()人加入学习</text>
                <button style="width: 400rpx;margin-top: 20rpx;" type="primary" @click="buttonClick">加入学习</button>
              </view>
            </view>
            <view v-else>
              <view class="uni-padding-wrap">
                <!-- 评论区 start -->
                <scroll-view class="uni-comment" scroll-y="true">
                  <view class="uni-comment-list" v-for="(item,i) in commentList" :key="i">
                    <view class="uni-comment-face">
                      <image :src="item.imageurl" mode="widthFix"></image>
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
                <u-button text="发表" style="width: 20%; margin-left: 5%;" plain type="primary"
                  @click="submitInfo"></u-button>
              </view>
            </view>
          </view>
        </swiper-item>
      </swiper>
    </view>

  </view>
</template>

<script>
  import {
    getCourseDetail
  } from "@/network/course.js"
  import {
    getUserInfo
  } from "@/network/user.js"
  import {getComments} from "@/network/comment.js"
  export default {
    onLoad(e) {
      this.wh = uni.getWindowInfo().windowHeight;
      this.getCourseDetail(e.c_id);
      let x={
        post_id:e.c_id,
        type_id:2
      }
      // this.getComment(x);
      this.getUserInfo();
      console.log(x)
    },
    data() {
      return {
        src: '',
        inputInfo: '',
        wh: 0,
        tabs: [{
            id: 1,
            name: '简介'
          },
          {
            id: 2,
            name: '评价'
          }
        ],
        currentTab: 0,
        tabCurrent: 'tabNum1',
        // Tab切换内容
        swiperDateList: [{
            id: 1,
            content: '简介'
          },
          {
            id: 2,
            content: '评价'
          }
        ],
        courseList: {},
        buttonGroup: [{
          text: '加入我的课程',
          backgroundColor: '#3c9cff',
          color: '#fff'
        }],
        // 评论列表
        commentList: [
          {
            imageurl: "https://img2.baidu.com/it/u=1643008607,2649990517&fm=253&fmt=auto&app=138&f=JPEG?w=380&h=380",
            name: "梦婷",
            updateTime: "08/10 08:12",
            content: "AI技术正在深度影响我们的生活，为我们带来了更多便利和创新。"
          },
          {
            imageurl: "https://img1.baidu.com/it/u=537612317,1118945537&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
            name: "璇子",
            updateTime: "08/10 08:12",
            content: "这个AI模型的智能程度令人惊叹，它能够准确地解决复杂的问题。"
          },
          {
            imageurl: "https://img2.baidu.com/it/u=3492963605,945868763&fm=253&fmt=auto&app=138&f=JPEG?w=450&h=450",
            name: "忆雪",
            updateTime: "08/10 08:12",
            content: "AI的发展速度真是太快了，我对它在未来的应用充满期待。"
          },
          {
            imageurl: "https://img2.baidu.com/it/u=986226877,3885061890&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
            name: "琳娜",
            updateTime: "08/10 08:12",
            content: "AI在医疗领域的应用潜力巨大，它有望帮助我们更好地诊断和治疗疾病。"
          }
        ],
        commentInfo: {},
        userInfo:{}
      };
    },
    onReady: function(res) {
      this.videoContext = uni.createVideoContext('myVideo')
    },
    computed:{
    	videoHtml: function() {
    		return `<video  :custom-cache:"false" id="myVideo"  enable-danmu danmu-btn autoplay loop muted controls="controls" width="100%" height="230rpx"><source src="${this.courseList.video_url}" type="video/mp4"></video>`;
    	}
    },
    methods: {
      getCourseDetail(id) {
        getCourseDetail(id).then(res => {
          let code = res.data.code;
          if (code == '00000') {
            res.data.data.video_url = this.$beforeImgUrl + res.data.data.video_url
            this.courseList = res.data.data
            console.log(this.courseList)
          } else {
            console.log("请求失败")
          }
        }).catch(err => {
          console.log(err)
        })
      },
      videoErrorCallback: function(e) {
        uni.showModal({
          content: e.target.errMsg,
          showCancel: false
        })
      },
      swichMenu(id) {
        this.currentTab = id
        this.tabCurrent = 'tabNum' + id
      },
      swiperChange(e) {
        let index = e.detail.current
        this.swichMenu(index)
      },
      //获取评论
      getComment(x) {
        getComments(x).then(res => {
          let code = res.data.code;
          if (code == '00000') {
            console.log(res.data.data)
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
            if (res.data.data.userPhoto!=''&& 'userPhoto' in res.data.data) {
              res.data.data.userPhoto = this.$beforeImgUrl + res.data.data.userPhoto;
            }
            this.userInfo = {
              userPhoto: res.data.data.userPhoto?res.data.data.userPhoto:'https://cdn.metaforo.io/upload/20230530/da782ee4c80a418bb10926fcd8510a2c.jpg',
              nickName: res.data.data.nickName?res.data.data.nickName:'新同学',
            }
          } else {
            console.log("请求失败")
          }
        }).catch(err => {
          console.log(err)
        })
      },
      submitInfo() {
        this.commentInfo.imageurl = this.userInfo.userPhoto
        this.commentInfo.name = this.userInfo.nickName
        this.commentInfo.content = this.inputInfo
        if (this.commentInfo.content == '') {
          return
        }
        var now = new Date();
        // 获取年、月、日
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        // 将月份和日期转换为两位数形式
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
        // 格式化为 xxxx-xx-xx
        var formattedDate = year + '-' + month + '-' + day;
        this.commentInfo.updateTime = formattedDate
        this.inputInfo = '';
        this.commentList.unshift(this.commentInfo)
        this.commentInfo = {}
      },
      buttonClick() {
        console.log("加入课程")
      }
    }
  }
</script>

<style lang="scss">
  .body-view {
    height: 68vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .top-menu-view {
    display: flex;
    left: 0;
    white-space: nowrap;
    width: 100%;
    background-color: #FFFFFF;
    height: 86rpx;
    line-height: 86rpx;
    border-top: 1rpx solid #d8dbe6;

    .menu-topic-view {
      display: inline-block;
      white-space: nowrap;
      height: 86rpx;
      position: relative;

      .menu-topic-text {
        font-size: 30rpx;
        color: #303133;
        padding: 10rpx 40rpx;
      }

      .menu-topic-bottom {
        position: absolute;
        bottom: 0;
        width: 100%;

        .menu-topic-bottom-color {
          width: 60rpx;
          height: 8rpx;
        }
      }

      .menu-topic-act .menu-topic-bottom {
        display: flex;
        justify-content: center;
      }

      .menu-topic-act .menu-topic-bottom-color {
        background: #3d7eff;
      }
    }
  }

  .swiper-box-list {
    width: 90%;
    height: auto;
    flex: 1;
    margin: 0 auto;
    background-color: #FFFFFF;

    .swiper-topic-list {
      width: 100%;

      .top {
        font-size: 23px;
        color: black;
        margin-top: 10px;
      }

      .goods_nav {
        // 为商品导航组件添加固定定位
        text-align: center;
        position: fixed;
        bottom: 0;
        width: 100%;
      }
    }

    .uni-padding-wrap {
      padding: 30upx;
    }

    view {
      font-size: 28upx;
    }

    .uni-comment {
      padding: 5rpx 0;
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      height: 55vh;
    }

    .uni-comment-list {
      flex-wrap: nowrap;
      padding: 10rpx 0;
      margin: 10rpx 0;
      width: 100%;
      display: flex;
    }

    .uni-comment-face {
      width: 70upx;
      height: 70upx;
      border-radius: 100%;
      margin-right: 20upx;
      flex-shrink: 0;
      overflow: hidden;
    }

    .uni-comment-face image {
      width: 100%;
      border-radius: 100%;
    }

    .uni-comment-body {
      width: 100%;
    }

    .uni-comment-top {
      line-height: 1.5em;
      justify-content: space-between;
    }

    .uni-comment-top text {
      color: #0A98D5;
      font-size: 24upx;
    }

    .uni-comment-date {
      line-height: 38upx;
      flex-direction: row;
      justify-content: space-between;
      display: flex !important;
      flex-grow: 1;
    }

    .uni-comment-date view {
      color: #666666;
      font-size: 24upx;
      line-height: 38upx;
    }

    .uni-comment-content {
      line-height: 1.6em;
      font-size: 28upx;
      padding: 8rpx 0;
    }

    .uni-comment-replay-btn {
      background: #FFF;
      font-size: 24upx;
      line-height: 28upx;
      padding: 5rpx 20upx;
      border-radius: 30upx;
      color: #333 !important;
      margin: 0 10upx;
    }
  }

  .input_content {
    position: fixed;
    bottom: 5px;
    width: 100%;
    display: flex;
  }
</style>