<template>
  <view>
    <div class="test-component">
      <hm-news-detail :options="options" :commentList="commentList"></hm-news-detail>
    </div>
    <!-- <view class="input_content">
       <u--textarea v-model="inputInfo" placeholder="请输入评论内容" autoHeight ></u--textarea>
       <view>
         <like-button>
           <img src="../../static/tie_icons/dianzan_1.png" height="60px" width="60px" style="height: 60rpx; width: 60rpx;">
         </like-button>
       </view>
    </view> -->
  </view>
</template>

<script>
  import HmNewsDetail from '@/components/hm-news-detail/index.vue'
  import {
    getUserInfo
  } from "@/network/user.js"
  import {
    getTiesDetail
  } from "@/network/ties.js"
  import {
    getComments
  } from '@/network/comment.js'
  export default {
    components: {
      HmNewsDetail,
      // likeButton
    },
    data() {
      return {
        id: 0,
        options: {
          yunshu: '/static/hm-news-detail/images/img_22946_0_0.png',
          author: '毫末科技',
          like: '/static/hm-news-detail/images/img_22946_0_1.png',
          share: '/static/hm-news-detail/images/img_22946_0_2.png',
          time: '2 minutes ago',
          title: '如何用 Python 在笔记本上分析100GB 数据',
          img: '/static/hm-news-detail/images/img_22946_0_3.png',
          content: '第 1 种是对数据进行子抽样，但它有一个明显缺点：可能因忽略部分数据而错失关键信息，甚至误解数据表达的含义。第 2 种是使用分布式计算。虽然在某些情况下这是一种有效的方法，但是管理和维护集群会带来巨大开销。想象一下，要为一个刚超出内存大小、大概 30-50GB 的数据集就建立一套集群，对我来说，这似乎有点“用力过猛”。'
        },
        commentList:[
          {imageurl:"https://ask.dcloud.net.cn/uploads/avatar/001/67/43/81_avatar_max.jpg",name:"网友",updateTime:"08/10 08:12",content:"很酷的HBuilderX和uni-app，开发一次既能生成小程序，又能生成App"},
           {imageurl:"https://ask.dcloud.net.cn/uploads/avatar/001/67/43/81_avatar_max.jpg",name:"网友",updateTime:"08/10 08:12",content:"很酷的HBuilderX和uni-app，开发一次既能生成小程序，又能生成App"},
           {imageurl:"https://ask.dcloud.net.cn/uploads/avatar/001/67/43/81_avatar_max.jpg",name:"网友",updateTime:"08/10 08:12",content:"很酷的HBuilderX和uni-app，开发一次既能生成小程序，又能生成App"},
            {imageurl:"https://ask.dcloud.net.cn/uploads/avatar/001/67/43/81_avatar_max.jpg",name:"网友",updateTime:"08/10 08:12",content:"很酷的HBuilderX和uni-app，开发一次既能生成小程序，又能生成App"},
            {imageurl:"https://ask.dcloud.net.cn/uploads/avatar/001/67/43/81_avatar_max.jpg",name:"网友",updateTime:"08/10 08:12",content:"很酷的HBuilderX和uni-app，开发一次既能生成小程序，又能生成App"},
             {imageurl:"https://ask.dcloud.net.cn/uploads/avatar/001/67/43/81_avatar_max.jpg",name:"网友",updateTime:"08/10 08:12",content:"很酷的HBuilderX和uni-app，开发一次既能生成小程序，又能生成App"}
        ],
        inputInfo:'',
      };
    },
    onLoad(e) {
      this.id = e.id;
      //获取帖子的信息
      this.getTiesById(e);
      //获取用户信息
      this.getUserInfo();
      let x={
        post_id:e.id,
        type_id:1
      }
      console.log(x)
      //获取评论信息
      this.getComment(x);
    },
    methods: {
      getTiesById(e) {
        uni.showLoading({
          title: "数据加载中...",
        })
        getTiesDetail(this.id).then(res => {
          res.data.data.userPhoto=this.$beforeImgUrl + res.data.data.userPhoto
          res.data.data.imgUrl = res.data.data.imgUrl.map(url => this.$beforeImgUrl + url);
          this.options = res.data.data
          console.log(this.options)
          uni.hideLoading()
        }).catch(err => {
          console.log(err)
        })
      },
      formatDateTime(dateTime) {
        var date = new Date(dateTime);
        var year = date.getFullYear();
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);
        var hours = ("0" + date.getHours()).slice(-2);
        var minutes = ("0" + date.getMinutes()).slice(-2);
        var seconds = ("0" + date.getSeconds()).slice(-2);
      
        return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
      },
      //帖子的评论
      getComment(x){
        getComments(x).then(res => {
          let code = res.data.code;
          if (code == '00000') {
            console.log('before',res.data.data)
            this.commentList = res.data.data.map(item => {
              return {
                updateTime: this.formatDateTime(item.create_time),
                imageUrl: 'http://49.234.47.245:8888'+item.imageUrl,
                name: item.nickName,
                content: item.title
              };
            });
            console.log('评论',this.commentList)
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
            if (res.data.data.userPhoto!=''&& 'userPhoto' in res.data.data) {
              res.data.data.userPhoto = this.$beforeImgUrl + res.data.data.userPhoto;
            }
            this.userInfo = {
              userPhoto: res.data.data.userPhoto?res.data.data.userPhoto:'https://cdn.metaforo.io/upload/20230530/da782ee4c80a418bb10926fcd8510a2c.jpg',
              nickName: res.data.data.nickName?res.data.data.nickName:'新同学',
            }
            console.log(this.userInfo)
          } else {
            console.log("请求失败")
          }
        }).catch(err => {
          console.log(err)
        })
      },
      submitInfo(){
        console.log(this.inputInfo)
        this.inputInfo='';
      },
    }
  }
</script>

<style lang="scss">
  .comment{
    display: flex;
    margin-top: 10rpx;
    justify-content: space-between;
    align-items: center;
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
        height: 70vh;
        margin-bottom: 26rpx;
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
  .input_content{
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    
  }
</style>