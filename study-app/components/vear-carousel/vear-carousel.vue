<template>
	<swiper class="image-container" previous-margin="45rpx" next-margin="45rpx" circular autoplay @change="swiperChange">
		<swiper-item :class="currentIndex == index ? 'swiper-item' : 'swiper-item-side'" v-for="(item, index) in imgList" :key="index">
      <view class="text-overlay">{{item[title]}}</view>
			<image @click="clickImg(item)" :class="currentIndex == index ? 'item-img' : 'item-img-side'" :src="item[urlKey]" lazy-load :style="dontFirstAnimation ? 'animation: none;' : ''" mode="aspectFill"></image>
      
		</swiper-item>
	</swiper>
</template>
<script>
	export default {
		props: {
			imgList: {
				type: Array,
				default() {
					return []
				}
			},
			urlKey: {
				type: String,
				default() {
					return ''
				}
			},
      title: {
      	type: String,
      	default() {
      		return ''
      	}
      },
		},
		data() {
			return {
				currentIndex: 0,
				dontFirstAnimation: true
			}
		},
		methods: {
			swiperChange(e) {
				this.dontFirstAnimation = false
				this.currentIndex = e.detail.current
			},
			clickImg(item) {
				this.$emit('selected', item, this.currentIndex)
			}
		}
	}
</script>
<style scoped>
	.image-container {
		width: 750rpx;
		height: 350rpx;
    position: relative;
	}

	.item-img {
		width: 630rpx;
		height: 300rpx;
		border-radius: 14rpx;
		animation: to-big .3s;
	}

	.swiper-item {
		width: 630rpx;
		height: 300rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.item-img-side {
		width: 630rpx;
		height: 260rpx;
		border-radius: 14rpx;
		animation: to-mini .3s;
	}

	.swiper-item-side {
		width: 630rpx;
		height: 260rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
  
  .text-overlay {
     position: absolute;
     color: white;
      box-sizing: border-box; /* 添加该属性，使padding计入元素宽度 */
      z-index: 1; /* 将文本放在图片上层 */
      opacity: 0; /* 初始隐藏文本 */
      transition: opacity .3s ease-in-out; /* 添加过渡效果 */
  }
	@keyframes to-mini
	{
		from {
			height: 300rpx;
		}
		to {
			height: 260rpx;
		}
	}
	@keyframes to-big
	{
		from {
			height: 260rpx;
		}
		to {
			height: 300rpx;
		}
	}
</style>
