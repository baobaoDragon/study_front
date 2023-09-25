<template>
  <view>
    <view class="search-box">
      <u-search :clearabled="true" @clear clearabled  focus  @custom='searchClick' @search="searchClick" placeholder="请输入搜索内容" v-model="sr"></u-search>
    </view>
    <!-- 搜索建议列表 -->
    <view class="sugg-list" v-if="searchResults.length!==0">
      <view class="sugg-item" v-for="(item,i) in searchResults" :key="i" @click="gotoDetail(item)">
        <view class="good-name">{{item.goods_name}}</view>
        <u-icon name="arrowright" size="16"></u-icon>
      </view>
    </view>
    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <!-- 标题区域 -->
      <view class="history-title">
        <text>搜索历史</text>
        <u-icon name="trash" size="17" @click="clean"></u-icon>
      </view>
      <!-- 列表区域 -->
      <view class="history-list">
        <view class="u-tag">
          <u-tag v-for="(item,i) in histories" :key="i" :text="item"  shape="circle" plain style="margin-right: 10rpx;" @click="searchhistory(item)"></u-tag>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer:null,
        sr:"",
        //搜索的结果列表
        searchResults:[],
        historyList:['a','b','c']
      };
    },
    onLoad(){
      this.historyList=JSON.parse(uni.getStorageSync('sr')||'[]')
    },
    methods:{
      searchClick(e){
        if(e==""){
          return
        }
        const set =new Set(this.historyList)
        set.delete(e)
        set.add(e)
        this.historyList=Array.from(set)
        //持久化保存在本地
        uni.setStorageSync('sr',JSON.stringify(this.historyList))
      },
      
      // async getSearchList(){
      //   //判断搜索关键词是否为空
      //   if(this.sr.length===0){
      //     this.searchResults=[]
      //     return
      //   }
      //   //如果有关键词，去调用接口
      //   const {data:res} = await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.sr})
      //   if(res.meta.status!==200) return uni.$showMsg()
      //   this.searchResults=res.message
      //   this.saveSearchHistory()
      // },
      // gotoDetail(item){
      //   uni.navigateTo({
      //     url:'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id
      //   })
      // },
      //保存搜索记录
      clean(){
        this.historyList=[]
        uni.setStorageSync('sr','[]')
      },
      searchhistory(item){
        this.sr=item
        const set =new Set(this.historyList)
        set.delete(item)
        set.add(item)
        this.historyList=Array.from(set)
        //持久化保存在本地
        uni.setStorageSync('sr',JSON.stringify(this.historyList))
      }
    //   gotoGoodsList(item){
    //     uni.navigateTo({
    //       url:'/subpkg/goods_list/goods_list?query='+item
    //     })
    //   }
    },
    // //计算
    computed:{
      histories(){
        return [...this.historyList].reverse()
      }
    }
  }
</script>

<style lang="scss">
.search-box{
  margin: 10rpx;
  position: sticky;
  top: 0;
  z-index: 999;
}

.sugg-list {
  padding: 0 5px;
  .sugg-item {
    font-size: 12px;
    padding: 13px 0;
    border-bottom: 1px solid #efefef;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .goods-name {
      // 文字不允许换行（单行文本）
      white-space: nowrap;
      // 溢出部分隐藏
      overflow: hidden;
      // 文本溢出后，使用 ... 代替
      text-overflow: ellipsis;
      margin-right: 3px;
    }
  }
}

.history-box {
  padding: 0 5px;
  .history-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    font-size: 13px;
    border-bottom: 1px solid #efefef;
  }
  .history-list {
    display: flex;
    flex-wrap: wrap;
    .u-tag {
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;
      margin-left: 10px;
    }
  }
}
</style>

