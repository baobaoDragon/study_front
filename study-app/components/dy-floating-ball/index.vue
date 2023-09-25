<template>
    <view class="dyFloatingBall" @touchmove.stop.prevent="() => {}">
        <view
                class="ball"
                :style="[ballStyleD,optionsD.leaveUnusedStatus?ballLeaveUnusedStyleD:'']"
                @touchstart="ontouchstart"
                @touchmove="ontouchmove"
                @touchend="ontouchend"
        >
            <slot name="ball"></slot>
        </view>
    </view>
</template>

<script>
export default {
    props: {
        ballStyle: {
            type: Object,
            default() {
                return {
                  width: '100rpx',
                  height: '100rpx',
                  // backgroundImage: 'url(https://img95.699pic.com/xsj/0h/pe/gc.jpg%21/fh/300)',
                  backgroundImage: 'linear-gradient(0deg, #36A5ED 0%, #6EEE96 100%)',
                  // backgroundImage:url("@/static/logo (2)"),
                  left: '650rpx',
                  top: '1150rpx',
                }
            },
        },
        ballLeaveUnusedStyle: {
            type: Object,
            default() {
                return {
                  color: '#fff',
                  backgroundColor: '#e4393c',
                  backgroundImage: 'linear-gradient(0deg, #36A5ED 0%, #6EEE96 100%)',
                  // backgroundImage:url("@/static/logo (2)"),
                }
            },
        },
        options: {
            type: Object,
            default() {
                return {
                  moveX: true, // 允许水平移动
                  moveY: true, // 允许垂直移动
                  isEdge: 1, // 0不吸边，1吸边，2仅左吸边，3仅右吸边
                  edgeTime: 5, // 吸边定时器单次时长
                  edgeStep: 5, // 吸边定时器单次步长
                  isAcceleratedSpeed: true, // 是否需要加速度
                  acceleratedSpeedForceOfFriction: 0.95, // 摩擦力，建议0.95左右，0<摩擦力<1
                  leaveUnusedTime: 3000, // 闲置时长，小于等于0为不进入闲置
                  leaveUnusedStatus: true, // 默认闲置状态
                }
            },
        },
    },
    data() {
        return {
            ballStyleD: { // 小球初始化样式
                width: '100rpx',
                height: '100rpx',
                left: '0rpx',
                top: '0rpx',
            },
            ballLeaveUnusedStyleD: { // 小球闲置样式
            },
            optionsD: {
                moveX: true, // 允许水平移动
                moveY: true, // 允许垂直移动
                isEdge: 1, // 0不吸边，1吸边，2仅左吸边，3仅右吸边
                edgeTime: 10, // 吸边定时器单次时长
                edgeStep: 10, // 吸边定时器单次步长
                isAcceleratedSpeed: true, // 是否需要加速度
                acceleratedSpeedForceOfFriction: 0.95, // 摩擦力，建议0.95左右，0<摩擦力<1
                leaveUnusedTime: 3000, // 闲置时长，小于等于0为不进入闲置
                leaveUnusedStatus: true, // 默认闲置状态
            },
            touchStauts: false, // 手指触摸状态
            touchLong: false,
            gesture: { // 手势
                type: '', // 触摸类型
                num: 0, // 触摸次数
            },
            leaveUnusedTimer: null, // 闲置定时器
            touchTimer: null, // 触摸定时器
            touchstartObj: {}, // 保存触摸对象
            AcceleratedSpeedOptions: {}, // 加速度对象
            edgeLeftTimer: null, // 左吸边定时器
            edgeRightTimer: null, // 右吸边定时器
            windowWidth: 0, // 屏幕最大宽度px
            windowHeight: 0, // 屏幕最大高度px
            windowWidthRpx: 0, // 屏幕最大宽度rpx
            windowHeightRpx: 0, // 屏幕最大高度rpx
            maxWindowWidthRpx: 0, // 球移动最大宽度rpx
            maxWindowHeightRpx: 0, // 球移动最大高度rpx
        }
    },
    mounted() {
        let _self = this;
        Object.assign(_self.ballStyleD, _self.ballStyle); // 初始化默认样式
        Object.assign(_self.ballLeaveUnusedStyleD, _self.ballLeaveUnusedStyle); // 初始化闲置样式
        Object.assign(_self.optionsD, _self.options); // 初始化默认配置
        _self.init();
    },
    methods: {
      gotoDeatil(){
        // uni.navigateTo({
        //   url:'/subpkg/user/ai_tools'
        // })
        uni.redirectTo({
          url:'/subpkg/user/ai_tools'
        })
      },
        // 初始化
        init() {
            let _self = this;
            // 获取window大小
            const res = uni.getSystemInfoSync();
            _self.windowWidth = res.windowWidth; // 屏幕最大宽度px
            _self.windowHeight = res.windowHeight; // 屏幕最大高度px
            _self.windowWidthRpx = _self.pxToRpx(_self.windowWidth); // 屏幕最大宽度rpx
            _self.windowHeightRpx = _self.pxToRpx(_self.windowHeight); // 屏幕最大高度rpx
            _self.maxWindowWidthRpx = _self.windowWidthRpx - parseInt(_self.ballStyleD.width); // 球移动最大宽度rpx
            _self.maxWindowHeightRpx = _self.windowHeightRpx - parseInt(_self.ballStyleD.height); // 球移动最大高度rpx
        },
        // 按下小球
        ontouchstart(e) {
            let _self = this;
            _self.touchStauts = true;

            clearInterval(_self.edgeLeftTimer); // 左吸边定时器
            _self.edgeLeftTimer = null;
            clearInterval(_self.edgeRightTimer); // 右吸边定时器
            _self.edgeRightTimer = null;
            clearTimeout(_self.AcceleratedSpeedOptions.acceleratedSpeedTimer); // 加速度定时器
            _self.AcceleratedSpeedOptions.acceleratedSpeedTimer = null;
            clearTimeout(_self.leaveUnusedTimer); // 闲置定时器
            _self.leaveUnusedTimer = null;
            _self.optionsD.leaveUnusedStatus = false;

            // 统计触摸次数
            if (!_self.touchTimer) {
                _self.gesture.num = 0;
            }
            _self.gesture.type = 'touch'; // 触摸
            _self.gesture.num++;

            _self.AcceleratedSpeedOptions.speedX = 0; //要求的速度
            _self.AcceleratedSpeedOptions.speedY = 0; //要求的速度
            _self.AcceleratedSpeedOptions.lastX = 0 //最后一次的距离
            _self.AcceleratedSpeedOptions.lastY = 0; //最后一次的距离

            _self.touchstartObj.disX = e.changedTouches[0].clientX - e.currentTarget.offsetLeft;
            _self.touchstartObj.disY = e.changedTouches[0].clientY - e.currentTarget.offsetTop;
        },
        // 移动小球
        ontouchmove(e) {
            let _self = this;
            if (_self.touchStauts) { // 手指按下触发
                if (e.touches.length === 1) { // 一指操作
                    if (_self.gesture.type !== 'move') {
                        _self.gesture.num--; // 移动减少一次统计
                    }
                    _self.gesture.type = 'move'; // 移动
                    if (_self.optionsD.moveX) { // 允许水平移动
                        let move = _self.pxToRpx(e.touches[0].clientX - _self.touchstartObj.disX);
                        // 防止水平越界
                        if (move < 0) {
                            move = 0;
                        } else if (move > _self.maxWindowWidthRpx) {
                            move = _self.maxWindowWidthRpx;
                        }
                        // 跟随手指
                        _self.ballStyleD.left = parseInt(move) + 'rpx';

                        _self.AcceleratedSpeedOptions.speedX = e.touches[0].clientX - _self.AcceleratedSpeedOptions
                            .lastX
                        _self.AcceleratedSpeedOptions.lastX = e.touches[0].clientX
                    }
                    if (_self.optionsD.moveY) { // 允许垂直移动
                        let move = _self.pxToRpx(e.touches[0].clientY - _self.touchstartObj.disY);
                        // 防止水平越界
                        if (move < 0) {
                            move = 0;
                        } else if (move > _self.maxWindowHeightRpx) {
                            move = _self.maxWindowHeightRpx;
                        }
                        // 跟随手指
                        _self.ballStyleD.top = parseInt(move) + 'rpx';

                        _self.AcceleratedSpeedOptions.speedY = e.touches[0].clientY - _self.AcceleratedSpeedOptions
                            .lastY
                        _self.AcceleratedSpeedOptions.lastY = e.touches[0].clientY
                    }
                } else if (e.touches.length === 2) { // 两指操作

                }
            }
        },
        // 松开小球
        ontouchend(e) {
            let _self = this;
            _self.touchStauts = false;

            clearTimeout(_self.leaveUnusedTimer)
            _self.leaveUnusedTimer = null;
            clearTimeout(_self.touchTimer)
            _self.touchTimer = null;

            if (_self.optionsD.isAcceleratedSpeed) {
                _self.AcceleratedSpeedOptions.acceleratedSpeedTimer = setInterval(function () {
                    _self.AcceleratedSpeedOptions.speedX *= _self.optionsD.acceleratedSpeedForceOfFriction //摩擦
                    _self.AcceleratedSpeedOptions.speedY *= _self.optionsD.acceleratedSpeedForceOfFriction //摩擦
                    let left = parseInt(_self.ballStyleD.left);
                    let top = parseInt(_self.ballStyleD.top);
                    if (left < 0 || left > _self.maxWindowWidthRpx) { // 改变水平方向
                        _self.AcceleratedSpeedOptions.speedX *= -1;
                    }
                    if (top < 0 || top > _self.maxWindowHeightRpx) { // 改变垂直方向
                        _self.AcceleratedSpeedOptions.speedY *= -1;
                    }
                    _self.ballStyleD.left = parseInt(left + _self.AcceleratedSpeedOptions.speedX) + 'rpx';
                    _self.ballStyleD.top = parseInt(top + _self.AcceleratedSpeedOptions.speedY) + 'rpx';

                    if (Math.abs(_self.AcceleratedSpeedOptions.speedX) < 2 && Math.abs(_self
                        .AcceleratedSpeedOptions.speedX) < 2) {
                        clearTimeout(_self.AcceleratedSpeedOptions.acceleratedSpeedTimer);
                        _self.AcceleratedSpeedOptions.acceleratedSpeedTimer = null;
                        _self.leaveUnused();
                        _self.diyEvent();
                        _self.edge(e);
                    }
                }, 30);
            } else {
                _self.leaveUnused();
                _self.diyEvent();
                _self.edge(e);
            }
        },
        // 闲置回调
        leaveUnused() {
            let _self = this;
            clearTimeout(_self.leaveUnusedTimer)
            _self.leaveUnusedTimer = null;
            if (_self.optionsD.leaveUnusedTime <= 0) {
                return false;
            }
            // 闲置
            _self.leaveUnusedTimer = setTimeout(() => {
                clearTimeout(_self.leaveUnusedTimer)
                _self.leaveUnusedTimer = null;
                _self.optionsD.leaveUnusedStatus = true;
                _self.$emit('leaveUnused') // 闲置
            }, _self.optionsD.leaveUnusedTime)
        },
        // 自定义事件回调
        diyEvent() {
            let _self = this;
            // 事件
            _self.touchTimer = setTimeout(() => {
                clearTimeout(_self.touchTimer)
                _self.touchTimer = null;
                _self.$emit('diyEvent', _self.gesture);
            }, 300)
        },
        // 吸边
        edge() {
            let _self = this;
            let l = parseInt(_self.ballStyleD.left); // 最后的距离
            if (_self.optionsD.isEdge === 1) { // 吸边
                if (l > 375) { // 向右吸边
                    _self.edgeRight(l);
                } else if (l <= 375) { // 向左吸边
                    _self.edgeLeft(l);
                }
            } else if (_self.optionsD.isEdge === 2) { // 仅左吸边
                _self.edgeLeft(l);
            } else if (_self.optionsD.isEdge === 3) { // 仅右吸边
                _self.edgeRight(l);
            }
        },
        // 左吸边
        edgeLeft(l) { // l 当前位置
            let _self = this;
            clearInterval(_self.edgeLeftTimer);
            _self.edgeLeftTimer = null;
            _self.edgeLeftTimer = setInterval(() => {
                l -= _self.optionsD.edgeStep;
                _self.ballStyleD.left = parseInt(l) + 'rpx';
                if (l <= 0) {
                    _self.ballStyleD.left = '0rpx';
                    clearInterval(_self.edgeLeftTimer);
                    _self.edgeLeftTimer = null;
                    _self.$emit('edgePoint', {
                        left: _self.ballStyleD.left,
                        top: _self.ballStyleD.top
                    }); // 停靠事件
                }
            }, _self.optionsD.edgeTime)
        },
        // 右吸边
        edgeRight(l) { // l 当前位置
            let _self = this;
            clearInterval(_self.edgeRightTimer);
            _self.edgeRightTimer = null;
            _self.edgeRightTimer = setInterval(() => {
                l += _self.optionsD.edgeStep;
                _self.ballStyleD.left = parseInt(l) + 'rpx';
                if (l >= _self.maxWindowWidthRpx) {
                    _self.ballStyleD.left = parseInt(_self.maxWindowWidthRpx) + 'rpx';
                    clearInterval(_self.edgeRightTimer);
                    _self.edgeRightTimer = null;
                    _self.$emit('edgePoint', {
                        left: _self.ballStyleD.left,
                        top: _self.ballStyleD.top
                    }); // 停靠事件
                }
            }, _self.optionsD.edgeTime)
        },
        // px转rpx
        pxToRpx(px) {
            let _self = this;
            return (750 * Number.parseInt(px)) / _self.windowWidth;
        }
    }
}
</script>

<style lang="scss" scoped>
.dyFloatingBall {
  background-color: rgba(0, 0, 0, 0);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  pointer-events: none;


  .ball {
    width: 100rpx;
    height: 100rpx;
    line-height: 100rpx;
    text-align: center;
    font-size: 32rpx;
    color: #fff;
    background-color: #009ee5;
    border-radius: 50%;
    position: absolute;
    z-index: 1;
    box-shadow: 0 0 5rpx 5rpx rgba(0, 0, 159, .15);
    transition: all .03s ease-in;
    pointer-events: auto;

    &:active {
      box-shadow: none;
    }
  }
}
</style>
