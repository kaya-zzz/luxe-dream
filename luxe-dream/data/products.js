/**
 * 商品静态数据
 * 8大品类，每类4-5个商品
 */

const products = {
  bags: {
    name: '包',
    icon: '👜',
    items: [
      { id: 'hermes_birkin_30', brand: 'HERMÈS', name: 'Birkin 30', description: 'Togo 牛皮 · 金色五金', price: 138000, image: '/assets/products/bags/hermes_birkin_30.jpg' },
      { id: 'hermes_kelly_25', brand: 'HERMÈS', name: 'Kelly 25', description: 'Epsom 牛皮 · 银色五金', price: 126000, image: '/assets/products/bags/hermes_kelly_25.jpg' },
      { id: 'chanel_classic_flap', brand: 'CHANEL', name: 'Classic Flap', description: '小羊皮 · 银色链条', price: 82000, image: '/assets/products/bags/chanel_classic_flap.jpg' },
      { id: 'chanel_boy', brand: 'CHANEL', name: 'Boy Chanel', description: '小牛皮 · 做旧金色五金', price: 68000, image: '/assets/products/bags/chanel_boy.jpg' },
      { id: 'lv_capucines', brand: 'LOUIS VUITTON', name: 'Capucines MM', description: 'Taurillon 牛皮 · 经典翻盖', price: 56000, image: '/assets/products/bags/lv_capucines.jpg' }
    ]
  },
  watches: {
    name: '手表',
    icon: '⌚',
    items: [
      { id: 'rolex_submariner', brand: 'ROLEX', name: 'Submariner Date', description: 'Oystersteel · 黑色表盘', price: 95000, image: '/assets/products/watches/rolex_submariner.jpg' },
      { id: 'rolex_daytona', brand: 'ROLEX', name: 'Cosmograph Daytona', description: '18K 黄金 · 白色表盘', price: 380000, image: '/assets/products/watches/rolex_daytona.jpg' },
      { id: 'patek_nautilus', brand: 'PATEK PHILIPPE', name: 'Nautilus 5711', description: '不锈钢 · 蓝色表盘', price: 450000, image: '/assets/products/watches/patek_nautilus.jpg' },
      { id: 'ap_royal_oak', brand: 'AUDEMARS PIGUET', name: 'Royal Oak', description: '精钢 · 蓝色"Grande Tapisserie"表盘', price: 320000, image: '/assets/products/watches/ap_royal_oak.jpg' },
      { id: 'cartier_santos', brand: 'CARTIER', name: 'Santos de Cartier', description: '精钢与黄金 · 白色表盘', price: 89000, image: '/assets/products/watches/cartier_santos.jpg' }
    ]
  },
  jewelry: {
    name: '首饰',
    icon: '💎',
    items: [
      { id: 'cartier_love_bracelet', brand: 'CARTIER', name: 'Love 手镯', description: '18K 玫瑰金 · 经典螺丝设计', price: 58000, image: '/assets/products/jewelry/cartier_love_bracelet.jpg' },
      { id: 'cartier_juste_un_clou', brand: 'CARTIER', name: 'Juste un Clou', description: '18K 黄金 · 钉子造型', price: 72000, image: '/assets/products/jewelry/cartier_juste_un_clou.jpg' },
      { id: 'vca_alhambra', brand: 'VAN CLEEF & ARPELS', name: 'Alhambra 项链', description: '18K 黄金 · 珍珠母贝', price: 95000, image: '/assets/products/jewelry/vca_alhambra.jpg' },
      { id: 'tiffany_t', brand: 'TIFFANY & CO.', name: 'Tiffany T Wire', description: '18K 玫瑰金 · 钻石', price: 42000, image: '/assets/products/jewelry/tiffany_t.jpg' },
      { id: 'bulgari_serpenti', brand: 'BVLGARI', name: 'Serpenti Viper', description: '18K 白金 · 满钻灵蛇', price: 268000, image: '/assets/products/jewelry/bulgari_serpenti.jpg' }
    ]
  },
  shoes: {
    name: '鞋履',
    icon: '👠',
    items: [
      { id: 'louboutin_so_kate', brand: 'CHRISTIAN LOUBOUTIN', name: 'So Kate 120', description: '红底高跟鞋 · 漆皮黑色', price: 8500, image: '/assets/products/shoes/louboutin_so_kate.jpg' },
      { id: 'jimmy_choo_romy', brand: 'JIMMY CHOO', name: 'Romy 100', description: '裸色绒面 · 尖头高跟', price: 6800, image: '/assets/products/shoes/jimmy_choo_romy.jpg' },
      { id: 'gucci_horsebit', brand: 'GUCCI', name: 'Horsebit Loafer', description: '黑色皮革 · 马衔扣', price: 9200, image: '/assets/products/shoes/gucci_horsebit.jpg' },
      { id: 'hermes_oran', brand: 'HERMÈS', name: 'Oran 拖鞋', description: 'Box 小牛皮 · H 标志', price: 7600, image: '/assets/products/shoes/hermes_oran.jpg' },
      { id: 'dior_j_adior', brand: 'DIOR', name: "J'Adior Slingback", description: '刺绣网面 · 撞色鞋跟', price: 12000, image: '/assets/products/shoes/dior_j_adior.jpg' }
    ]
  },
  fashion: {
    name: '服装',
    icon: '👔',
    items: [
      { id: 'chanel_tweed_jacket', brand: 'CHANEL', name: '经典粗花呢外套', description: '多色编织 · 珍珠纽扣', price: 68000, image: '/assets/products/fashion/chanel_tweed_jacket.jpg' },
      { id: 'dior_bar_jacket', brand: 'DIOR', name: 'Bar Jacket', description: '米色羊毛 · 蜂腰轮廓', price: 45000, image: '/assets/products/fashion/dior_bar_jacket.jpg' },
      { id: 'hermes_silk_scarf', brand: 'HERMÈS', name: 'Carré 90 丝巾', description: '真丝斜纹 · 手工卷边', price: 12000, image: '/assets/products/fashion/hermes_silk_scarf.jpg' },
      { id: 'burberry_trench', brand: 'BURBERRY', name: 'Heritage Trench', description: '蜜色棉质嘎巴甸 · 经典剪裁', price: 28000, image: '/assets/products/fashion/burberry_trench.jpg' },
      { id: 'lv_monogram_jacket', brand: 'LOUIS VUITTON', name: 'Monogram 夹克', description: '丹宁布 · 全幅老花', price: 35000, image: '/assets/products/fashion/lv_monogram_jacket.jpg' }
    ]
  },
  perfume: {
    name: '香水',
    icon: '🧴',
    items: [
      { id: 'chanel_no5', brand: 'CHANEL', name: 'N°5', description: '经典花香调 · 100ml EDP', price: 1680, image: '/assets/products/perfume/chanel_no5.jpg' },
      { id: 'dior_sauvage', brand: 'DIOR', name: 'Sauvage', description: '清新辛辣木质调 · 100ml EDT', price: 1250, image: '/assets/products/perfume/dior_sauvage.jpg' },
      { id: 'tom_ford_oud_wood', brand: 'TOM FORD', name: 'Oud Wood', description: '珍贵乌木调 · 50ml EDP', price: 2980, image: '/assets/products/perfume/tom_ford_oud_wood.jpg' },
      { id: 'creed_aventus', brand: 'CREED', name: 'Aventus', description: '果香馥奇调 · 100ml EDP', price: 3580, image: '/assets/products/perfume/creed_aventus.jpg' },
      { id: 'le_labo_santal_33', brand: 'LE LABO', name: 'Santal 33', description: '檀木皮革调 · 100ml EDP', price: 2680, image: '/assets/products/perfume/le_labo_santal_33.jpg' }
    ]
  },
  cars: {
    name: '跑车',
    icon: '🏎️',
    items: [
      { id: 'ferrari_sf90', brand: 'FERRARI', name: 'SF90 Stradale', description: '插电混动 · 1000 匹马力', price: 6880000, image: '/assets/products/cars/ferrari_sf90.jpg' },
      { id: 'lamborghini_revuelto', brand: 'LAMBORGHINI', name: 'Revuelto', description: 'V12 混动 · 1015 匹马力', price: 7200000, image: '/assets/products/cars/lamborghini_revuelto.jpg' },
      { id: 'porsche_911_turbo', brand: 'PORSCHE', name: '911 Turbo S', description: '3.7L 水平对置六缸 · 650 匹', price: 2860000, image: '/assets/products/cars/porsche_911_turbo.jpg' },
      { id: 'mclaren_750s', brand: 'McLAREN', name: '750S', description: '4.0L V8 双涡轮 · 750 匹', price: 3980000, image: '/assets/products/cars/mclaren_750s.jpg' },
      { id: 'rolls_royce_spectre', brand: 'ROLLS-ROYCE', name: 'Spectre', description: '纯电超豪华轿跑 · 静谧奢华', price: 5750000, image: '/assets/products/cars/rolls_royce_spectre.jpg' }
    ]
  },
  beauty: {
    name: '彩妆',
    icon: '💄',
    items: [
      { id: 'tom_ford_lipstick', brand: 'TOM FORD', name: 'Lip Color', description: '哑光唇膏 · Scarlet Rouge', price: 580, image: '/assets/products/beauty/tom_ford_lipstick.jpg' },
      { id: 'ysl_cushion', brand: 'YSL', name: '超模蕾丝气垫', description: '轻薄遮瑕 · 自然光泽', price: 680, image: '/assets/products/beauty/ysl_cushion.jpg' },
      { id: 'la_mer_foundation', brand: 'LA MER', name: '鎏金焕变精华粉底', description: '滋润养肤 · 自然妆效', price: 1580, image: '/assets/products/beauty/la_mer_foundation.jpg' },
      { id: 'chanel_les_beiges', brand: 'CHANEL', name: 'Les Beiges 健康光彩', description: '蜜粉饼 · 自然好气色', price: 720, image: '/assets/products/beauty/chanel_les_beiges.jpg' },
      { id: 'dior_addict_gloss', brand: 'DIOR', name: 'Addict Lip Maximizer', description: '丰唇蜜 · 透明粉色', price: 350, image: '/assets/products/beauty/dior_addict_gloss.jpg' }
    ]
  }
}

// 获取品类列表
const getCategories = () => {
  return Object.keys(products).map(key => ({
    key,
    name: products[key].name,
    icon: products[key].icon,
    count: products[key].items.length
  }))
}

// 获取某品类下的商品列表
const getProductsByCategory = (categoryKey) => {
  return products[categoryKey] ? products[categoryKey].items : []
}

// 获取所有品类key列表
const getCategoryKeys = () => Object.keys(products)

module.exports = {
  products,
  getCategories,
  getProductsByCategory,
  getCategoryKeys
}