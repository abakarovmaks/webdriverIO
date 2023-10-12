/* eslint-disable wdio/no-pause */
import MAIN_PAGE from './classes/main-page';
import HEALTHCHECK from '../healthcheckTests/healthcheck';
import Elements from './data/elements';
import CTAlinks from './data/cta-links';
import Helpers from './data/helpers';
const amf = require('../amf/amf');
const assert = require('assert');

const mainUrlDev = `https://${HEALTHCHECK.login}:${HEALTHCHECK.password}@test-com`;
const mainUrl = 'https://test.com/';
const mainUrlHttp = 'http://test.com/';
const mainUrlWww = 'https://www.test.com/';
const mainUrlSlash = 'https://test.com';
const jobUrl = `https://${process.env.JOB_BASE_NAME}/`;

describe('1. test Main Page', () => {
  beforeEach(async () => {
    await browser.url(`${mainUrl}`);
    await browser.setWindowSize(1822, 1079);
    await browser.deleteCookies();
  });

  /* ---------- HEALTHCHECK ---------- */
  it('Test 1: Check X-robots header response', async () => {
    await HEALTHCHECK.checkXRobotsTag(mainUrlDev);
  });
  it('Test 2: Footer', async () => {
    await HEALTHCHECK.checkFooterExists(Elements.footer);
  });
  it('Test 3: Logo is not clickable', async () => {
    await HEALTHCHECK.logoNotClickable(Elements.logoMain);
  });
  // it('Test 4: Check image attributes', async () => {
  //   await HEALTHCHECK.checkImageAttributes(Elements.footer, Elements.allImages);
  // });
  it('Test 4: Check horisontal scroll', async () => {
    await HEALTHCHECK.checkHorizontalScroll(mainUrl);
  });
  // it('Test 6: Check console errors', async () => {
  //   await HEALTHCHECK.checkConsoleErrors();
  // });
  it('Test 5: Check redirect from http to https', async () => {
    await HEALTHCHECK.redirectFromHttp(mainUrlHttp, mainUrl);
  });
  it('Test 6: Check redirect from www', async () => {
    await HEALTHCHECK.redirectFromWww(mainUrlWww, mainUrl);
  });
  it('Test 7: Check redirect none slash', async () => {
    await HEALTHCHECK.redirectNoneSlash(mainUrlSlash, mainUrl);
  });
  it('Test 8: Check GTM', async () => {
    await browser.refresh();
    await MAIN_PAGE.SECTIONS.reviewsSection.scrollIntoView();
    await browser.pause(1000);
    await HEALTHCHECK.checkConsoleErrorGtm(
      HEALTHCHECK.slackMessageGtag,
      mainUrl
    );
  });
  it('Test 9: Check Encoding', async () => {
    await HEALTHCHECK.checkEncodingAvailable(jobUrl);
  });
  it('Test 10: Check response headers', async () => {
    await HEALTHCHECK.checkResponseHeader(jobUrl);
  });
  it('Test 11: Check links status', async () => {
    await HEALTHCHECK.checkLinksStatus();
  });
  it('Test 12: Header', async () => {
    await HEALTHCHECK.checkHeaderExists(Elements.header);
  });

  /* ---------- End of HEALTHCHECK ---------- */

  /* Main part */
  //   Verify TITLE
  it('Test 13: Title', async () => {
    await Helpers.verifyTitle(Elements.TITLES.mainPage);
  });
  // Verify LOGO
  it('Test 14: Logo redirect', async () => {
    await amf.logoRedirectUrl(Elements.logoMain, `${mainUrl}`);
  });
  // Verify H1
  it('Test 15: Assert H1', async () => {
    await amf.toHaveText(Elements.H1.mainPage, Elements.HEADING.mainPage);
  });
  // Verify LOG IN
  it('Test 16: Log in redirect URL with UTM', async () => {
    await Elements.loginBtn.waitForDisplayed();
    await Elements.loginBtn.click();
    await amf.getUrl(CTAlinks.loginUrl);
  });
  // Verify CTA btn in header
  it('Test 17: CTA in header UTM', async () => {
    await MAIN_PAGE.CTA.hireWriter.waitForDisplayed();
    await MAIN_PAGE.CTA.hireWriter.click();
    await amf.getUrl(CTAlinks.ctaHeaderUrl);
  });
  // Verify CTA in sidebar form UTM
  it('Test 18: CTA in sidebar form UTM', async () => {
    await MAIN_PAGE.topicField.setValue('test');
    await MAIN_PAGE.CTA.sidebar.click();
    await browser.pause(1000);
    await amf.getUrl(CTAlinks.MainPage.ctaSidebarForm);
  });
  // Verify CTA Find Writer UTM
  it('Test 19: CTA Find Writer UTM', async () => {
    await MAIN_PAGE.CTA.findWriter.click();
    await browser.pause(1000);
    await amf.getUrl(CTAlinks.MainPage.ctaFindWriter);
  });
  // Verify CTA Order Unique Assignment UTM
  it('Test 20: CTA Order Unique Assignment UTM', async () => {
    await MAIN_PAGE.CTA.uniqueAssignment.click();
    await browser.pause(1000);
    await amf.getUrl(CTAlinks.MainPage.ctaUniqueAssignment);
  });
  // Verify CTA Place Order UTM
  it('Test 21: CTA Place Order UTM', async () => {
    await MAIN_PAGE.CTA.placeOrder.scrollIntoView();
    await MAIN_PAGE.CTA.placeOrder.click();
    await browser.pause(1000);
    await amf.getUrl(CTAlinks.MainPage.ctaPlaceOrder);
  });
  // Verify Email in header and footer
  it('Test 22: Email in header and footer', async () => {
    await MAIN_PAGE.emailHeader.isClickable();
    await MAIN_PAGE.emailFooter.isClickable();
  });
  // Verify Local list in header
  it('Test 23: Local list in header', async () => {
    await MAIN_PAGE.worldwideLocal.click();
    await amf.exToBeDisplayed(MAIN_PAGE.localListHeader);
    await amf.elementsLength(MAIN_PAGE.localItemsHeader, 12);
  });
  // Verify Navigation length
  it('Test 24: Navigation length', async () => {
    await expect(MAIN_PAGE.navComponents).toHaveChildren(6);
  });
  // Verify Services length
  it('Test 25: Services length', async () => {
    await MAIN_PAGE.navServices.click();
    await expect(MAIN_PAGE.navServicesList).toHaveChildren(8);
  });
  // Verify Writing Tools length
  it('Test 26: Writing Tools length', async () => {
    await MAIN_PAGE.navTools.click();
    await expect(MAIN_PAGE.navToolsList).toHaveChildren(4);
  });
  // Verify Citation Tools length
  it('Test 27: Citation Tools length', async () => {
    await MAIN_PAGE.navCitations.click();
    await expect(MAIN_PAGE.navCitationsList).toHaveChildren(6);
  });
  // Verify Contact Us length
  it('Test 28: Contact Us length', async () => {
    await MAIN_PAGE.navContact.click();
    await expect(MAIN_PAGE.navContactList).toHaveChildren(3);
  });
  // Verify Blog redirect
  it('Test 29: Blog redirect', async () => {
    await MAIN_PAGE.navBlog.click();
    await expect(browser).toHaveUrl('https://test.com/blog');
  });
  // Verify About Us redirect
  it('Test 30: About Us redirect', async () => {
    await MAIN_PAGE.navAboutUs.click();
    await expect(browser).toHaveUrl('https://test.com/about-us');
  });
  // Verify Reviews section is exist
  it('Test 31: Reviews section is exist', async () => {
    await amf.isExist(MAIN_PAGE.SECTIONS.reviewsSection);
  });
  // Verify Writing Team carousel is displayed
  it('Test 32: Writing Team carousel is displayed', async () => {
    await MAIN_PAGE.activeCardFeedback.isDisplayed();
  });
  // Verify Help services
  it('Test 33: Help services', async () => {
    await amf.isExist(MAIN_PAGE.helpServices);
    await expect(MAIN_PAGE.unitedStates).toHaveChildren(5);
    await expect(MAIN_PAGE.canada).toHaveChildren(5);
    await expect(MAIN_PAGE.ireland).toHaveChildren(4);
    await expect(MAIN_PAGE.unitedArabEmirates).toHaveChildren(5);
  });
  // Verify Footer locales
  it('Test 34: Footer locales', async () => {
    await expect(MAIN_PAGE.footerLocales).toHaveChildren(12);
  });
  // Verify Form subjects
  it('Test 35: Form subjects', async () => {
    await MAIN_PAGE.formInput.click();
    await browser.pause(1000);
    await expect(MAIN_PAGE.formDropdawnList).toBeDisplayed();
    assert(
      (await MAIN_PAGE.formDropdawnItems.length) >= 53,
      `Length is____________ ${await MAIN_PAGE.formDropdawnItems.length}`
    );
  });
  // Verify Input search by words
  it('Test 36: Input search by words', async () => {
    await MAIN_PAGE.formInput.click();
    await browser.pause(1000);
    await MAIN_PAGE.formInput.setValue('sp');
    await browser.pause(1000);
    await expect(MAIN_PAGE.searchValue).toBeDisplayed();
    await expect(MAIN_PAGE.defaultValue).toBeDisplayed();
  });

  it('Test 37: Check accessibility', async () => {
    await HEALTHCHECK.checkAxeAccesibility();
  });

  it('Test 38: Check microdata', async () => {
    await HEALTHCHECK.checkMicrodata(mainUrl);
  });

  // Verify Page speed result test
  it('Test 39: Page speed result test', async () => {
    await amf.pageSpeed(
      `${mainUrl}`,
      'test Main Page',
      `${mainUrl}`,
      'https://jenkins.test.link/'
    );
  });
});
