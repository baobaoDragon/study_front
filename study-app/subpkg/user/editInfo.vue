<template>
  <view class="userInfo">
    <view class="form">
      <button class="avatar-wrap" open-type="chooseAvatar" @tap="imgClick1">
        <view class="label"> 头像 </view>
        <view class="ipt">
          <img class="avatar" :src="userInfo.userPhoto ? userInfo.userPhoto : '/static/my/tx.png'" />
          <uni-icons class="arrow-right" type="right" size="20"></uni-icons>
        </view>
      </button>
      <button class="avatar-wrap" open-type="chooseAvatar" @tap="imgClick2">
        <view class="label"> 背景 </view>
        <view class="ipt">
          <img class="avatar" :src="userInfo.backUrl ? userInfo.backUrl : '/static/my/bj.png'" />
          <uni-icons class="arrow-right" type="right" size="20"></uni-icons>
        </view>
      </button>
    </view>
    <view class="info_nickname">
      <view class="nickname_left"> 昵称 </view>
      <view class="nickname_right">
        <input v-model="userInfo.nickName" placeholder="请输入您的昵称" />
      </view>
    </view>
    <view class="info_nickname">
      <view class="nickname_left"> 性别 </view>
      <view class="nickname_right gender">
        <picker @change="sex" :range="sexArray" style="margin-right: 10rpx">
          <label class="">{{ sexArray[sexIndex] }}</label>
        </picker>
        <uni-icons class="arrow-right" type="right" size="20" style="margin-top: 5rpx"></uni-icons>
      </view>
    </view>
    <view class="info_nickname">
      <view class="nickname_left"> 手机号 </view>
      <view class="nickname_right">
        <view class="showphone">
          1311****566
        </view>
      </view>
    </view>
    <view class="btn-wrap">
      <button type="primary" class="btn" @click="saveinfo">修改</button>
    </view>
  </view>
</template>

<script>
  import {
    getUserInfo,
    updateUserInfo
  } from "@/network/user.js"
  export default {
    data() {
      return {
        nickname: '',
        sexArray: ['男', '女'],
        sexIndex: 0,
        sexArrayType: '',
        phone: '',
        userInfo: {},
        tempImg:{}
      }
    },
    onLoad() {
      this.getUserInfo()
    },
    methods: {
      getUserInfo() {
        getUserInfo().then(res => {
          let code = res.data.code;
          if (code == '00000') {
            if (res.data.data.backUrl != '' && 'backUrl' in res.data.data) {
              res.data.data.backUrl = this.$beforeImgUrl + res.data.data.backUrl;
            }
            if (res.data.data.userPhoto != '' && 'userPhoto' in res.data.data) {
              res.data.data.userPhoto = this.$beforeImgUrl + res.data.data.userPhoto;
            }
            this.tempImg={
              backUrl:res.data.data.backUrl,
              userPhoto:res.data.data.userPhoto
            }
            this.userInfo = {
              backUrl: res.data.data.backUrl ? res.data.data.backUrl : '',
              nickName: res.data.data.nickName ? res.data.data.nickName : '新同学',
              userSex: res.data.data.userSex ? res.data.data.userSex : 0,
              userPhoto: res.data.data.userPhoto ? res.data.data.userPhoto : '',
            }
            this.sexIndex=this.userInfo.userSex
            console.log('userinfo',this.userInfo)
          } else {
            console.log("请求失败")
          }
        }).catch(err => {
          console.log(err)
        })
      },
      change(e) {
        console.log('e:', e)
      },
      sex(e) {
        this.sexIndex = e.target.value
        this.sexArrayType = this.sexArray[this.sexIndex]
        console.log(e)
      },
      saveinfo() {
        let info = {
          nickName: this.userInfo.nickName,
          userSex: this.sexIndex,
          backUrl: uni.getStorageSync('bjImg')?uni.getStorageSync('bjImg'):uni.getStorageSync('userInfo').backUrl,
          userPhoto: uni.getStorageSync('txImg')?uni.getStorageSync('txImg'):uni.getStorageSync('userInfo').userPhoto
        }
        console.log('info',info)
        updateUserInfo(info).then(res => {
          let code = res.data.code;
          if (code == '00000') {
            uni.showToast({
              title:"更新数据成功"
            })
            uni.setStorageSync('userInfo',info)
            uni.removeStorageSync('bjimg')
            uni.removeStorageSync('tximg')
          } else {
            console.log("请求失败")
          }
        }).catch(err => {
          console.log(err)
        })
      },
      //点击图片的时候执行
      imgClick1() {
        var _that = this;
        uni.chooseImage({
          count: 1,
          sizeType: ['compressed'],
          sourceType: ['album'],
          success: function(res) {
            const tempFilePaths = res.tempFilePaths;
            _that.userInfo.userPhoto = res.tempFilePaths[0];
            console.log(_that.userInfo.userPhoto)
            uni.uploadFile({
              url: 'http://49.234.47.245:8888/api/front/resource/image', //上传图片api
              filePath: tempFilePaths[0],
              name: 'file',
              header: {
                "Authorization": uni.getStorageSync('token')
              },
              success: (res) => {
                this.group = JSON.parse(res.data)
                console.log(this.group)
                uni.setStorageSync('txImg', this.group.data)
              }
            });
          }
        })
      },
      imgClick2() {
        var _that = this;
        uni.chooseImage({
          count: 1,
          sizeType: ['compressed'],
          sourceType: ['album'],
          success: function(res) {
            const tempFilePaths = res.tempFilePaths;
            _that.userInfo.backUrl = res.tempFilePaths[0];
            console.log(_that.userInfo.backUrl)
            uni.uploadFile({
              url: 'http://49.234.47.245:8888/api/front/resource/image', //上传图片api
              filePath: tempFilePaths[0],
              name: 'file',
              header: {
                "Authorization": uni.getStorageSync('token')
              },
              success: (res) => {
                this.group = JSON.parse(res.data)
                uni.setStorageSync('bjImg', this.group.data)
              }
            });
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  button::after {
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
  }

  .userInfo {
    font-size: 34rpx;
    font-weight: 400;
    color: #333333;
    height: 100%;
    position: relative;

    .form {
      background-color: #ffffff;
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
      }

      img {
        width: 118rpx;
        height: 118rpx;
      }
    }

    .info_nickname {
      border-bottom: 1px solid #e9e9e9;
      height: 112rpx;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 32rpx;
      // justify-content: space-between;

      .nickname_left {}

      .nickname_right {
        input {
          text-align: right;
        }
      }

      .gender {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .btn-wrap {

      bottom: 50rpx;
      width: 100%;
      text-align: center;

      .btn {
        width: 690rpx;
        height: 88rpx;
      }
    }
  }
</style>