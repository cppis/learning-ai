const fs = require('fs');
const html = fs.readFileSync('C:/Users/cppis/Projects/learning-ai/projects/harness-project/output/index.html', 'utf8');
const m = html.match(/<script>([\s\S]*?)<\/script>/);
try {
  new Function(m[1]);
  console.log('JS OK, total lines: ' + html.split('\n').length);
  // startBtn 리스너 확인
  console.log('startBtn listener: ' + (m[1].includes("getElementById('startBtn')") ? 'FOUND' : 'NOT FOUND'));
  // gameLoop 호출 횟수
  const calls = (m[1].match(/gameLoop\(\)/g) || []).length;
  console.log('gameLoop() calls: ' + calls);
  // requestAnimationFrame 호출 횟수
  const rafs = (m[1].match(/requestAnimationFrame/g) || []).length;
  console.log('requestAnimationFrame count: ' + rafs);
  // startGame 내 gameLoop 있는지
  const sgMatch = m[1].match(/function startGame\(\)[\s\S]*?^\s*\}/m);
  if (sgMatch) console.log('startGame body:\n' + sgMatch[0]);
} catch(e) {
  console.log('JS ERROR: ' + e.message);
}
