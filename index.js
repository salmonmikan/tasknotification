const puppeteer = require('puppeteer');
require('dotenv').config();

console.log("Hello World!");

const LAUNCH_OPTION = {
  headless : false
};

async function main() {
try {
  // login info
  const USERNAME = process.env.USER_NAME;
  const PASSWORD = process.env.PASS_WORD;
  const URL = "https://portal.tku.ac.jp/";

  // new page, go to TKU login page
  const browser = await puppeteer.launch(LAUNCH_OPTION);
	const page = await browser.newPage();
  await page.goto(URL, {"waitUntil":"networkidle2"});

  // Specify the input location and enter the login information
  const usernameField = await page.$x('/html/body/div/form/table[1]/tbody/tr[1]/td[2]/input');
  await usernameField[0].type(USERNAME);
  const passwordField = await page.$x('/html/body/div/form/table[1]/tbody/tr[2]/td[2]/input');
  await passwordField[0].type(PASSWORD);
  const loginButton = await page.$x('/html/body/div/form/table[1]/tbody/tr[4]/td/div/input');
  await loginButton[0].click();

  // Go to manaba, get the new page and click the manaba button
  await page.waitForNavigation({waitUntil: 'networkidle2'}); 
  const manabaButton = await page.$x('//*[@id="leftside"]/div[2]/div/div/div[1]/a');
  await manabaButton[0].click();

  // Get the number of courses
  // const courseList = await page.$$('.courselist-c');
  // console.log(`履修中：${courseList.length} コマ`);

  // Go to unsubmittedlist, Get the number of unsubmitted tasks
  const pagetarget = await browser.waitForTarget(t => t.opener() === page.target());
  const newpage = await pagetarget.page();
  const unsubmitted_List_Button = await newpage.$x('//*[@id="container"]/div[2]/div/div[5]/div[1]/div[2]/div/a');
  await unsubmitted_List_Button[0].click();
  // await page.goto("https://manaba.tku.ac.jp/ct/home_library_query");
  // await page.waitForSelector('//*[contains(@claass, "row")]');
  // const unsubmitted_List = await page.$x('//*[contains(@class, "row")]');
  // console.log(`未提出課題：${unsubmitted_List.length}個`);

} catch(e) {
  console.log(e);

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