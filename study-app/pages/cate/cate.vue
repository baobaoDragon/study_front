<template>
  <view>
    <!-- 悬浮球 -->
    <view class="box">
      <dy-floating-ball class="dyFloatingBall" @diyEvent="diyEvent">
       <view class="ball" slot="ball">
       			<image class="image" src="@/static/Snipaste_2023-09-24_09-45-10.jpg" width="100rpx" height="100rpx" style="width: 100rpx; height: 100rpx;"></image>
       		</view>
      </dy-floating-ball>
    </view>
    <view class="top">
      <!-- 左边的选择年龄段 -->
      <view class="top_left">
        <u-picker :show="show" :columns="columns" @confirm="confirm" @cancel="cancel"></u-picker>
        <u-button @click="show = true" v-model="age">{{age}}</u-button>
      </view>
      <!-- 右边搜索 -->
      <view class="top_right">
        <u-search placeholder="搜索课程" v-model="keyword" :disabled="false" :showAction="true" @custom="searchClick"
          @search="searchClick" height="40" searchIconSize="30"></u-search>
      </view>
    </view>

    <view class="scroll-view-container">
      <!-- 左侧的滚动视图区域 -->
      <scroll-view class="left-scroll-view" scroll-y :style="{height: wh + 'px'}">
        <block v-for="(item, i) in classType" :key="i">
          <view :class="['left-scroll-view-item', item.c_id === active ? 'active' : '']" @click="activeChanged(item.c_id)">
            {{item.class_name}}
          </view>
        </block>
      </scroll-view>

      <!-- 右侧的滚动视图区域 -->
      <scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}" :scroll-top="scrollTop">
<!--          <image style="width: 90%; margin-left: 35rpx;border-radius: 10%;" mode="widthFix" src="https://img2.baidu.com/it/u=3669942714,3826938115&fm=253&fmt=auto&app=138&f=JPEG"></image> -->
        <view class="cate-lv3-list">
          <!-- 三级分类 Item 项 -->
          <view class="cate-lv3-item" v-for="(item2, i2) in cateLevel2" :key="i2" @click="gotoDetail(item2)">
            <!-- 图片 -->
            <image :src="item2.imageUrl" mode="scaleToFill" />
            <!-- 文本 -->
            <u--text :lines="2" :text="item2.title"></u--text>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  import {getClassType,getCourseList} from '@/network/course.js'
  import dyFloatingBall from '@/components/dy-floating-ball';
  export default {
    onLoad() {
      // 获取当前系统的信息
      const sysInfo = uni.getSystemInfoSync()
      // 为 wh 窗口可用高度动态赋值
      // 可用高度 = 屏幕高度 - navigationBar高度 - tabBar高度 - 自定义的search组件高度
      this.wh = sysInfo.windowHeight - 50
      this.getClassType(0);
      this.age='全部'

    },
    components:{dyFloatingBall},
    data() {
      return {
        show: false,
        age: '全部',
        columns: [
          ['全部','小学', '初中', '高中']
        ],
        keyword: '',
        classType:[],
        cateLevel2: [],
        wh: 0,
        active: 0,
        // 滚动条离顶部的距离
        scrollTop: 0
      };
    },
    methods: {
      confirm(e) {
        this.classId=e.indexs[0]
        console.log(this.classId)
        this.getClassType(this.classId)
        this.show = false
        this.age=e.value[0]
      },
      //获取左侧不同类型课程信息
      getClassType(e) {
        getClassType(e).then(res => {
          let code = res.data.code;
          if (code == '00000') {
            this.classType=res.data.data
            this.active=this.classType[0].c_id
            this.getCourseList(this.active);
          } else {
            console.log("请求失败")
          }
        }).catch(err => {
          console.log(err)
        })
      },
      //获取课程信息
      getCourseList(e) {
        console.log(e)
        getCourseList(e).then(res => {
          let code = res.data.code;
          if (code == '00000') {
            res.data.data.forEach((item, i) => {
              item.imageUrl = this.$beforeImgUrl + item.imageUrl
            })
            this.cateLevel2=res.data.data
            console.log(this.cateLevel2)
          } else {
            console.log("请求失败")
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 小球
      diyEvent(e) {
        if (e.num == 1) {
          uni.reLaunch({
            url: '/subpkg/user/ai_tools'
          })
        }
      },
      cancel() {
        this.show = false
      },
      // 选中项改变的事件处理函数
      activeChanged(i) {
        this.active = i
        this.getCourseList(i);
        // 为二级分类列表重新赋值
        this.scrollTop = this.scrollTop ? 0 : 1
      },
      searchClick(e) {
        console.log(e)
      },
      gotoDetail(item2) {
        uni.navigateTo({
          url: '/subpkg/course_detail/course_detail?c_id=' + item2.c_id
        })
      },
    }
  }
</script>

<style lang="scss">
  .image{
    border-radius: 50%;
  }
  .top {
    display: flex;
    z-index: 999;
    position: sticky;
    top: 0;
    .top_left {
      width: 28%;
      border-radius: 20rpx;
      border: #ffffff;
    }
    
   

    .top_right {
      margin-top: 20rpx;
      margin-left: 12rpx;
      width: 72%;
    }
  }

  .scroll-view-container {
    display: flex;

    .left-scroll-view {
      width: 300rpx;

      .left-scroll-view-item {
        line-height: 50px;
        background-color: #f7f7f7;
        text-align: center;
        font-size: 12px;

        // 激活项的样式,既包含active类名，也包含left-scroll-view-item这个类名触发
        &.active {
          background-color: #ffffff;
          position: relative;

          // 渲染激活项左侧的红色指示边线
          &::before {
            content: ' ';
            display: block;
            width: 3px;
            height: 30px;
            background-color: #05d6fe;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
  }

  .right-scroll-view {
    padding-top: 40rpx;
    .cate-lv2-title {
      font-size: 12px;
      font-weight: bold;
      text-align: center;
      padding: 15px 0;
      .right-scroll-view-image{
        justify-content: center;
        width: 80%;
        border-radius: 10px; /* 设置圆角半径 */
        image{
           width: 100%;
           border-radius: 10px; /* 继承圆角半径 */
        }
      }
    }

    .cate-lv3-list {
      display: flex;
      padding-left: 10rpx;
      //一行呈现不了，自动换行
      flex-wrap: wrap;
      .cate-lv3-item {
        width: 43%;
        margin-bottom: 10px;
        margin-right: 28rpx;
        margin-left: 10rpx;
        display: flex;
        //纵向对准
        flex-direction: column;
        //横向居中
        // align-items: center;
 

        image {
          width: 240rpx;
          height: 200rpx;
          border-radius: 10rpx;
          box-shadow: 1px 1px 2px 2px #ccc;
        }

        text {
          font-size: 12px;
        }
      }
    }
  }
</style>