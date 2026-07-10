App({
  onLaunch() {
    // 初始化银行数据（如果是首次启动）
    const bankData = wx.getStorageSync('bank')
    if (!bankData) {
      wx.setStorageSync('bank', {
        balance: 10000000,
        lastUpdateTime: Date.now(),
        records: []
      })
      this.globalData.sessionStartTime = Date.now()
      this.globalData.sessionStartBalance = 10000000
    } else {
      // 补算离线期间的利息
      const now = Date.now()
      const elapsed = (now - bankData.lastUpdateTime) / 1000 // 秒
      const annualRate = 0.10
      const interest = bankData.balance * annualRate * elapsed / (365 * 24 * 3600)
      bankData.balance += interest
      bankData.lastUpdateTime = now
      wx.setStorageSync('bank', bankData)

      this.globalData.sessionStartTime = now
      this.globalData.sessionStartBalance = bankData.balance
    }

    // 初始化购物车
    if (!wx.getStorageSync('cart')) {
      wx.setStorageSync('cart', [])
    }
  },

  globalData: {
    sessionStartTime: 0,
    sessionStartBalance: 0
  }
})