const assert = require('assert');
const fetch = require('node-fetch');
import CTAlinks from '../samplius.com/data/cta-links';
import Elements from '../samplius.com/data/elements';
import Constants from '../constants/constants';
const { tegId } = require('../global_files/tegid');

module.exports = {
  displayStyle,
  toHaveText,
  elementsLength,
  notExistInHtml,
  exToBeDisplayed,
  elemWidth,
  elemHeight,
  elemFontSize,
  assertExpectedLinks,
  pageSpeed,
  isExist,
  expectedUrl,
  verifyCanonical,
  verifyCanonicalLength,
  nextPaginationLength,
  prevPaginationLength,
  getUrlChatbot,
  getUrl,
  logoRedirectUrl,
  verifyLoginUrl,
  verifyBtn,
  checksCookieText,
  formatDate,
  checkSiteStatus,
  slackMessageCron,
  globalSmoke,
};

// Check the status code
async function checkSiteStatus(siteUrl) {
  await browser.url(siteUrl);
  const siteLink = await fetch(siteUrl);
  const getStatus = siteLink.status;
  if (getStatus !== Constants.SUCCESS_STATUS) {
    console.log(
      'BAD STATUS______________',
      siteUrl,
      '_____________',
      getStatus
    );
  }
  assert.strictEqual(getStatus, Constants.SUCCESS_STATUS);
}
// Check url
async function getUrl(link) {
  const url = await browser.getUrl();
  assert(url === link);
}
// Check URL (with chatbot)
async function getUrlChatbot(link) {
  const url = await browser.getUrl();
  assert(url === link || CTAlinks.chatbot);
}
// Check login URL
async function verifyLoginUrl(elem) {
  await elem.click();
  await browser.pause(Constants.PAUSE_SEC);
  await getUrlChatbot(CTAlinks.loginUrl);
}
// Check order button
async function verifyBtn(elem) {
  await elem.click();
  await browser.pause(Constants.PAUSE_SEC);
  await getUrlChatbot(CTAlinks.orderBtn);
}
// Check logo redirection
async function logoRedirectUrl(elem, link) {
  await elem.click();
  await expect(browser).toHaveUrl(link);
}
// Check that canonical is exist
async function verifyCanonical(url) {
  const canonical = await $("link[rel='canonical']");
  const canonicalGetAttr = canonical.getAttribute('href');
  return canonicalGetAttr, url;
}
// Verify canonical length
async function verifyCanonicalLength() {
  const canonAmount = await Elements.manyCanonical;
  assert(canonAmount.length === 1);
}
// Verify link pagination length
async function nextPaginationLength() {
  const nextLink = await Elements.nextLink;
  assert(nextLink.length === 1);
}
async function prevPaginationLength(url) {
  await browser.url(`${url}page/2/`);
  const prevLink = await Elements.prevLink;
  assert(prevLink.length === 1);
}
// Check expected URL
async function expectedUrl(url) {
  return expect(browser).toHaveUrl(url);
}
// Check Display Style
async function displayStyle(elem, display) {
  const displayStyle = await elem;
  const displayStyleGetProp = await displayStyle.getCSSProperty('display');
  const flex = await displayStyleGetProp.value;
  console.log('DISPLAY ---', flex);
  assert(flex === display);
}
// Check that word or part of sentence or link should not be at the code ()
async function notExistInHtml(url, elem) {
  const urlLink = await fetch(url);
  const html = await urlLink.text(); // parse all DOM
  if (html.includes(elem)) {
    assert(false);
  } else {
    console.log('222', 'There is NO prokit.me at the page');
  }
}
// Check element ToHaveText
async function toHaveText(elem, text) {
  const elemSelText = await $(elem);
  const getText = await elemSelText.getText();
  assert(getText === text);
}
// Check amount of Elements
async function elementsLength(sel, elemLength) {
  const amountOfElements = await sel;
  assert(amountOfElements.length >= elemLength);
}
// Check that element is displayed
async function exToBeDisplayed(sel) {
  const elemSelector = await sel;
  await expect(elemSelector).toBeDisplayed();
}
// Verify width of the element
async function elemWidth(sel, width) {
  const elemSelector = await sel;
  const elemSizeW = await elemSelector.getSize('width');
  console.log('Width ---', elemSizeW);
  assert(elemSizeW === width);
}
// Verify height of the element
async function elemHeight(sel, height) {
  const elemSelector = await sel;
  const elem = await elemSelector.getSize('height');
  console.log('Height _________________', elem);
  assert(elem === height);
}
// Verify font-size of the element
async function elemFontSize(sel, fontSize) {
  const elemSelector = await sel;
  const elemFontSize = await elemSelector.getCSSProperty('font-size');
  const splitObj = Object.values(elemFontSize)[1];
  assert(splitObj === `${fontSize}px`);
}
// Check that links are equals
async function assertExpectedLinks(selExpLinks, selNavLinks) {
  const expectedLinks = selExpLinks;
  const actualLinks = [];

  const navLinks = await selNavLinks;
  for (const link of navLinks) {
    actualLinks.push(await link.getText());
  }
  await expect(expectedLinks).toEqual(actualLinks);
}
// Check that element is exist
async function isExist(sel) {
  const elem = await sel;
  return expect(elem).toExist();
}
// Function for sending message in Slack about pagespeed
async function slackMessageCron(strVariable) {
  const body = { text: String(strVariable) };
  const response = await fetch(
    'https://hooks.slack.com/services/your_test_key',
    {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    }
  );
  console.log('RESPONSE:', response);
}
// Check Google Pagespeed
async function pageSpeed(url, name, pageLink) {
  // Variables of GREEN zone
  const lcpGood = 2.5;
  const fcpGood = 1.8;
  const clsGood = 0.1;
  const speedGood = 90;

  const mainUrl = url;
  const generalLink = `https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed?url=${mainUrl}/&key=AIzaSyA_VaYEFHz4MywivC55-v5FXvFnuiURXuE&strategy=mobile`;
  const fetchUrlLink = await fetch(generalLink);
  const getJson = await fetchUrlLink.json();
  const mobScore = Math.trunc(
    getJson.lighthouseResult.categories.performance.score * 100
  );
  const fcp =
    getJson['lighthouseResult']['audits']['first-contentful-paint'][
      'displayValue'
    ];
  const lcp =
    getJson['lighthouseResult']['audits']['largest-contentful-paint'][
      'displayValue'
    ];
  const cls =
    getJson['lighthouseResult']['audits']['cumulative-layout-shift'][
      'displayValue'
    ];

  // Bold style for text
  let boldTag = (value) => `*${value}*`;
  const mobScoreFormatted =
    mobScore >= speedGood ? mobScore : boldTag(mobScore);
  const fcpFormatted = parseFloat(fcp) <= fcpGood ? fcp : boldTag(fcp);
  const lcpFormatted = parseFloat(lcp) <= lcpGood ? lcp : boldTag(lcp);
  const clsFormatted = parseFloat(cls) <= clsGood ? cls : boldTag(cls);

  const exceedsThreshold =
    mobScore < speedGood ||
    parseFloat(fcp) > fcpGood ||
    parseFloat(lcp) > lcpGood ||
    parseFloat(cls) > clsGood;

  if (exceedsThreshold) {
    let speedResultMain = `${'PageSpeed: ' + name} \n${pageLink}`;

    if (mobScore < speedGood) {
      speedResultMain += `\n*Mob Score*: ${mobScoreFormatted} (>= 90)`;
    } else {
      speedResultMain += `\nMob Score: ${mobScoreFormatted} (>= 90)`;
    }
    if (parseFloat(fcp) > fcpGood) {
      speedResultMain += `\n*FCP*: ${boldTag(fcp)} (<= 1.8)`;
    } else {
      speedResultMain += `\nFCP: ${fcpFormatted} (<= 1.8)`;
    }
    if (parseFloat(lcp) > lcpGood) {
      speedResultMain += `\n*LCP*: ${boldTag(lcp)} (<= 2.5)`;
    } else {
      speedResultMain += `\nLCP: ${lcpFormatted} (<= 2.5)`;
    }
    if (parseFloat(cls) > clsGood) {
      speedResultMain += `\n*CLS*: ${boldTag(cls)} (<= 0.1)`;
    } else {
      speedResultMain += `\nCLS: ${clsFormatted} (<= 0.1)`;
    }

    // Telegram bot data
    const TelegramBot = require('node-telegram-bot-api');
    const token = 'yor_test_token';
    const bot = new TelegramBot(token, {
      polling: true,
    });
    bot.sendMessage(tegId, speedResultMain);
  }
}
// Check value in cookies
async function checksCookieText(cookie, utmText) {
  const cookieArray = await browser.getCookies(cookie);
  await cookieArray[0].value.includes(utmText);
}
// Function for formatting date
async function formatDate(dateStr) {
  const dateParts = dateStr.split('-');
  const dateObj = new Date(dateParts[2], dateParts[0] - 1, dateParts[1]);
  const formattedDate =
    dateObj.getFullYear() +
    '-' +
    (dateObj.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    dateObj.getDate().toString().padStart(2, '0');
  return formattedDate;
}
async function globalSmoke(url) {
  await browser.url(url);
  // SEO part
  const title = await $('head title');
  await title.waitForExist({ timeout: 5000 });

  const description = await $("meta[name='description']");
  await description.waitForExist({ timeout: 5000 });

  const canonAmount = await $$("link[rel='canonical']");
  console.log(`${'Amount of Canonicals: '} ${canonAmount}`);
  assert(canonAmount.length === 1);
  // DOM part div header

  // header nav block
  const headerOnPage = await $('header, div header, .pb-80.mob-mode > div');
  await headerOnPage.waitForDisplayed({ timeout: 5000 }); // On https://studymoose.com/ there is a troubles header selector
  // logo
  const logoOnPage = await $('div.logo, .header_logo');
  await logoOnPage.waitForDisplayed({ timeout: 5000 });
  // h1
  const h1OnPage = await $('div h1');
  await h1OnPage.waitForDisplayed({ timeout: 5000 });
  // footer
  const footerOnPage = await $('div h1');
  await footerOnPage.waitForDisplayed({ timeout: 5000 });

  // img part
  const images = await $$('div img');
  console.log(`Total amount of Images: ${images.length}`);
  await images.forEach((element) => expect(element).toBeDisplayed());

  let elements = await $$('header a[href*="https"]'); // we need to add specific class for cta_btn_qa at the fixer there an issue with twitter link
  console.log(`Total amount of links: ${elements.length}`);
  // for
  for (const item of elements) {
    let singleLink = await item.getAttribute('href');

    if (singleLink.startsWith('https://twitter.com/')) {
      continue;
    }

    const response = await fetch(singleLink);
    console.log(`Link: ${response.url} Status: ${response.status}`);

    if (response.status !== 200) {
      console.log(`Link: ${response.url} Status: ${response.status}`);
      assert(response.status === 200);
    }
  }
}
