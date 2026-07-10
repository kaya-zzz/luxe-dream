/**
 * 动画工具模块
 * 提供丝滑的 spring 动画辅助函数
 */

// 弹性缓动函数
const springEasing = (t) => {
  const c4 = (2 * Math.PI) / 3
  return t === 0 ? 0 : t === 1 ? 1 :
    Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1
}

// 创建弹性动画
const createSpringAnimation = (duration = 400) => {
  const animation = wx.createAnimation({
    duration,
    timingFunction: 'ease-out'
  })
  return animation
}

// 震动反馈
const hapticFeedback = (type = 'light') => {
  wx.vibrateShort({ type })
}

module.exports = {
  springEasing,
  createSpringAnimation,
  hapticFeedback
}