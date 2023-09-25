<script>
  import routingIntercept from '@/router/route.js'
  export default {
    onLaunch: function() {
      console.log('App Launch')
      // 对路由进行统一拦截，实现路由导航守卫 router.beforeEach 功能
      routingIntercept()
    },
    onShow: function() {
      console.log('App Show')
    },
    onHide: function() {
      console.log('App Hide')
    }
  }
</script>

<style lang="scss">
  /*每个页面公共css */
  @import "@/uni_modules/uview-ui/index.scss";
  
  .uni-tabbar {
    .uni-tabbar__bd {
      // tabBar 单项
      height: 65px !important;

      .uni-tabbar__icon {
        width: 60rpx !important;
        height: 60rpx !important;
        font-size: 60rpx !important;
      }
    }
  }

  .uni-app--showtabbar uni-page-wrapper:after {
    height: 200rpx;
    height: calc(80rpx + constant(safe-area-inset-bottom));
    height: calc(80rpx + env(safe-area-inset-bottom));
  }
</style>