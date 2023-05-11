const puppeteer = require('puppeteer');
require('dotenv').config();

console.log("Hello World!");

const LAUNCH_OPTION = {
  headless : false
}

async function main() {
const browser = await puppeteer.launch(LAUNCH_OPTION);
try {
  const USERNAME = process.env.USERNAME;
  const PASSWORD = process.env.PASSWORD;

	const page = await browser.newPage();	// 新しいタブを開く
	
  await page.goto("https://portal.tku.ac.jp/", {"waitUntil":"domcontentloaded"});
  //await page.waitForTimeout(5000);

  const usernameField = await page.$x('/html/body/div/form/table[1]/tbody/tr[1]/td[2]/input');
  await usernameField[0].type(USERNAME);
  const passwordField = await page.$x('/html/body/div/form/table[1]/tbody/tr[2]/td[2]/input');
  await passwordField[0].type(PASSWORD);
  const signinButton = await page.$x('/html/body/div/form/table[1]/tbody/tr[4]/td/div/input');
  await signinButton[0].click();
  await page.waitForNavigation({waitUntil: 'networkidle2'})
  const manabaButton = await page.$x('//*[@id="leftside"]/div[2]/div/div/div[1]/a');
  await manabaButton[0].click();
  await page.waitForNavigation({waitUntil: 'networkidle2'})

  const manabaPage = page[1];
  await manabaPage.bringToFront();
  await page.waitForNavigation({waitUntil: 'networkidle2'})

  const courseList = await manabaPage.$$('.courselist-c');
  console.log(`履修中：${courseList.length}コマ`);

  const unsubmittedListButton = await manabaPage.$x('//*[@id="container"]/div[2]/div/div[5]/div[1]/div[2]/div/a');
  await unsubmittedListButton[0].click();
  await manabaPage.waitForSelector('//*[contains(@class, "row")]');
  const unsubmittedList = await manabaPage.$x('//*[contains(@class, "row")]');
  console.log(`未提出課題：${unsubmittedList.length}個`);

} finally {
	await browser.close();
}}

main()
/*
(async () => {
  // ブラウザを起動
  const browser = await puppeteer.launch();
  // 新しいページを開く
  const page = await browser.newPage();
  // Googleの検索ページにアクセスする
  await page.goto('https://www.google.com/');
  // 検索バーを選択する
  await page.click('input[name="q"]');
  // 検索バーに文字列を入力する
  await page.type('input[name="q"]', 'Puppeteer');
  // Enterキーを押して検索を実行する
  await page.keyboard.press('Enter');
  // 5秒待つ
  await page.waitForTimeout(5000);
  // ブラウザを閉じる
  await browser.close();
});
*/