<template>
  <view class="content">
    <zero-waterfall :list="dataList"></zero-waterfall>
    <zeroLoad bg-color="rgb(240, 240, 240)" :status="loadStatus" @clickLoadMore='loadMore'></zeroLoad>
  </view>
</template>

<script>
  import zero from "@/uni_modules/zero-lazy-load/components/zero-lazy-load/zero-lazy-load.vue"
  import {
    getTiesList
  } from "@/network/ties.js"
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
      this.getTieInfo();
    },
    data() {
      return {
        TieArr: [],
        loading: false,
        dataList: [],
        loadStatus: 'more',
        page: 1,
        pageSize: 5,
      };
    },
    components: {
      zeroLoad: zero
    },
    onReachBottom() {
      if (this.dataList.length >= this.TieArr.length) {
        this.loadingStatus = 'noMore'
      } else {
        this.loadStatus = 'more';
        setTimeout(() => {
          this.loadMore();
          this.loadStatus = 'loadmore';
        }, 10)
      }
    },
    methods: {
      getTieInfo() {
        //获取帖子信息
        getTiesList().then(res => {
          console.log(res)
          let code = res.data.code;
          if (code == '00000') {
            res.data.data.forEach((item, i) => {
              item.imageUrl = this.$beforeImgUrl + item.imageUrl
            })
            this.TieArr = res.data.data;
            this.dataList = this.TieArr.slice(0, 5)
          } else {
            console.log("请求失败")
          }
        }).catch(err => {
          console.log(err)
        })
      },
      gotoDetail(item) {
        uni.navigateTo({
          url: "/subpkg/news_detail/news_detail?id=" + item.id
        })
      },
      loadMore() {
        this.loadStatus = 'loading';
        this.page++
        this.dataList = this.dataList.concat(this.TieArr.slice(this.dataList.length, this.page * this.pageSize))
      },
    }
  }
</script>

<style lang="scss">
</style>