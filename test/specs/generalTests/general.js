import HEALTHCHECK from '../healthcheck/healthcheck';
import amf from '../amf/amf';

const urls = [
  'https://test1.com/',
  'https://test2.com/examples/',
  'https://test3.com/examples/',
  'https://test4.com/',
  'https://test5.com/',
];

describe('Basic tests for all domains', () => {
  // HTTP Response Headers
  it('Test 1: Check availability of response headers', async () => {
    await HEALTHCHECK.checkResponseHeaders(urls);
  });
  // Encoding availability
  it('Test 2: Check availability of gzip/br/deflate', async () => {
    await HEALTHCHECK.checkEncodingAvailableUrls(urls);
  });
  // Webcheck Pagespeed
  it('Test 3: Webcheck pagespeed verifying', async () => {
    await HEALTHCHECK.webcheckVerify(urls);
  });

  // amf global smoke
  for (const url of urls) {
    it(`Test 4: Global smoke for ${url}`, async () => {
      await amf.globalSmoke(url);
    });
  }
});
