<template>
  <view>
    <view style="width: 90%; border-radius: 2rpx; margin: auto;">
      <view class="box">
        <dy-floating-ball class="dyFloatingBall" @diyEvent="diyEvent">
          <view class="ball" slot="ball">
            <image class="image" src="@/static/Snipaste_2023-09-24_09-45-10.jpg" width="100rpx" height="100rpx"
              style="width: 100rpx; height: 100rpx;"></image>
          </view>
        </dy-floating-ball>
      </view>
      <!-- 标题的输入 -->
      <view class="textInput" style="margin-top: 30rpx">
        <u-input placeholder="请输入标题内容" v-model="title"></u-input>
        <!-- <u--textarea v-model="title" placeholder="请输入标题内容" count></u--textarea> -->
      </view>
      <!-- 内容的输入 -->
      <view class="textInput" style="margin-top: 20rpx;">
        <u--textarea v-model="content" placeholder="请输入正文内容" count></u--textarea>
      </view>
      <!-- 图片的输入 -->
      <view class="photoInput">
        <u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple :maxCount="10"
          :previewFullImage="true">
          <image src="@/static/Snipaste_2023-09-24_11-30-42.png" mode="widthFix"
            style="width: 400rpx;height:400rpx;margin: 50rpx 150rpx ;" ></image>
        </u-upload>
      </view>


      <!-- 发布 -->
      <view class="fabu">
        <u-button text="发布" color="linear-gradient(to right, rgb(237, 227, 254), rgb(125, 122, 251),rgb(253, 204, 251))"
          @click="submit"></u-button>
      </view>
    </view>



  </view>
</template>

<script>
  import dyFloatingBall from '@/components/dy-floating-ball';
  import {
    addTie
  } from "@/network/ties.js"
  export default {
    components: {
      dyFloatingBall
    },
    data() {
      return {
        title: '',
        content: '',
        fileList1: [],
        reqList: []
      }
    },
    methods: {
      diyEvent(e) {
        if (e.num == 1) {
          uni.reLaunch({
            url: '/subpkg/user/ai_tools'
          })
        }
      },
      // 删除图片
      deletePic(event) {
        this[`fileList${event.name}`].splice(event.index, 1)
      },
      // 新增图片
      async afterRead(event) {
        // 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
        let lists = [].concat(event.file)
        let fileListLen = this[`fileList${event.name}`].length
        lists.map((item) => {
          this[`fileList${event.name}`].push({
            ...item,
            status: 'uploading',
            message: '上传中'
          })
        })
        for (let i = 0; i < lists.length; i++) {
          const result = await this.uploadFilePromise(lists[i].url)
          let item = this[`fileList${event.name}`][fileListLen]
          this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
            status: 'success',
            message: '',
            url: result
          }))
          fileListLen++
        }
      },
      uploadFilePromise(url) {
        console.log(url)
        return new Promise((resolve, reject) => {
          let a = uni.uploadFile({
            url: 'http://49.234.47.245:8888/api/front/resource/image', // 仅为示例，非真实的接口地址
            filePath: url,
            name: 'file',
            header: {
              "Authorization": uni.getStorageSync('token')
            },
            success: (res) => {
              console.log(res)
              // 解析JSON字符串
              let data = JSON.parse(res.data);
              // 获取"data"的值
              let imageUrl = data.data;
              console.log(imageUrl);
              this.reqList.push(imageUrl)
              setTimeout(() => {
                resolve(res.data.data)
              }, 1000)
            }
          });
        })
      },
      submit() {
        let ties = {
          title: this.title,
          content: this.content,
          imageUrl: this.reqList
        }
        addTie(ties).then(res => {
          let code = res.data.code;
          if (code == '00000') {
            setTimeout(()=>{
              uni.showToast({
                title:"发布成功"
              })
            },1000)
           uni.switchTab({
             url:"/pages/home/home"
           })
            
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
  .image {
    border-radius: 50%;
  }
</style>