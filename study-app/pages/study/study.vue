<template>
  <view class="main" style="{height:100vh}">
    <view class="box">
      <dy-floating-ball class="dyFloatingBall" @diyEvent="diyEvent">
        <view class="ball" slot="ball">
        			<image class="image" src="@/static/Snipaste_2023-09-24_09-45-10.jpg" width="100rpx" height="100rpx" style="width: 100rpx; height: 100rpx;"></image>
        		</view>
      </dy-floating-ball>
    </view>
    <view class="top">
      <view class="left">
        <view>39天</view>
        <text>自习天数</text>
      </view>
      <view class="zhong">
        <view>23个</view>
        <text>收藏的课程</text>
      </view>
      <view class="right">
        <view>382题</view>
        <text>练习题目</text>
      </view>
    </view>
    <view class="background">
      <u-subsection :list="list" :current="curNow" @change="sectionChange" :fontSize="15" bold></u-subsection>

      <!-- 题库 -->
      <view class="page-main" v-if="curNow==0">
        <liu-slide-questions :dataList="questionList" @submit="subData"></liu-slide-questions>
      </view>
      <!-- 错题 -->
      <view class="page-main" v-else-if="curNow==1">
        <worngList></worngList>
      </view>

    </view>
  </view>
</template>

<script>
  import zero from "@/uni_modules/zero-lazy-load/components/zero-lazy-load/zero-lazy-load.vue"
  import worngList from "@/components/question-worng/question-worng.vue"
  import dyFloatingBall from '@/components/dy-floating-ball';
  import {
    getQuestionInfo
  } from "@/network/study.js"
  export default {
    props: {
      // 背景颜色
      bgcolor: {
        type: String,
        default: '#ffffff'
      },
      // 圆角尺寸
      radius: {
        type: Number,
        // 单位是 px
        default: 18
      }
    },
    onLoad() {
      //获取屏幕可用高
      this.wh = uni.getWindowInfo().windowHeight;
      // this.getQuestion();
    },
    data() {
      return {
        wh: 0,
        list: [{
          name: '题库'
        }, {
          name: '错题'
        }],
        curNow: 0,
        TieArr: [],
        loading: false,
        dataList: [],
        loadStatus: 'more',
        page: 1,
        pageSize: 10,
        questionList: [{
          id: '1',
          title: '在Python中，字符串是可变数据类型。',
          problemType: 'SINGLE',
          children: [{
            alias: 'A',
            answer: '正确',
            isSelect: 0 //这个是用来回显的字段(0:未选中；1:选中)(可不传)
          }, {
            alias: 'B',
            answer: '错误',
            isSelect: 0 //这个是用来回显的字段(0:未选中；1:选中)(可不传)
          }],
        }, {
          id: '2',
          title: '在Python中，以下哪些选项是用于文件读写操作的模式？',
          problemType: 'MULTY',
          children: [{
            alias: 'A',
            answer: '\"r\" (只读模式)',
            isSelect: 0 //这个是用来回显的字段(0:未选中；1:选中)(可不传)
          }, {
            alias: 'B',
            answer: '\"w\" (写入模式)',
            isSelect: 0 //这个是用来回显的字段(0:未选中；1:选中)(可不传)
          }, {
            alias: 'C',
            answer: '\"a\" (追加模式)',
            isSelect: 0 //这个是用来回显的字段(0:未选中；1:选中)(可不传)
          }, {
            alias: 'D',
            answer: '\"x\" (独占创建模式)',
            isSelect: 0 //这个是用来回显的字段(0:未选中；1:选中)(可不传)
          }],
        }, {
          id: '3',
          title: '在Python中，如何将一个字符串转换为整数？',
          problemType: 'SINGLE',
          children: [{
            alias: 'A',
            answer: 'str()',
            isSelect: 0 //这个是用来回显的字段(0:未选中；1:选中)(可不传)
          }, {
            alias: 'B',
            answer: 'int()',
            isSelect: 0 //这个是用来回显的字段(0:未选中；1:选中)(可不传)
          }, {
            alias: 'C',
            answer: 'float()',
            isSelect: 0 //这个是用来回显的字段(0:未选中；1:选中)(可不传)
          }, {
            alias: 'D',
            answer: 'bool()',
            isSelect: 0 //这个是用来回显的字段(0:未选中；1:选中)(可不传)
          }],
        }, {
          id: '4',
          title: '以下哪个选项是Python中用于创建注释的符号？',
          problemType: 'SINGLE',
          children: [{
            alias: 'A',
            answer: '//',
            isSelect: 0 //这个是用来回显的字段(0:未选中；1:选中)(可不传)
          }, {
            alias: 'B',
            answer: '/* */',
            isSelect: 0 //这个是用来回显的字段(0:未选中；1:选中)(可不传)
          }, {
            alias: 'C',
            answer: '#',
            isSelect: 0 //这个是用来回显的字段(0:未选中；1:选中)(可不传)
          }, {
            alias: 'D',
            answer: '---',
            isSelect: 0 //这个是用来回显的字段(0:未选中；1:选中)(可不传)
          }],
        }, {
          id: '5',
          title: '在Python中，以下哪些选项是可变数据类型？',
          problemType: 'MULTY',
          children: [{
            alias: 'A',
            answer: '字符串 (String)',
            isSelect: 0 //这个是用来回显的字段(0:未选中；1:选中)(可不传)
          }, {
            alias: 'B',
            answer: '列表 (List)',
            isSelect: 0 //这个是用来回显的字段(0:未选中；1:选中)(可不传)
          }, {
            alias: 'C',
            answer: '元组 (Tuple)',
            isSelect: 0 //这个是用来回显的字段(0:未选中；1:选中)(可不传)
          }, {
            alias: 'D',
            answer: '字典 (Dictionary)',
            isSelect: 0 //这个是用来回显的字段(0:未选中；1:选中)(可不传)
          }],
        }],
      }
    },
    components: {
      zeroLoad: zero,
      worngList,
      dyFloatingBall
    },
    methods: {
      sectionChange(index) {
        this.curNow = index;
      },
      //点击提交
      subData(data) {
        console.log('提交的数据：' + JSON.stringify(data))
        var datas = data
        var message = '';
        datas.forEach(item => {
          var answer;
          if (Array.isArray(item.userAnswer)) {
            // 如果是数组，表示选择了多个选项
            answer = item.userAnswer.map(option => {
              return option.alias;
            }).join(', ');
          } else {
            // 否则，输出单个选项
            answer = item.userAnswer.alias;
          }

          message += '题目 ' + item.id + ',你的选择:' + answer + '\n';
        });
        message += '正确：题目1,2,3,5   错误：题目4' + '\n';
        message += '题目4正确答案为C' + '\n';
        uni.showModal({
          title: '答案',
          content: message
        });
      },
      diyEvent(e) {
        if (e.num == 1) {
          uni.reLaunch({
            url: '/subpkg/user/ai_tools'
          })
        }
      },
      getQuestion() {
        getQuestionInfo().then(res => {
          let code = res.data.code;
          if (code == '00000') {
            console.log(res.data.data)
            this.questionList = res.data.data.map((item, i1) => ({
              id: item.id,
              title: item.text,
              problemType: item.type == 2 ? 'MULTY' : 'SINGLE',
              children: item.options.map((option, i) => ({
                alias: String.fromCharCode(65 + parseInt(i)),
                answer: option.text,
                isSelect: option.is_correct ? 1 : 0
              }))
            }));
            console.log(this.questionList)
          } else {
            console.log("请求失败")
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
  }
</script>
<style lang="scss">
  
  .image{
    border-radius: 50%;
  }
  .main {
    background-color: #e4edfe;
    width: 100%;
    padding-top: 20px;
    // padding-bottom: 20px;

    .top {
      display: flex;
      justify-content: space-around;
      text-align: center;
      background-color: #ffffff;
      border-radius: 20rpx;
      margin: 0 auto;
      width: 90%;
      height: 80rpx;
      padding: 10rpx;
    }

    .background {
      margin-top: 20px;
    }
  }
</style>