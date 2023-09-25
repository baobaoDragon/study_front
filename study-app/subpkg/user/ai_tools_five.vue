<template>
  <view class="form">
    <view class="label"></view>
    <view class="upload" @tap="imgClick">
      <view class="box">
        <image class="tupian" :src="backUrl !== '' ? backUrl : '../../static/tupian.png'" width="60rpx" height="60rpx"
          style="width: 80rpx; height: 80rpx;" mode=""></image>
        <view class="text1">本地上传</view>
        <view class="text2">支持PNG、JPG格式</view>
        <view class="text2">图片大小限制40MB</view>
      </view>
    </view>

    <view class="btnTotal">
      <button class="btn1" type="default" @click="getImg">点击显示图片</button>
      <button class="btn2" type="default" @click="clearImg">点击清除图片</button>
    </view>
    <view v-if="newUrl!=''">
      <image class="pic" mode="widthFix" :src="newUrl" />
    </view>
    <view style="margin-top: 150rpx;" v-else>
      <view style="width: 100%; display: flex; align-items: center;">
        <text style="text-align: center; margin: 0 auto; margin-bottom: 15rpx;">使用示例图片快速体验</text>
      </view>
      <view class="bottom">
        <view class="item" v-for="(item,i) in imgArr" :key="i">
          <img :src="item" @click="BottoomImgClick(item)" alt="" width="160rpx" height="160rpx" style="width: 160rpx;height: 160rpx;">
        </view>
      </view>
    </view>

  </view>

</template>

<script>
  export default {
    data() {
      return {
        imageUrl: '',
        backUrl: '',
        newUrl: '',
        imgArr: ['https://img1.baidu.com/it/u=4116001374,4136377116&fm=253&fmt=auto&app=138&f=JPEG?w=380&h=380',
          'https://img1.baidu.com/it/u=1442687259,2123439503&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400',
          'https://img0.baidu.com/it/u=3714972353,2109851587&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400',
          'https://img2.baidu.com/it/u=301682273,1331391234&fm=253&fmt=auto&app=138&f=JPEG?w=450&h=450'
        ],
      };
    },
    onLoad() {},
    methods: {
      imgClick() {
        var _that = this;
        uni.chooseImage({
          count: 1,
          sizeType: ['compressed'],
          sourceType: ['album'],
          success: function(res) {
            const tempFilePaths = res.tempFilePaths;
            _that.backUrl = res.tempFilePaths[0];
            uni.showLoading({
              title: "正在生成图片"
            })
            uni.uploadFile({
              url: 'http://49.234.47.245:8888/api/front/resource/image', //上传图片api
              filePath: tempFilePaths[0],
              name: 'file',
              header: {
                "Authorization": uni.getStorageSync('token')
              },
              success: (res) => {
                console.log(res)
                this.group = JSON.parse(res.data)
                console.log(this.group.data) //"/image/2023\09\19\6a873ef75797c735bf9bed91a6bc4e6e.jpg"
                uni.request({
                  url: 'https://eolink.o.apispace.com/pic2comicstyle/api/v1/forward/pic2cartoon', //仅为示例，并非真实接口地址。
                  data: {
                    image_url: 'http://49.234.47.245:8888' +this.group.data
                  },
                  header: {
                    'custom-header': 'hello',
                    'X-APISpace-Token': 'hz8mgrmbdord8a0kniam0vpqtdmzlwzw',
                    'Authorization-Type': 'apikey',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': '*/*'
                  },
                  method: 'POST',
                  success: (res) => {
                    uni.hideLoading()
                    _that = this
                    console.log(res);
                    _that.imageUrl = res.data.data.file_path
                    uni.setStorageSync('img', res.data.data.file_path)
                    this.newUrl = _that.imageUrl
                  }
                });
              }
            });
          }
        })
      },
      BottoomImgClick(item){
        uni.showLoading({
          title:'正在生成图片'
        })
        //点击实例图片
        uni.request({
          url: 'https://eolink.o.apispace.com/pic2comicstyle/api/v1/forward/pic2cartoon', //仅为示例，并非真实接口地址。
          data: {
            image_url: item
          },
          header: {
            'custom-header': 'hello',
            'X-APISpace-Token': 'hz8mgrmbdord8a0kniam0vpqtdmzlwzw',
            'Authorization-Type': 'apikey',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': '*/*'
          },
          method: 'POST',
          success: (res) => {
            uni.hideLoading()
            uni.setStorageSync('img', res.data.data.file_path)
            this.newUrl = res.data.data.file_path
          }
        });
      },
      getImg() {
        this.newUrl = uni.getStorageSync('img')
      },
      clearImg() {
        this.newUrl = ''
        uni.removeStorageSync('img')
      },
    }
  }
</script>

<style lang="scss">
  .form {
    background: linear-gradient(to bottom, #b1b8cd, #ffffff);
    height: 1200rpx;

    .label {
      color: #737493;
      height: 30rpx;
    }

    .btnTotal {
      margin-top: 20rpx;
    }

    .btn1 {
      color: #737493;
      width: 300rpx;
      float: left;

      margin-left: 60rpx;
    }

    .btn2 {
      color: #737493;
      width: 300rpx;
    }
  }

  .bottom {
    margin: 0 auto;
    width: 90%;
    height: 160rpx;
    display: flex;
    justify-content: space-around;

    .item {
      width: 160rpx;
      border: 1px solid #bbc1d3;
    }
  }

  .upload {
    margin: auto;
    width: 400rpx;
    height: 400rpx;
    border: 1px dashed #909cb7;
    background-color: #e3e8f4;
    border-radius: 10px;
    margin-bottom: 40rpx;

    .box {
      margin-top: 100rpx;
      margin-left: 50rpx;
      width: 300rpx;
      height: 300rpx;

      .tupian {
        margin-left: 120rpx;
      }
    }
  }

  .text1 {
    color: #737493;
    font-weight: bold;
    margin-left: 80rpx;
    font-size: 18px;
    margin-top: 10rpx;
    margin-bottom: 10rpx;
  }

  .text2 {
    margin-top: 5rpx;
    color: #aeb0d0;
    margin-left: 30rpx;
    font-size: 14px;
  }

  .pic {
    width: 750rpx;
    height: 700rpx;
    padding-top: 40rpx;
    margin: auto;
  }

  .avatar-wrap {
    border: 0;
    background-color: #ffffff;
    height: 158rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32rpx;

    .avatar {
      margin-right: 10rpx;
    }

    .ipt {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    img {
      width: 118rpx;
      height: 118rpx;
    }
  }
</style>