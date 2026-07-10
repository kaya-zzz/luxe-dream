const bank = require('../../utils/bank')
const app = getApp()

// 趣味文案库
const FUN_FACTS = [
  '你刚才的收益够买一杯奶茶了 🧋',
  '利息已超过大多数人一天的工资 💰',
  '按这个速度，一小时可赚一部iPhone 📱',
  '巴菲特看了都得鼓掌 👏',
  '你的钱正在努力为你工作 🏋️',
  '坐着不动也能赚钱，真香 ✨',
  '每一秒都在产生被动收入 🌱',
  '你的资产正以光速增长 🚀'
]

// 里程碑金额
const MILESTONES = [100, 500, 1000, 5000, 10000, 50000, 100000, 500000, 1000000]

Page({
  data: {
    displayBalance: '0.00',
    displayInterest: '0.00',
    todayInterest: '0.00',
    sessionDuration: '00:00',
    progressPercent: 0,
    nextMilestone: '100',
    milestoneGap: '100.00',
    isEarning: false,
    funFact: '',
    records: []
  },

  timer: null,
  lastFunFactTime: 0,
  currentFunFactIdx: 0,

  onShow() {
    // 加载消费记录
    const data = bank.getBankData()
    const records = (data.records || []).slice(0, 20).map(r => ({
      ...r,
      displayAmount: bank.formatAmount(Math.abs(r.amount))
    }))
    this.setData({ records })

    this.lastFunFactTime = Date.now()
    this.currentFunFactIdx = Math.floor(Math.random() * FUN_FACTS.length)
    this.startTimer()
  },

  onHide() {
    this.stopTimer()
    // 保存当前余额到 storage（不重置 session）
    const now = Date.now()
    const sessionElapsed = (now - app.globalData.sessionStartTime) / 1000
    const interest = bank.getInterestPerSecond(app.globalData.sessionStartBalance) * sessionElapsed
    const data = bank.getBankData()
    data.balance = app.globalData.sessionStartBalance + interest
    data.lastUpdateTime = now
    bank.saveBankData(data)
  },

  startTimer() {
    this.stopTimer()
    this.setData({ isEarning: true })

    this.timer = setInterval(() => {
      const now = Date.now()
      const startTime = app.globalData.sessionStartTime
      const startBalance = app.globalData.sessionStartBalance

      // 本次浏览小程序期间的累计收益（从 app 启动算起）
      const sessionElapsed = (now - startTime) / 1000
      const perSecond = bank.getInterestPerSecond(startBalance)
      const todayInterestVal = perSecond * sessionElapsed

      // 总资产
      const currentBalance = startBalance + todayInterestVal

      // 浏览时长
      const duration = this.formatDuration(sessionElapsed)

      // 里碑进度
      const milestone = this.getNextMilestone(todayInterestVal)
      const prevMilestoneVal = milestone.index > 0 ? MILESTONES[milestone.index - 1] : 0
      const rangeSize = milestone.target - prevMilestoneVal
      const progressInRange = todayInterestVal - prevMilestoneVal
      const progressPercent = Math.min(100, (progressInRange / rangeSize) * 100)

      // 每15秒切换趣味文案
      let funFact = this.data.funFact
      if (now - this.lastFunFactTime > 15000 || !funFact) {
        this.currentFunFactIdx = (this.currentFunFactIdx + 1) % FUN_FACTS.length
        funFact = FUN_FACTS[this.currentFunFactIdx]
        this.lastFunFactTime = now
      }

      this.setData({
        displayBalance: bank.formatAmount(currentBalance),
        displayInterest: bank.formatAmount(perSecond),
        todayInterest: bank.formatAmount(todayInterestVal),
        sessionDuration: duration,
        progressPercent: progressPercent,
        nextMilestone: bank.formatAmount(milestone.target),
        milestoneGap: bank.formatAmount(Math.max(0, milestone.target - todayInterestVal)),
        funFact: funFact
      })
    }, 1000)
  },

  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
    this.setData({ isEarning: false })
  },

  formatDuration(seconds) {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  },

  getNextMilestone(currentAmount) {
    for (let i = 0; i < MILESTONES.length; i++) {
      if (currentAmount < MILESTONES[i]) {
        return { target: MILESTONES[i], index: i }
      }
    }
    const lastMilestone = MILESTONES[MILESTONES.length - 1]
    let target = lastMilestone * 10
    while (currentAmount >= target) {
      target *= 10
    }
    return { target, index: MILESTONES.length }
  }
})