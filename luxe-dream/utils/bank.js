/**
 * 虚拟银行工具模块
 * 管理余额、利息计算、消费记录
 */

const ANNUAL_RATE = 0.10 // 年化 10%
const INITIAL_BALANCE = 100000000 // 初始 1亿

// 重置银行数据（强制覆盖为初始状态）
const resetBankData = () => {
  const data = {
    balance: INITIAL_BALANCE,
    lastUpdateTime: Date.now(),
    records: []
  }
  saveBankData(data)
  return data
}

// 获取银行数据
const getBankData = () => {
  let data = wx.getStorageSync('bank')
  if (!data) {
    data = resetBankData()
  }
  return data
}

// 保存银行数据
const saveBankData = (data) => {
  wx.setStorageSync('bank', data)
}

// 计算并更新利息（补算离线期间）
const updateInterest = () => {
  const data = getBankData()
  const now = Date.now()
  const elapsed = (now - data.lastUpdateTime) / 1000 // 秒
  if (elapsed > 0) {
    const interest = data.balance * ANNUAL_RATE * elapsed / (365 * 24 * 3600)
    data.balance += interest
    data.lastUpdateTime = now
    saveBankData(data)
  }
  return data
}

// 计算每秒利息
const getInterestPerSecond = (balance) => {
  return balance * ANNUAL_RATE / (365 * 24 * 3600)
}

// 消费扣款（余额不足时拒绝）
const purchase = (items) => {
  const data = updateInterest() // 先结算利息再判断余额
  const totalAmount = items.reduce((sum, item) => {
    const price = item.price === '--' ? getVirtualPrice(item.category) : parseFloat(item.price)
    return sum + price
  }, 0)

  // 余额不足，拒绝交易
  if (data.balance < totalAmount) {
    return { success: false, balance: data.balance, totalAmount }
  }

  data.balance -= totalAmount
  data.lastUpdateTime = Date.now()

  // 添加消费记录
  items.forEach(item => {
    const price = item.price === '--' ? getVirtualPrice(item.category) : parseFloat(item.price)
    data.records.unshift({
      type: 'purchase',
      amount: -price,
      date: new Date().toLocaleDateString('zh-CN'),
      desc: item.name,
      brand: item.brand
    })
  })

  saveBankData(data)
  return { success: true, balance: data.balance, totalAmount }
}

// 根据品类生成虚拟价格
const getVirtualPrice = (category) => {
  const priceRanges = {
    bags: [50000, 200000],
    watches: [80000, 500000],
    jewelry: [30000, 300000],
    shoes: [5000, 20000],
    fashion: [10000, 80000],
    perfume: [1000, 5000],
    cars: [2000000, 10000000],
    beauty: [500, 3000]
  }
  const range = priceRanges[category] || [10000, 50000]
  return Math.floor(Math.random() * (range[1] - range[0]) + range[0])
}

// 格式化金额
const formatAmount = (amount) => {
  const num = Number(amount)
  if (isNaN(num)) return '0.00'
  const fixed = num.toFixed(2)
  const parts = fixed.split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

module.exports = {
  getBankData,
  saveBankData,
  resetBankData,
  updateInterest,
  getInterestPerSecond,
  purchase,
  formatAmount,
  ANNUAL_RATE,
  INITIAL_BALANCE
}