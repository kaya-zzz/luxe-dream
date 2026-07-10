const { products, getCategoryKeys, getProductsByCategory } = require('../../data/products')

Page({
  data: {
    categoryKeys: [],
    categoryIndex: 0,
    productIndex: 0,
    currentCategory: {},
    currentProduct: {},
    offsetX: 0,
    imageOpacity: 1,
    slideAnimClass: '',
    categoryAnimClass: '',
    showHint: true,
    showToast: false
  },

  // 手势相关
  touchStartX: 0,
  touchStartY: 0,
  touchStartTime: 0,
  isSwiping: false,

  onLoad() {
    const categoryKeys = getCategoryKeys()
    this.updateDisplay(categoryKeys, 0, 0)
    this.setData({ categoryKeys })

    // 5秒后自动隐藏提示（如果用户未手动关闭）
    this.hintTimer = setTimeout(() => {
      this.setData({ showHint: false })
    }, 5000)
  },

  updateDisplay(categoryKeys, catIdx, prodIdx) {
    const catKey = categoryKeys[catIdx]
    const category = products[catKey]
    const items = category.items
    const product = items[prodIdx]

    // 格式化价格为带千分位的字符串
    const price = product.price
    let displayPrice = '--'
    if (typeof price === 'number' && !isNaN(price)) {
      const fixed = price.toFixed(2)
      const parts = fixed.split('.')
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      displayPrice = parts.join('.')
    }

    this.setData({
      categoryIndex: catIdx,
      productIndex: prodIdx,
      currentCategory: { key: catKey, name: category.name, icon: category.icon },
      currentProduct: Object.assign({}, product, { displayPrice: displayPrice })
    })
  },

  onTouchStart(e) {
    this.touchStartX = e.touches[0].clientX
    this.touchStartY = e.touches[0].clientY
    this.touchStartTime = Date.now()
    this.isSwiping = true
    this.setData({ showHint: false })
  },

  onTouchMove(e) {
    if (!this.isSwiping) return
    const deltaX = e.touches[0].clientX - this.touchStartX
    // 实时跟手效果（水平方向）
    const opacity = Math.max(0.3, 1 - Math.abs(deltaX) / 300)
    this.setData({
      offsetX: deltaX * 0.6,
      imageOpacity: opacity
    })
  },

  onTouchEnd(e) {
    if (!this.isSwiping) return
    this.isSwiping = false

    const deltaX = e.changedTouches[0].clientX - this.touchStartX
    const deltaY = e.changedTouches[0].clientY - this.touchStartY
    const elapsed = Date.now() - this.touchStartTime

    // 重置偏移
    this.setData({ offsetX: 0, imageOpacity: 1 })

    const absDeltaX = Math.abs(deltaX)
    const absDeltaY = Math.abs(deltaY)
    const threshold = 50 // 最小滑动距离
    const isQuickSwipe = elapsed < 300 && (absDeltaX > 30 || absDeltaY > 30)

    if (absDeltaX < threshold && absDeltaY < threshold && !isQuickSwipe) return

    if (absDeltaX > absDeltaY) {
      // 水平滑动 → 切换商品
      if (deltaX < 0) {
        this.nextProduct()
      } else {
        this.prevProduct()
      }
    } else {
      // 垂直滑动 → 切换品类
      if (deltaY < 0) {
        this.nextCategory()
      } else {
        this.prevCategory()
      }
    }
  },

  nextProduct() {
    const { categoryKeys, categoryIndex, productIndex } = this.data
    const items = getProductsByCategory(categoryKeys[categoryIndex])
    const nextIdx = (productIndex + 1) % items.length

    this.setData({ slideAnimClass: 'slide-left' })
    setTimeout(() => {
      this.updateDisplay(categoryKeys, categoryIndex, nextIdx)
      this.setData({ slideAnimClass: 'slide-in' })
    }, 280)
  },

  prevProduct() {
    const { categoryKeys, categoryIndex, productIndex } = this.data
    const items = getProductsByCategory(categoryKeys[categoryIndex])
    const prevIdx = productIndex === 0 ? items.length - 1 : productIndex - 1

    this.setData({ slideAnimClass: 'slide-right' })
    setTimeout(() => {
      this.updateDisplay(categoryKeys, categoryIndex, prevIdx)
      this.setData({ slideAnimClass: 'slide-in' })
    }, 280)
  },

  nextCategory() {
    const { categoryKeys, categoryIndex } = this.data
    const nextCatIdx = (categoryIndex + 1) % categoryKeys.length
    this.setData({ categoryAnimClass: 'fade-in' })
    this.updateDisplay(categoryKeys, nextCatIdx, 0)
    setTimeout(() => this.setData({ categoryAnimClass: '' }), 400)
  },

  prevCategory() {
    const { categoryKeys, categoryIndex } = this.data
    const prevCatIdx = categoryIndex === 0 ? categoryKeys.length - 1 : categoryIndex - 1
    this.setData({ categoryAnimClass: 'fade-in' })
    this.updateDisplay(categoryKeys, prevCatIdx, 0)
    setTimeout(() => this.setData({ categoryAnimClass: '' }), 400)
  },

  addToCart() {
    const { currentProduct, currentCategory } = this.data
    let cart = wx.getStorageSync('cart') || []
    // 避免重复添加
    if (!cart.find(item => item.id === currentProduct.id)) {
      cart.push({ ...currentProduct, category: currentCategory.key })
      wx.setStorageSync('cart', cart)
    }
    this.setData({ showToast: true })
    setTimeout(() => this.setData({ showToast: false }), 1500)
    // 轻微震动反馈
    wx.vibrateShort({ type: 'light' })
  },

  dismissHint() {
    if (this.hintTimer) {
      clearTimeout(this.hintTimer)
    }
    this.setData({ showHint: false })
  }
})