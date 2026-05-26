const { test, expect } = require('@playwright/test');

const STUDENT_FILE = process.env.STUDENT_FILE;
const BASE_URL = 'http://127.0.0.1:8080';

test.beforeAll(() => {
  if (!STUDENT_FILE) throw new Error('STUDENT_FILE 環境変数が設定されていません');
});

// STUDENT_FILE はリポジトリルートからの相対パス（例: students/1/index.html）
// playwright.config.js の webServer がリポジトリルートを 8080 で配信しているので、
// そのまま URL に組み立てる。ES Modules の import は file:// では動かないため、
// 必ず http:// 経由で開く。
function resolveUrl() {
  return `${BASE_URL}/${STUDENT_FILE}`;
}

const EXPECTED = [
  '吾輩は猫である（夏目漱石）',
  '羅生門（芥川龍之介）',
  '人間失格（太宰治）',
];

async function getListTexts(page) {
  return await page.$$eval('.book-list li', (els) =>
    els.map((el) => el.textContent.trim())
  );
}

test('.book-list に <li> が3件、正しい順序・テキストで描画される', async ({ page }) => {
  await page.goto(resolveUrl());
  // module 評価が終わるのを待つ
  await page.waitForSelector('.book-list li');
  expect(await getListTexts(page)).toEqual(EXPECTED);
});

test('描画は data.js から import された books に基づいている（li が3件きっかり）', async ({ page }) => {
  await page.goto(resolveUrl());
  await page.waitForSelector('.book-list li');
  const count = await page.$$eval('.book-list li', (els) => els.length);
  expect(count).toBe(3);
});

test('module スクリプトでコンソールエラーが出ていない（import 失敗していない）', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (err) => errors.push(String(err)));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  await page.goto(resolveUrl());
  await page.waitForSelector('.book-list li');
  expect(errors, errors.join('\n')).toEqual([]);
});
