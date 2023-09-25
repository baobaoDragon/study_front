<template>
	<view class="page-main">
		<view class="topbox">
			<image class="topimg" :src="topBanner" mode="widthFix"></image>
			<view class="imgtext">你的错题集</view>
		</view>
		<view class="swipercard">
			<scroll-view scroll-y="true">
				<view class="itembox" v-for="(item,index) in list" :key="index">
					<view class="box-hd">
						<view class="hdname">当前第<view class="text1">{{ item.id }}</view>道题</view>
					</view>
					<view class="contentbox">
						<view class="boxtitle">
							<text class="textl">{{ item.id }}、</text>
							<text class="textr">{{ item.title }}</text>
						</view>
						<view class="chooseitem" v-for="(i,index) in item.choose" :key="index">
							<view class="bodyr">{{ i.A }}</view>
							<view class="bodyr">{{ i.B }}</view>
							<view class="bodyr">{{ i.C }}</view>
							<view class="bodyr">{{ i.D }}</view>
						</view>
					</view>
					<view class="answer">
						<view class="daan">
							{{ item.daan }}
						</view>
						<view class="jiexi">
							{{ item.jiexi }}
						</view>
					</view>
				</view>
				<view class="button">
					
				</view>
			</scroll-view>


		</view>
	</view>
</template>

<script>
	export default {
		name: "worngList",
		props: {
			//问题列表数据
			dataList: {
				type: Array,
				default () {
					return []
				}
			}
		},
		watch: {
			dataList: {
				deep: true,
				immediate: true,
				handler(newArr) {
					if (newArr.length) {
						this.newQuestionsAnswer = JSON.parse(JSON.stringify(newArr))
						this.totalNum = newArr.length
						this.setEmptyData()
					}
				},
			}
		},
		data() {
			return {
				topBanner: require('../../static/banner (2).png'),
				chooseonImg: require('../../static/chooseon.png'),
				chooseonImg2: require('../../static/chooseon2.png'),
				totalNum: 0,
				currentIndex: 0,
				newQuestionsAnswer: [],
				list: [{
						'id': 1,
						'title': '下面哪个选项可以将列表 [1, 2, 3] 中的元素按照从大到小的顺序进行排序？',
						'choose': [{
								'A': 'A. sorted_list = sorted([1, 2, 3], reverse=True)'
							},
							{
								'B': 'B. sorted_list = sort([1, 2, 3])'
							},
							{
								'C': 'C. sorted_list = sort([1, 2, 3], reverse=True)'
							},
							{
								'D': 'D. sorted_list = [1, 2, 3].sort(reverse=True)'
							}
						],
						'daan': '答案：A. sorted_list = sorted([1, 2, 3], reverse=True)',
						'jiexi': '解析：sorted() 函数可以对列表进行排序，参数 reverse=True 表示按降序排列。'
					},
					{
						'id': 2,
						'title': '以下哪个选项是正确的注释语法？',
						'choose': [{
								'A': 'A. // This is a comment'
							},
							{
								'B': 'B. /* This is a comment */'
							},
							{
								'C': 'C. # This is a comment'
							},
							{
								'D': 'D. <!-- This is a comment -->'
							}
						],
						'daan': '答案：C. # This is a comment',
						'jiexi': '解析：在Python中，使用井号(#)来表示单行注释。'
					},
					{
						'id': 3,
						'title': '下面哪个选项可以将一个字符串转换为整数？',
						'choose': [{
								'A': 'A. int("5")'
							},
							{
								'B': 'B. float("5")'
							},
							{
								'C': 'C. str(5)'
							},
							{
								'D': 'D. list("5")'
							}
						],
						'daan': '答案: A. int("5")',
						'jiexi': '解析：int() 函数可以将字符串转换为整数。'
					},
					{
						'id': 4,
						'title': '以下哪个选项可以在循环中跳过当前迭代，进入下一次迭代？',
						'choose': [{
								'A': 'A. continue'
							},
							{
								'B': 'B. break'
							},
							{
								'C': 'C. return'
							},
							{
								'D': 'D. pass'
							}
						],
						'daan': '答案：A. continue',
						'jiexi': '解析：continue 关键字用于跳过当前迭代，进入下一次循环。'
					},
				]
			};
		},
		methods: {
			//swiper改变时
			eventHandle(e) {
				// 这块可以结合业务逻辑进行优化处理，如左右滑动切换题目时做一些提示处理等
				this.currentIndex = e.detail.current
			}
		}
	};
</script>

<style scoped>
	.page-main {
		width: 100%;
		height: 20vh;
	}

	.itembox {
		width: calc(100% - 96rpx);
		padding: 32rpx 48rpx;
		border: 1px solid #65aa71;
	}


	.topbox {
		width: 100%;
		height: 140rpx;
		position: relative;
	}

	.topbox .topimg {
		width: 100%;
		height: 100%;
	}

	.topbox .imgtext {
		position: absolute;
		bottom: 20rpx;
		left: 58rpx;
		font-size: 36rpx;
		font-weight: normal;
		color: #ff3d77;
		line-height: 36rpx;
		text-shadow: 0rpx 2rpx 4rpx rgba(0, 0, 0, 0.5);

	}

	.swipercard {
		width: 100%;
		height: calc(75vh - 316rpx);
		background: #FFFFFF;
		margin-top: 65px;
	}

	.box-hd {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 4rpx dashed #f0f0f0;
		padding-bottom: 16rpx;
		padding-left: 16rpx;
	}
	
	.button{
		height: 200rpx;
	}

	.hdname {
		width: 400rpx;
		font-size: 28rpx;
		display: flex;
		align-items: flex-start;
		font-weight: 500;
		color: #666666;
		line-height: 40rpx;
	}

	.text1 {
		color: #1FA474;
		font-size: 40rpx;
		line-height: 32rpx;
	}

	.hdnum {
		font-size: 28rpx;
		font-weight: 400;
		color: #666666;
		line-height: 42rpx;
	}

	.contentbox {
		font-size: 30rpx;
		color: #333333;
		margin-top: 48rpx;
	}

	.boxtitle .textl {
		width: 50rpx;
		height: 34rpx;
		background: linear-gradient(90deg, #C3FFDA 0%, #ffffff 100%);
	}

	.boxbody {
		padding-left: 40rpx;
		line-height: 64rpx;
		margin: 16rpx 0;
	}

	.chooseitem {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
		margin-top: 15rpx;
	}

	.answer {
		margin-top: 25rpx;
		/* padding-left: 5rpx; */
		color: #ff3d77;
	}

	.daan {
		margin-bottom: 30rpx;
	}
</style>