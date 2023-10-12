const { fetch } = require('fetch-ponyfill')();
const fs = require('fs');
const { URL } = require('url');
const assert = require('assert');
import AxeBuilder from '@axe-core/webdriverio';
import Constants from '../constants/constants';

class HEALTHCHECK {
  get login() {
    return 'test_login';
  }
  get password() {
    return 'test_password';
  }
  // Check error message with GTAG
  async slackMessageGtag(url, message) {
    const body = {
      text: String(`*Error with GTAG* \nSite: ${url} \nMessage: ${message}`),
    };
    const response = await fetch(
      'https://hooks.slack.com/services/test_token',
      {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      }
    );
    console.log('RESPONSE:', response);
  }
  // Check that header is exist
  async checkHeaderExists(header) {
    const ok = await header.isDisplayed();
    return assert(ok, "Header isn't displayed!");
  }
  // Check that header is exist
  async checkFooterExists(footer) {
    const ok = await footer.isDisplayed();
    return assert(ok, "Footer isn't displayed!");
  }
  // Check that logo is not cickable on the home page
  async logoNotClickable(logo) {
    await logo.moveTo();
    await browser.pause(Constants.PAUSE_SEC);
    const style = await logo.getCSSProperty('cursor');
    const result = await style.value;
    return assert.strictEqual(
      result,
      'auto',
      'Logo is clickable on the main page!'
    );
  }
  // Check that logo is cickable on all pages
  async logoIsClickable(logo) {
    await logo.moveTo();
    await browser.pause(Constants.PAUSE_SEC);
    const style = await logo.getCSSProperty('cursor');
    const result = await style.value;
    return assert(
      result === 'autopointer' || 'pointerautopointer' || 'pointer',
      "Logo isn't clickable on the page!"
    );
  }
  // Check image attributes
  async checkImageAttributes(footer, allImages) {
    await footer.scrollIntoView();
    const imgs = await allImages;
    let hasAttributes = true;

    for (const image of imgs) {
      const alt = await image.getAttribute('alt');
      const src = await image.getAttribute('src');

      if (alt === '' || src === '') {
        hasAttributes = false;
      }
    }
    assert.strictEqual(
      hasAttributes,
      true,
      "Some of images don't have ALT or SRC!"
    );
    console.log('All images quantity:', imgs.length);
  }
  // Check that horisontal scroll is absent
  async checkHorizontalScroll(link) {
    await browser.url(link);
    await browser.pause(2000);
    await browser.execute(() => window.scrollBy(0, 200));
    await browser.pause(2000);
    // Width of all the document
    const documentWidth = await browser.execute(
      async () => document.documentElement.scrollWidth
    );
    console.log('documentWidth ---', documentWidth);

    // Width of the visible area of ​​the browser window
    const windowWidth = await browser.execute(async () => window.innerWidth);
    console.log('windowWidth ---', windowWidth);

    return assert(
      windowWidth >= documentWidth,
      'This site has horisontal scroll!'
    );
  }
  // Check that breadcrumbs is exist
  async checkBreadcrumbsExists(breadcrumbs) {
    const ok = await breadcrumbs.isDisplayed();
    return assert(ok, "Bredcrumbs isn't displayed!");
  }
  // Check all SEVERE error in console
  async checkConsoleErrors() {
    const logs = await browser.getLogs('browser');
    console.log('All logs quantity ---', await logs.length);

    // filter out the unwanted logs
    const filteredLogs = logs.filter((log) => {
      return (
        log.level === 'SEVERE' &&
        !log.message.includes('https://api.telegram.org/favicon.ico')
      );
    });
    console.log('SEVERE____________', await filteredLogs.length);
    return assert.strictEqual(filteredLogs.length, 0, 'Console has an errors!');
  }
  // Check only errors with GTM in console
  async checkConsoleErrorGtm(func, urlLink) {
    let url = urlLink;
    const logs = await browser.getLogs('browser');
    console.log('All logs quantity ---', await logs.length);
    const filteredLogs = logs.filter((log) => {
      return (
        log.level === 'SEVERE' &&
        log.message.includes('https://www.googletagmanager.com/gtag')
      );
    });
    console.log('PROBLEM WITH GTM____________', filteredLogs);
    await func(url, filteredLogs[0].message);
    return assert.strictEqual(
      filteredLogs.length,
      0,
      'Console has an error with GTM! The message was send to the Slack.'
    );
  }
  // Check that robots.txt is exist
  async checkRobotsTxt(robotsUrl) {
    await browser.url(robotsUrl);
    const siteLink = await fetch(robotsUrl);
    const getStatus = siteLink.status;
    return assert.strictEqual(
      getStatus,
      Constants.SUCCESS_STATUS,
      'Robots.txt page is missing!'
    );
  }
  // Check redirect
  async redirectFromHttp(http, https) {
    await browser.url(http);
    const redirect = await browser.getUrl();
    assert.strictEqual(redirect, https, "Doesn't have redirect to HTTPS");
  }
  // Check redirect from www
  async redirectFromWww(wwwUrl, url) {
    await browser.url(wwwUrl);
    const redirect = await browser.getUrl();
    assert.strictEqual(redirect, url, "Doesn't have redirect to simple page");
  }
  // Check redirect with no slash
  async redirectNoneSlash(urlWithoutSlash, url) {
    await browser.url(urlWithoutSlash);
    const redirect = await browser.getUrl();
    assert.strictEqual(
      redirect,
      url,
      "Doesn't have redirect to the page with slash"
    );
  }
  // Check links status code
  async checkLinksStatus() {
    const links = await $$('[href]:not([href^="mailto:"]):not([href^="tel:"])');
    const absoluteUrl = new URL(await browser.getUrl());

    for (const link of links) {
      const href = await link.getAttribute('href');
      const url = new URL(href, absoluteUrl);

      // Exclude a specific link
      if (
        link.startsWith('https://twitter.com/') ||
        link.startsWith('https://fonts.gstatic.com/') ||
        link.startsWith('https://www.instagram.com/') ||
        link.startsWith('https://www.googleoptimize.com/')
      ) {
        continue;
      }

      const response = await fetch(url.href);
      if (response.status >= 400) {
        console.log(
          'Links has bad status:',
          link,
          `_____________${response.status}`
        );
      }
      assert(
        response.status <= 400,
        `URL "${url.href}" returned status code ${response.status}`
      );
    }
    console.log('ALL LINKS___________________:', links.length);
  }
  // Check that XRobots tag is exist
  async checkXRobotsTag(url) {
    const response = await fetch(url);
    const headers = response.headers;
    const xRobotsTagValue = await headers.get('X-Robots-Tag');
    const result =
      xRobotsTagValue &&
      xRobotsTagValue.includes('noindex') &&
      xRobotsTagValue.includes('nofollow');

    if (result) {
      console.log('Header "X-Robots-Tag" has value NOINDEX, NOFOLLOW');
    }

    assert.strictEqual(
      result,
      true,
      'Header "X-Robots-Tag" has no value NOINDEX, NOFOLLOW or no such header at all'
    );
  }
  // Check that encoding available
  async checkEncodingAvailable(url) {
    const response = await fetch(url);
    const headers = response.headers;
    const headerTagValue = headers.get('Content-Encoding');
    const result =
      (headerTagValue && headerTagValue.includes('gzip')) ||
      (headerTagValue && headerTagValue.includes('br')) ||
      (headerTagValue && headerTagValue.includes('deflate'));

    if (result) {
      console.log(`${headerTagValue} is available`);
    }

    assert.strictEqual(result, true, 'Content-Encoding is NOT available');
  }
  // Check that encoding available (with array)
  async checkEncodingAvailableUrls(links) {
    const failedUrls = [];

    await Promise.all(
      links.map(async (link) => {
        try {
          const response = await fetch(link);
          const headerTagValue = response.headers.get('Content-Encoding');

          if (headerTagValue && /gzip|br|deflate/.test(headerTagValue)) {
            console.log(`${headerTagValue} is available on ${link}`);
          }
        } catch (error) {
          console.error(`Failed to fetch ${link}: ${error}`);
          failedUrls.push(link);
        }
      })
    );

    if (failedUrls.length > 0) {
      console.log('URLs without encoding:', failedUrls);
    } else {
      console.log('All URLs fetched successfully.');
    }

    assert.strictEqual(failedUrls.length, 0, `${failedUrls} without encoding`);
  }
  // Check that site has header response
  async checkResponseHeader(url) {
    const response = await fetch(url);
    const headers = response.headers;
    console.log('HTTP Response Headers:', headers);
    assert.ok(headers);
  }
  //Check that site has header response (with array)
  async checkResponseHeaders(links) {
    const failedUrls = [];

    const fetchPromises = links.map(async (link) => {
      try {
        const response = await fetch(link);
        const headers = response.headers;
        console.log('HTTP Response Headers for', link, ':', headers);
      } catch (error) {
        console.error('Failed to fetch', link, ':', error);
        failedUrls.push(link);
      }
    });

    await Promise.all(fetchPromises);

    if (failedUrls.length > 0) {
      console.log('Failed URLs:', failedUrls);
    } else {
      console.log('All URLs fetched successfully.');
    }

    assert.strictEqual(failedUrls.length, 0, `${failedUrls} is failed`);
  }
  // Difficult verifying of Google Pagespeed with API
  async webcheckVerify(links) {
    // API
    const url = 'https://web-check.it-boosta.com/web-check-api';
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer aee3ae42d7bd410ed815e65215fc7e8f',
    };

    // Array with previous results
    let previousResults = {};

    try {
      // If file exist, read it
      const data = fs.readFileSync('results.json', 'utf-8');
      previousResults = JSON.parse(data);
    } catch (error) {
      // Error from first time
      console.error(
        "Error while reading results file (maybe it doesn't exist yet):",
        error
      );
    }

    // Array with current results
    const currentResults = {};

    // Cycle
    for (const link of links) {
      const data = {
        task: 'get_page_speed_domain',
        domain: link,
        control_result: true,
      };

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers,
          body: new URLSearchParams(data).toString(),
        });

        if (response.ok) {
          const responseData = await response.json();
          const neededResult = responseData[0];
          console.log(`Result of request for ${link}:`, neededResult);

          const mobileValue = neededResult.mobile_global_value;
          const desktopValue = neededResult.desktop_global_value;

          console.log(`Mobile_speed for ${link}: ${mobileValue}`);
          console.log(`Desktop_speed for ${link}: ${desktopValue}`);

          currentResults[link] = {
            id: neededResult.id,
            mobile_global_value: mobileValue,
            desktop_global_value: desktopValue,
          };
        } else {
          console.error(`Error for response ${link}:`, response.statusText);
        }
      } catch (error) {
        console.error(`Error for error ${link}:`, error.message);
      }
    }

    // Saving results in file
    fs.writeFileSync(
      'results.json',
      JSON.stringify(currentResults, null, 2),
      'utf-8'
    );

    // Array for errors
    const errors = [];

    // Comparing the results
    for (const link of links) {
      const currentResult = currentResults[link];
      const previousResult = previousResults[link];

      if (currentResult && previousResult) {
        const currentId = currentResult.id;
        const previousId = previousResult.id;
        const currentMobileValue = currentResult.mobile_global_value;
        const previousMobileValue = previousResult.mobile_global_value;
        const currentDesktopValue = currentResult.desktop_global_value;
        const previousDesktopValue = previousResult.desktop_global_value;

        if (currentId > previousId) {
          // Variables for comparing results
          const percentChangeMob =
            ((previousMobileValue - currentMobileValue) / previousMobileValue) *
            100;
          const percentChangeDesk =
            ((previousDesktopValue - currentDesktopValue) /
              previousDesktopValue) *
            100;

          // Variables for assertions
          const persentEqualMob =
            percentChangeMob >= Constants.WEBCHECK_PERCENT;
          const persentEqualDesk =
            percentChangeDesk >= Constants.WEBCHECK_PERCENT;

          // Variables for error messages
          let errorMessageMob = '';
          let errorMessageDesk = '';

          let resultMob = previousMobileValue - currentMobileValue;
          let resultDesc = previousDesktopValue - currentDesktopValue;

          if (persentEqualMob) {
            errorMessageMob = `Mobile_speed for ${link} decreased by ${percentChangeMob.toFixed(
              2
            )}% (${previousMobileValue}-${currentMobileValue} = ${resultMob})`;
            // Добавляем ошибку в массив
            errors.push(errorMessageMob);
          }
          if (persentEqualDesk) {
            errorMessageDesk = `Desktop_speed for ${link} decreased by ${percentChangeDesk.toFixed(
              2
            )}% (${previousDesktopValue}-${currentDesktopValue} = ${resultDesc})`;
            // Add the error in array
            errors.push(errorMessageDesk);
          }
        }
      }
    }

    // Assertion
    if (errors.length > 0) {
      for (const error of errors) {
        console.error(error);
      }
      const errorMessage = `Result for some links are decreased!`;
      assert(false, errorMessage);
    }
  }
  // Check that GZIP is available (not stabile FRONT)
  async checkGZIPAvailable(url) {
    await browser.url('https://www.giftofspeed.com/gzip-test/');
    await $('input.form-control').setValue(url);
    await $('#submit').click();
    await browser.pause(2000);
    await expect($('div.cont1 span')).toHaveElementClassContaining('enabled');
  }
  // Check page load metrix
  async getMetrix(url) {
    await browser.url(url);
    const metrics = await browser.getMetrics();
    const domContentLoaded = metrics['domContentLoaded'] / 1000;
    const load = metrics['load'] / 1000;
    console.log(
      'Metrix_________________ \ndomContentLoaded: ',
      domContentLoaded,
      'ms',
      '\nload: ',
      load,
      'ms'
    );
  }
  // Check accessibility (only critical)
  async checkAxeAccesibility() {
    const builder = new AxeBuilder({ client: browser });
    const result = await builder.analyze();
    const violations = result.violations.filter(
      (violation) => violation.impact === 'critical'
    );
    const errorMessages = violations.map((violation, index) => {
      return `${index + 1}. ${violation.help}`;
    });
    const error = errorMessages.join('\n');
    assert.strictEqual(violations.length, 0, error);
  }
  // Check microdata is exist
  async checkMicrodata(url) {
    await browser.url('https://validator.schema.org/');
    await $('#new-test-url-input').setValue(url);
    const button = await $('#new-test-submit-button');
    await button.click();

    const listFirst = await $('.test(1)');
    const listSecond = await $('.test(2)');

    await expect(listFirst).not.toHaveElementClassContaining(
      'mdl-color-text--red'
    );
    await expect(listSecond).not.toHaveElementClassContaining(
      'mdl-color-text--red'
    );
  }
}

export default new HEALTHCHECK();
