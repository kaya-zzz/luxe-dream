/**
 * 从 picsum.photos 下载高质量商品展示图片
 * 每个商品使用唯一 seed 确保图片不重复且可复现
 * 图片为免费商用许可 (Unsplash License)
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const productsDir = path.join(__dirname, '..', 'assets', 'products');

// 商品列表 - 使用数字 seed 让每个商品获得固定且不同的图片
const categories = {
  bags: ['hermes_birkin_30', 'hermes_kelly_25', 'chanel_classic_flap', 'chanel_boy', 'lv_capucines'],
  watches: ['rolex_submariner', 'rolex_daytona', 'patek_nautilus', 'ap_royal_oak', 'cartier_santos'],
  jewelry: ['cartier_love_bracelet', 'cartier_juste_un_clou', 'vca_alhambra', 'tiffany_t', 'bulgari_serpenti'],
  shoes: ['louboutin_so_kate', 'jimmy_choo_romy', 'gucci_horsebit', 'hermes_oran', 'dior_j_adior'],
  fashion: ['chanel_tweed_jacket', 'dior_bar_jacket', 'hermes_silk_scarf', 'burberry_trench', 'lv_monogram_jacket'],
  perfume: ['chanel_no5', 'dior_sauvage', 'tom_ford_oud_wood', 'creed_aventus', 'le_labo_santal_33'],
  cars: ['ferrari_sf90', 'lamborghini_revuelto', 'porsche_911_turbo', 'mclaren_750s', 'rolls_royce_spectre'],
  beauty: ['tom_ford_lipstick', 'ysl_cushion', 'la_mer_foundation', 'chanel_les_beiges', 'dior_addict_gloss']
};

function downloadImage(url, filePath) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      // 跟随重定向
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        downloadImage(res.headers.location, filePath).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      const stream = fs.createWriteStream(filePath);
      res.pipe(stream);
      stream.on('finish', () => { stream.close(); resolve(filePath); });
      stream.on('error', reject);
    }).on('error', reject);
  });
}

async function run() {
  let seed = 100; // 起始 seed
  let success = 0;
  let fail = 0;

  for (const [category, items] of Object.entries(categories)) {
    const dir = path.join(productsDir, category);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    for (const itemId of items) {
      const filePath = path.join(dir, `${itemId}.jpg`);
      // picsum 使用 seed 获取固定图片，400x400 正方形
      const url = `https://picsum.photos/seed/${seed}/400/400`;
      seed++;

      try {
        await downloadImage(url, filePath);
        const stats = fs.statSync(filePath);
        if (stats.size > 1000) {
          console.log(`✓ ${category}/${itemId}.jpg (${Math.round(stats.size/1024)}KB)`);
          success++;
        } else {
          console.log(`✗ ${category}/${itemId}.jpg - 文件过小，可能无效`);
          fail++;
        }
      } catch (e) {
        console.log(`✗ ${category}/${itemId}.jpg - ${e.message}`);
        fail++;
      }

      // 间隔 500ms 避免限流
      await new Promise(r => setTimeout(r, 500));
    }
  }
  console.log(`\n下载完成！成功: ${success}, 失败: ${fail}`);
}

run();