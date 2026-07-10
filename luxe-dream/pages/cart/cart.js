const { products } = require('../../data/products')
const bank = require('../../utils/bank')

Page({
  data: {
    cartItems: [],
    purchasing: false
  },

  onShow() {
    this.loadCart()
  },

  loadCart() {
   const cart = wx.getStorageSync('cart') || []
    // 补充品类图标
    const cartItems = cart.map(item => {
      const categoryData = products[item.category]
      return {
        ...item,
        icon: categoryData ? categoryData.icon : '📦'
      }
    })
    this.setData({ cartItems })
  },

  removeItem(e) {
    const id = e.currentTarget.dataset.id
    let cart = wx.getStorageSync('cart') || []
    cart = cart.filter(item => item.id !== id)
    wx.setStorageSync('cart', cart)
    
    // 移除动画
    const cartItems = this.data.cartItems.map(item => 
      item.id === id ? { ...item, removing: true } : item
    )
    this.setData({ cartItems })
    setTimeout(() => this.loadCart(), 300)
    wx.vibrateShort({ type: 'light' })
  },

  virtualPurchase() {
    if (this.data.purchasing || this.data.cartItems.length === 0) return

    this.setData({ purchasing: true })
    wx.vibrateShort({ type: 'medium' })

    // 执行虚拟购买
    const cart = wx.getStorageSync('cart') || []
    const result = bank.purchase(cart)

    if (!result.success) {
      // 余额不足，提示用户
      this.setData({ purchasing: false })
      wx.vibrateShort({ type: 'heavy' })
      wx.showModal({
        title: '余额不足',
        content: `当前余额不足以支付本次消费，还差 ¥${bank.formatAmount(result.totalAmount - result.balance)}`,
        showCancel: false,
        confirmText: '我知道了'
      })
      return
    }

    // 清空购物车
    wx.setStorageSync('cart', [])

    // 延迟显示成功后重置
    setTimeout(() => {
      this.setData({ purchasing: false })
      this.loadCart()
      wx.showToast({
        title: '已从银行扣款',
        icon: 'none',
        duration: 2000
      })
    }, 1500)
  }
})