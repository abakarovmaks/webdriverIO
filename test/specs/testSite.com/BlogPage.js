/* eslint-disable wdio/no-pause */
import BLOG_PAGE from './classes/blog-page';
import HEALTHCHECK from '../healthcheckTests/healthcheck';
import Elements from './data/elements';
import CTAlinks from './data/cta-links';
import Helpers from './data/helpers';
const amf = require('../amf/amf');
const assert = require('assert');

const mainUrl = 'https://test.com/blog';
const mainUrlHttp = 'http://test.com/blog';
const mainUrlWww = 'https://www.test.com/blog';
const mainUrlSlash = 'https://test.com/blog/';

const baseUrl = 'https://test.com/';

describe('2. test Blog Page', () => {
  beforeEach(async () => {
    await browser.url(`${mainUrl}`);
    await browser.setWindowSize(1822, 1079);
    await browser.deleteCookies();
  });

  /* ---------- HEALTHCHECK ---------- */
  it('Test 1: Header', async () => {
    await HEALTHCHECK.checkHeaderExists(Elements.header);
  });
  it('Test 2: Footer', async () => {
    await HEALTHCHECK.checkFooterExists(Elements.footer);
  });
  it('Test 3: Logo is clickable', async () => {
    await HEALTHCHECK.logoIsClickable(Elements.logo);
  });
  // it('Test 4: Check image attributes', async () => {
  //   await HEALTHCHECK.checkImageAttributes(Elements.footer, Elements.allImages);
  // });
  it('Test 4: Check horisontal scroll', async () => {
    await HEALTHCHECK.checkHorizontalScroll(mainUrl);
  });
  it('Test 5: Check breadcrumbs exist', async () => {
    await HEALTHCHECK.checkBreadcrumbsExists(Elements.breadcrumbs);
  });
  // it('Test 7: Check console errors', async () => {
  //   await HEALTHCHECK.checkConsoleErrors();
  // });
  it('Test 6: Check redirect from http to https', async () => {
    await HEALTHCHECK.redirectFromHttp(mainUrlHttp, mainUrl);
  });
  it('Test 7: Check redirect from www', async () => {
    await HEALTHCHECK.redirectFromWww(mainUrlWww, mainUrl);
  });
  it('Test 8: Check redirect none slash', async () => {
    await HEALTHCHECK.redirectNoneSlash(mainUrlSlash, mainUrl);
  });
  it('Test 9: Check links status', async () => {
    await HEALTHCHECK.checkLinksStatus();
  });
  /* ---------- End of HEALTHCHECK ---------- */

  /* Main part */

  //   Verify TITLE
  it('Test 10: Title', async () => {
    await Helpers.verifyTitle(Elements.TITLES.blogPage);
  });
  // Verify LOGO
  it('Test 11: Logo redirect', async () => {
    await amf.logoRedirectUrl(Elements.logo, `${baseUrl}`);
  });
  // Verify H1
  it('Test 12: Assert H1', async () => {
    await amf.toHaveText(Elements.H1.blogPage, Elements.HEADING.blogPage);
  });
  // Verify LOG IN
  it('Test 13: Log in redirect URL with UTM', async () => {
    await Elements.loginBtn.waitForDisplayed();
    await Elements.loginBtn.click();
    await amf.getUrl(CTAlinks.loginUrl);
  });
  // Verify CTA btn in header
  it('Test 14: CTA in header UTM', async () => {
    await BLOG_PAGE.CTA.hireWriter.waitForDisplayed();
    await BLOG_PAGE.CTA.hireWriter.click();
    await amf.getUrl(CTAlinks.ctaHeaderUrl);
  });
  // Verify CTA Place Order UTM
  it('Test 15: CTA Place Order UTM', async () => {
    await BLOG_PAGE.CTA.placeOrder.scrollIntoView();
    await BLOG_PAGE.CTA.placeOrder.click();
    await browser.pause(1000);
    await amf.getUrl(CTAlinks.BlogPage.ctaPlaceOrder);
  });
  // Verify Email in header and footer
  it('Test 16: Email in header and footer', async () => {
    await BLOG_PAGE.emailHeader.isClickable();
    await BLOG_PAGE.emailFooter.isClickable();
  });
  // Verify Local list in header
  it('Test 17: Local list in header', async () => {
    await BLOG_PAGE.worldwideLocal.click();
    await amf.exToBeDisplayed(BLOG_PAGE.localListHeader);
    await amf.elementsLength(BLOG_PAGE.localItemsHeader, 9);
  });
  // Verify Navigation length
  it('Test 18: Navigation length', async () => {
    await expect(BLOG_PAGE.navComponents).toHaveChildren(6);
  });
  // Verify Services length
  it('Test 19: Services length', async () => {
    await BLOG_PAGE.navServices.click();
    await expect(BLOG_PAGE.navServicesList).toHaveChildren(8);
  });
  // Verify Writing Tools length
  it('Test 20: Writing Tools length', async () => {
    await BLOG_PAGE.navTools.click();
    await expect(BLOG_PAGE.navToolsList).toHaveChildren(4);
  });
  // Verify Citation Tools length
  it('Test 21: Citation Tools length', async () => {
    await BLOG_PAGE.navCitations.click();
    await expect(BLOG_PAGE.navCitationsList).toHaveChildren(6);
  });
  // Verify Contact Us length
  it('Test 22: Contact Us length', async () => {
    await BLOG_PAGE.navContact.click();
    await expect(BLOG_PAGE.navContactList).toHaveChildren(3);
  });
  // Verify Blog redirect
  it('Test 23: Blog redirect', async () => {
    await BLOG_PAGE.navBlog.click();
    await expect(browser).toHaveUrl('https://test.com/blog');
  });
  // Verify About Us redirect
  it('Test 24: About Us redirect', async () => {
    await BLOG_PAGE.navAboutUs.click();
    await expect(browser).toHaveUrl('https://test.com/about-us');
  });
  // Verify Canonical
  it('Test 25: Canonical', async () => {
    await amf.verifyCanonical(`${mainUrl}`);
  });
  // Verify Canonical should be only one
  it('Test 26: Canonical should be only one', async () => {
    await amf.verifyCanonicalLength();
  });
  // Verify Link next in pagination on the 1st page
  it('Test 27: Link next in pagination on the 1st page', async () => {
    const nextLink = await Elements.nextLink;
    assert.strictEqual(nextLink.length, 2);
  });
  // Verify Link prev in pagination on the 2nd page
  it('Test 28: Link prev in pagination on the 2nd page', async () => {
    await browser.url(`${mainUrl}/page/2/`);
    const prevLink = await Elements.prevLink;
    assert.strictEqual(prevLink.length, 2);
  });
  // Verify Link next in pagination on the 2nd page
  it('Test 29: Link next in pagination on the 2nd page', async () => {
    await browser.url(`${mainUrl}/page/2/`);
    const nextLink = await Elements.nextLink;
    assert.strictEqual(nextLink.length, 2);
  });
  // Verify Absense of link next in pagination on the last page
  it('Test 30: Absense of link next in pagination on the last page', async () => {
    await browser.url(`${mainUrl}/page/14`);
    const nextLink = await Elements.nextLink;
    assert.strictEqual(nextLink.length, 0);
  });
  // Verify Search result
  it('Test 31: Search result', async () => {
    await BLOG_PAGE.searchField.setValue('war');
    await BLOG_PAGE.searchBtn.click();
    await expect(browser).toHaveUrl('https://test.com/?s=war');
  });
  // Verify Tabs
  it('Test 32: Tabs', async () => {
    await expect(BLOG_PAGE.tabs).toHaveChildren(5);
  });
  // Verify Visible cards quantity
  it('Test 33: Visible cards quantity', async () => {
    await expect(BLOG_PAGE.card).toHaveChildren(2);
    await expect(BLOG_PAGE.cardInfoFirst).toHaveChildren(4);
    await expect(BLOG_PAGE.cardInfoBottom).toHaveChildren(2);
    await BLOG_PAGE.cardBtn.click();
    await expect(browser).toHaveUrl(
      'https://test.com/blog/how-to-write-footnotes'
    );
  });
  // Verify Pagination
  it('Test 34: Pagination', async () => {
    await BLOG_PAGE.secondPage.click();
    await expect(browser).toHaveUrl(`${mainUrl}/page/2`);
  });
  // Verify Footer locales
  it('Test 35: Footer locales', async () => {
    await expect(BLOG_PAGE.footerLocales).toHaveChildren(12);
  });

  it('Test 36: Check accessibility', async () => {
    await HEALTHCHECK.checkAxeAccesibility();
  });

  // Verify Page speed result test
  it('Test 37: Page speed result test', async () => {
    await amf.pageSpeed(
      `${mainUrl}`,
      'test Blog Page',
      `${mainUrl}`,
      'https://jenkins.test.link/'
    );
  });
});
