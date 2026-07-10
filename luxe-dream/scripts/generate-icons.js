/**
 * 生成 Luxe Dream Tab 图标 SVG 文件
 * 风格：极简细线条，高端奢侈品调性
 * 尺寸：81x81 (适配微信小程序 tabBar)
 */
const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, '..', 'assets', 'icons');

// 浏览 - 钻石（未选中，细线条）
const browseSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="81" height="81" viewBox="0 0 81 81" fill="none">
  <polygon points="40.5,8 62,30 40.5,72 19,30" stroke="#cccccc" stroke-width="2" stroke-linejoin="round" fill="none"/>
  <line x1="19" y1="30" x2="62" y2="30" stroke="#cccccc" stroke-width="2" stroke-linecap="round"/>
  <line x1="40.5" y1="8" x2="30" y2="30" stroke="#cccccc" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="40.5" y1="8" x2="51" y2="30" stroke="#cccccc" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="30" y1="30" x2="40.5" y2="72" stroke="#cccccc" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="51" y1="30" x2="40.5" y2="72" stroke="#cccccc" stroke-width="1.5" stroke-linecap="round"/>
</svg>`;

// 浏览 - 钻石（选中，加粗）
const browseActiveSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="81" height="81" viewBox="0 0 81 81" fill="none">
  <polygon points="40.5,8 62,30 40.5,72 19,30" stroke="#1a1a1a" stroke-width="2.5" stroke-linejoin="round" fill="none"/>
  <line x1="19" y1="30" x2="62" y2="30" stroke="#1a1a1a" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="40.5" y1="8" x2="30" y2="30" stroke="#1a1a1a" stroke-width="2" stroke-linecap="round"/>
  <line x1="40.5" y1="8" x2="51" y2="30" stroke="#1a1a1a" stroke-width="2" stroke-linecap="round"/>
  <line x1="30" y1="30" x2="40.5" y2="72" stroke="#1a1a1a" stroke-width="2" stroke-linecap="round"/>
  <line x1="51" y1="30" x2="40.5" y2="72" stroke="#1a1a1a" stroke-width="2" stroke-linecap="round"/>
</svg>`;

// 购物车 - 手提袋（未选中）
const cartSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="81" height="81" viewBox="0 0 81 81" fill="none">
  <rect x="18" y="28" width="45" height="46" rx="3" stroke="#cccccc" stroke-width="2" fill="none"/>
  <path d="M30 28 V22 C30 14.268 34.268 10 40.5 10 C46.732 10 51 14.268 51 22 V28" stroke="#cccccc" stroke-width="2" stroke-linecap="round" fill="none"/>
</svg>`;

// 购物车 - 手提袋（选中）
const cartActiveSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="81" height="81" viewBox="0 0 81 81" fill="none">
  <rect x="18" y="28" width="45" height="46" rx="3" stroke="#1a1a1a" stroke-width="2.5" fill="none"/>
  <path d="M30 28 V22 C30 14.268 34.268 10 40.5 10 C46.732 10 51 14.268 51 22 V28" stroke="#1a1a1a" stroke-width="2.5" stroke-linecap="round" fill="none"/>
</svg>`;

// 银行 - 金库/保险箱（未选中）
const bankSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="81" height="81" viewBox="0 0 81 81" fill="none">
  <rect x="14" y="14" width="53" height="50" rx="4" stroke="#cccccc" stroke-width="2" fill="none"/>
  <rect x="14" y="64" width="53" height="6" rx="2" stroke="#cccccc" stroke-width="2" fill="none"/>
  <circle cx="40.5" cy="38" r="10" stroke="#cccccc" stroke-width="2" fill="none"/>
  <line x1="40.5" y1="28" x2="40.5" y2="33" stroke="#cccccc" stroke-width="2" stroke-linecap="round"/>
  <line x1="40.5" y1="43" x2="40.5" y2="48" stroke="#cccccc" stroke-width="2" stroke-linecap="round"/>
  <circle cx="40.5" cy="38" r="3" stroke="#cccccc" stroke-width="1.5" fill="none"/>
</svg>`;

// 银行 - 金库/保险箱（选中）
const bankActiveSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="81" height="81" viewBox="0 0 81 81" fill="none">
  <rect x="14" y="14" width="53" height="50" rx="4" stroke="#1a1a1a" stroke-width="2.5" fill="none"/>
  <rect x="14" y="64" width="53" height="6" rx="2" stroke="#1a1a1a" stroke-width="2.5" fill="none"/>
  <circle cx="40.5" cy="38" r="10" stroke="#1a1a1a" stroke-width="2.5" fill="none"/>
  <line x1="40.5" y1="28" x2="40.5" y2="33" stroke="#1a1a1a" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="40.5" y1="43" x2="40.5" y2="48" stroke="#1a1a1a" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="40.5" cy="38" r="3" stroke="#1a1a1a" stroke-width="2" fill="none"/>
</svg>`;

// 写入 SVG 文件
const files = [
  { name: 'browse.svg', content: browseSvg },
  { name: 'browse-active.svg', content: browseActiveSvg },
  { name: 'cart.svg', content: cartSvg },
  { name: 'cart-active.svg', content: cartActiveSvg },
  { name: 'bank.svg', content: bankSvg },
  { name: 'bank-active.svg', content: bankActiveSvg },
];

files.forEach(f => {
  const filePath = path.join(iconsDir, f.name);
  fs.writeFileSync(filePath, f.content.trim());
  console.log(`✓ ${f.name}`);
});

console.log('\nSVG 图标生成完毕，正在转换为 PNG...');