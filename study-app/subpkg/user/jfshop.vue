<template>
  <view>
    <view class="bar-list">
      <image src="@/static/jfshop.png" style="width: 100%;" mode="widthFix"></image>
    </view>
    <view style="text-align: center; font-size: 25px;">
      超值兑换
    </view>
    <view style="text-align: center; color: #0f8cb4;">拥有积分：5000</view>
    <u-divider textPosition="left" textColor="#2979ff" lineColor="#2979ff"></u-divider>
     <z-tabs style="background-color: #edeef2;" ref="tabs" :list="tabList" :current="current" @change="tabsChange" />
    <liu-waterfall :dataList="data" :column="columns" @click="click"></liu-waterfall>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        data: [{
          picUrl: 'https://cdn.pixabay.com/photo/2020/05/19/13/32/cartoon-5190837_1280.jpg',
          title: '思考',
          desc: '我是第1个图片',
          id: 1,
        }, {
          picUrl: 'https://cdn.pixabay.com/photo/2021/07/22/11/25/rabbit-6485072_1280.jpg',
          title: '兔子',
          desc: '我是第2个图片',
          id: 2,
        }, {
          picUrl: 'https://cdn.pixabay.com/photo/2020/05/19/13/35/cartoon-5190860_1280.jpg',
          title: '雨天',
          desc: '我是第3个图片',
          id: 3,
        }, {
          picUrl: 'https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png',
          title: '日落',
          desc: '我是第4个图片',
          id: 4,
        }, {
          picUrl: 'https://cdn.pixabay.com/photo/2022/11/29/19/05/boho-7625140_1280.jpg',
          title: '   hajklhfhjlahjklfhajklfhdjkhfjkahfjkfhadjkfhafhafjklahfajlkfjklfhjf',
          desc: '我是第5个图片',
          id: 5,
        }, {
          picUrl: 'https://cdn.pixabay.com/photo/2022/08/25/23/06/woman-7411414_1280.png',
          title: '时尚',
          desc: '我是第6个图片',
          id: 6,
        }],
        columns: 2,
        tabList: ['推荐', '不推荐'],
        current: 0, // tabs组件的current值，表示当前活动的tab选项
      };
    },
    methods: {
      click(e) {
        uni.showModal({
          title: '提示',
          content: '是否兑换该商品',
          success: function(res) {
            if (res.confirm) {
              console.log(res,e);
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          }
        });
      },
      tabsChange(index) {
        console.log(index)
        this.current = index;
      },
    },
  };
</script>

<style scoped lang="scss">
  page {
    background-color: #edeef2;
  }

  .bar-list {
    margin: 20rpx;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    view {
      width: 33%;
      height: 70rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28rpx;
      color: #FFFFFF;
      background-color: #59a3f8;
      border-radius: 8rpx;
      margin-right: 20rpx;
    }
  }
</style>