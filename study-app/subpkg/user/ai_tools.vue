<template>
  <view class="main">
    <view class="top">
      <u-navbar title="玩吧——AI体验" @leftClick="leftClick" :autoBack="true">
      </u-navbar>
    </view>
    <scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}">
      <view class="cate-lv3-list">
        <!-- 三级分类 Item 项 -->
        <view class="cate-lv3-item" v-for="(item2, i2) in aiTools" :key="i2" @click="mycat(i2)">
          <!-- 图片 -->
          <image :src="item2.imageUrl" mode="scaleToFill" />
          <!-- 文本 -->
          <text>{{item2.name}}</text>
        </view>
      </view>
      <view class="box">
        <u-picker :show="show" :columns="columns" @confirm="confirm" @cancel="cancel"></u-picker>
        <u-button @click="show = true" type="defalt">{{title}}</u-button>
        <view class="button">
          <u-button type="primary" @click="toupiao">投票</u-button>
          <u-button type="defalt" @click="quxiao">取消</u-button>
        </view>
      </view>
    </scroll-view>

  </view>
</template>

<script>
  export default {
    onLoad() {
      // 获取当前系统的信息
      const sysInfo = uni.getSystemInfoSync()
      this.wh = sysInfo.windowHeight
    },
    data() {
      return {
        wh: 0,
        title: '选择一个喜欢的APP投票',
        aiTools: [{
            imageUrl: '../../static/01.png',
            name: '聊天机器人'
          }, {
            imageUrl: '../../static/02.png',
            name: '音乐歌词生成器'
          },
          {
            imageUrl: '../../static/03.png',
            name: '文档生成器'
          },
          {
            imageUrl: '../../static/04.png',
            name: '图片找视频'
          },
          {
            imageUrl: '../../static/05.jpg',
            name: '图片漫画风'
          },
          {
            imageUrl: '../../static/06.jpg',
            name: '查找错别字'
          }
        ],
        show: false,
        columns: [
          ['GPT聊天', '音乐歌词生成器', '文档生成器', '图片找视频', '图片漫画风', '查找错别字']
        ],
      };
    },
    methods: {
      rightClick() {
        console.log('rightClick');
      },
      leftClick() {
        uni.switchTab({
          url: '/pages/home/home'
        })
      },
      confirm(e) {
        console.log(e.value)
        this.show = false
        this.title = e.value[0]
      },
      mycat(e) {
        if (e == 0) {
          var url = 'https://c.binjie.fun/#/chat/1692860304066'
        } else if (e == 1) {
          var url =
            'https://inspiration.baidu.com/app/use?appID=568fd95e7c1c49e1b99b35192c189587&is_immersed=0&source=inspiration_resultpage_demo1&tplname=ins_application_card&srcid=52235&lid=c9f32a060069fcbf&order=7&isNewPage=0'
        } else if (e == 2) {
          var url = 'https://essay.1ts.fun/'
        } else if (e == 3) {
          var url = 'https://trace.moe/'
        } else if (e == 4) {
          uni.navigateTo({
            url: "/subpkg/user/ai_tools_five",
          })
          return
        } else if (e == 5) {
          uni.navigateTo({
            url: "/subpkg/user/ai_tools_six",
          })
          return
        }
        uni.navigateTo({
          url: '/subpkg/user/ai_tools_detail?url=' + url
        })
      },
      back() {
        uni.navigateBack()
      },
      cancel() {
        this.show = false
      },
      toupiao() {
        uni.showToast({
          title: "投票成功！！！"
        })
      },
      quxiao() {
        this.title = "选择一个喜欢的APP投票"
      }
    }
  }
</script>

<style lang="scss">
  page {
    background-image: url('https://hbimg.huabanimg.com/f4fa90eceb1b3a70e0a381e5c465427754c08cd87839c-nGfppC_fw658');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .box {
    margin-left: 20rpx;
    margin-top: 100rpx;
    border-radius: 25rpx;
    background-color: rgba(255, 255, 255, 0.85);
    /* 使用 rgba() 函数设置背景颜色，最后一个参数 (0.5) 是透明度，取值范围为 0 到 1 */
    width: 700rpx;
    height: 150rpx;

    .button {
      display: flex;
    }
  }

  .right-scroll-view {
    margin-top: 150rpx;

    .cate-lv2-title {
      font-size: 12px;
      font-weight: bold;
      text-align: center;
      padding: 15px 0;

      .right-scroll-view-image {
        justify-content: center;
        width: 80%;
        border-radius: 40rpx;

        /* 设置圆角半径 */
        image {
          width: 100%;
          border-radius: 40px;
          /* 继承圆角半径 */
        }
      }
    }

    .cate-lv3-list {
      display: flex;
      //一行呈现不了，自动换行
      flex-wrap: wrap;
      justify-content: space-around;

      .cate-lv3-item {
        width: 45%;
        margin-bottom: 10px;
        display: flex;
        //纵向对准
        flex-direction: column;
        //横向居中
        align-items: center;

        image {
          width: 300rpx;
          height: 300rpx;
          border-radius: 65rpx;
          box-shadow: 1px 1px 2px 2px #ccc;
        }

        text {
          margin-top: 8rpx;
          font-size: 24px;
          border-radius: 20rpx;
          /* 设置边框宽度、样式和颜色 */
          padding: 5px;
          color: #333333;
        }
      }
    }
  }
</style>