<template>
  <view class="form">
    
       <image width="750rpx" height="420rpx" style="width: 750rpx; height: 420rpx; margin-bottom: 7%;" src="../../static/my/ai_six1.jpg"></image>

   
    <view class="input-wrapper">
      <u-textarea v-model="inputInfo" height="400rpx" placeholder="请输入需要检测的文本内容"  count maxlength="300"></u-textarea>
    </view>
    <view class="btn">
      <u-button text="检测" style="background-color: #963da7; color: azure;" @click="submitInfo"></u-button>
    </view>
    
    <view class="result-list" v-if="resultList.length">
      <view class="result-item" v-for="(item, i) in resultList" :key="i">
        <text class="result-text">{{ item.text }}</text>
        <text class="result-loc">位置：{{ item.start + 1 }}——{{ item.end }}</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        inputInfo: '',
        resultList: {}
      };
    },
    computed: {
      coloredInputInfo() {
        if (this.inputInfo.length >= 19) {
          const startIndex = 17;
          const endIndex = 19;
          const beforeText = this.inputInfo.substring(0, startIndex);
          const coloredText = '<span style="color: red;">' + this.inputInfo.substring(startIndex, endIndex) + '</span>';
          const afterText = this.inputInfo.substring(endIndex);
          return beforeText + coloredText + afterText;
        } else {
          return this.inputInfo;
        }
      }
    },
    methods: {
      submitInfo() {
        uni.showLoading({
          title: "正在检测..."
        })
        uni.request({
          url: 'https://23331.o.apispace.com/text-detection/check', //仅为示例，并非真实接口地址。
          data: {
            text: this.inputInfo
          },
          header: {
            'custom-header': 'hello',
            'X-APISpace-Token': 'hz8mgrmbdord8a0kniam0vpqtdmzlwzw',
            'Authorization-Type': 'apikey',
            'Content-Type': 'application/json',
            'Accept': '*/*'
          },
          method: 'POST',
          success: (res) => {
            console.log(res.data.result[0].mistakes)
            const data = res.data.result[0].mistakes
            const result = data.map(([desc, text]) => ({
              start: desc[0],
              end: desc[1],
              text: text[0][0]
            }));
            uni.hideLoading();
            this.resultList = result
            console.log(this.resultList)
          }
        });
      }
    }
  }
</script>

<style lang="scss">
  .form {
    background: linear-gradient(to bottom, #de9cea, #ffffff);
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
    height: 1500rpx;
  }
  
  .btn{
    width: 300rpx;
    background-color: #963da7;
  }

  .input-wrapper {
    width: 98%;
    // margin-top: 20%;
    margin-bottom: 10%;
  }

  .result-list {

    width: 80%;
  }

  .result-item {
    // margin-top: 10px;
  }

  .result-text {
    font-size: 20px;
    color: #333;
    display: flex;
  }

  .result-loc {
    font-size: 14px;
    color: #999;
    text-align: right;
    line-height: 14px;
    justify-content: flex-end;
  }
</style>