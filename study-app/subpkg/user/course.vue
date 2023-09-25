<template>
	<view class="wp">
		<view class="ul-list">
			<view class="li" v-for="(it,i) in li" :key="i">
				<navigator class="con" :url="'/subpkg/course_detail/course_detail?c_id='+ it.c_id" hover-class="none">
					<view class="pic">
						<image style="width: 100%;" :src="it.imageUrl" mode="widthFix"></image>
					</view>
					<view class="txt">
						<view class="tit">
							<h3>{{it.title}}</h3>
						</view>
						<view class="info">
						</view>
					</view>
				</navigator>
			</view>
		</view>
		<view class="fooder">
			
		</view>
	</view>
</template>

<script>
  import {getCourseCollect} from '@/network/course.js'
	export default {
		data() { 
			return {
				li:[
					{
						id:1,
						pic:"https://picsum.photos/id/1/200/180",
						title:'特效入门课程',
						desc:'帮助您一周内学会特效基础操作，走向优秀特效师',
						date:8,
						look:2532
					},
					{
						id:2,
						pic:'https://picsum.photos/id/2/200/180',
						title:'特效入门课程',
						desc:'帮助您一周内学会特效基础操作，走向优秀特效师',
						date:12,
						look:4156
					},
					{
						id:3,
						pic:'https://picsum.photos/id/33/200/180',
						title:'特效入门课程',
						desc:'帮助您一周内学会特效基础操作，走向优秀特效师',
						date:7,
						look:263
					},
					{
						id:4,
						pic:'https://picsum.photos/id/44/200/180',
						title:'特效入门课程',
						desc:'帮助您一周内学会特效基础操作，走向优秀特效师',
						date:12,
						look:4156
					},
					{
						id:5,
						pic:'https://picsum.photos/id/55/200/180',
						title:'特效入门课程',
						desc:'帮助您一周内学会特效基础操作，走向优秀特效师',
						date:12,
						look:2532
					},
					{
						id:6,
						pic:'https://picsum.photos/id/66/200/180',
						title:'特效入门课程',
						desc:'帮助您一周内学会特效基础操作，走向优秀特效师',
						date:8,
						look:2532
					},
					{
						id:7,
						pic:'https://picsum.photos/id/77/200/180',
						title:'特效入门课程',
						desc:'帮助您一周内学会特效基础操作，走向优秀特效师',
						date:12,
						look:4156
					},
					{
						id:8,
						pic:'https://picsum.photos/id/88/200/180',
						title:'特效入门课程',
						desc:'帮助您一周内学会特效基础操作，走向优秀特效师',
						date:8,
						look:2532
					},
					{
						id:9,
						pic:'https://picsum.photos/id/9/200/180',
						title:'特效入门课程',
						desc:'帮助您一周内学会特效基础操作，走向优秀特效师',
						date:8,
						look:2532
					},
					{
						id:10,
						pic:'https://picsum.photos/id/10/200/180',
						title:'特效入门课程',
						desc:'帮助您一周内学会特效基础操作，走向优秀特效师',
						date:8,
						look:2532
					}
				]
			}
		},
		onLoad(){
		    this.getCourse()
		},
		methods: {
			getCourse(){
        getCourseCollect().then(res => {
          let code = res.data.code;
          if (code == '00000') {
            console.log(res.data.data)
            res.data.data.forEach(item=>{
              item.imageUrl=this.$beforeImgUrl+item.imageUrl
            })
            console.log(res.data.data)
            this.li=res.data.data
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
	page{
		background-color: #FFFFFF;
	}
	.ul-list .li{
		overflow: hidden;
		border-bottom: 1px solid #f6f6f6;
	}
	.ul-list .con{
		overflow: hidden;
		padding: 20rpx;
	}
	.ul-list .pic{
		float: left;
		width: 220rpx;
		height: 170rpx;
		overflow: hidden;
		border-radius: 8rpx;
		margin-right: 25rpx;
	}
	.ul-list .txt{
	}
	.ul-list h3{
		color: #1e2138;
		font-size: 30rpx;
		padding-top: 0rpx;
		margin-bottom: 10rpx;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp:3;
		
	}
	.ul-list .desc{
		color: #666666;
		font-size: 25rpx;
		height: 80rpx;
		line-height: 35rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp:2;
	}
	.ul-list .info{
		overflow: hidden;
		width: 100%;
		color: #ababab;
		font-size: 25rpx;
	}
	.ul-list .info .t2{
		color: #63d58a;
	}
	.ul-list .info .date{
		float: left;
	}
	.ul-list .info .look{
		float: right;
	}
	.fooder{
		height: 40rpx;
	}
</style>
