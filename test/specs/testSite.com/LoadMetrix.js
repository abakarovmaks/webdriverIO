import HEALTHCHECK from '../healthcheckTests/healthcheck';
const mainUrl = 'https://test.com/';

describe('test Load Metrix: Main Page', () => {
  before(async () => {
    await browser.enablePerformanceAudits();
  });

  it('1. Get metrics (LOAD)', async () => {
    await HEALTHCHECK.getMetrix(mainUrl);
  });

  after(async () => {
    await browser.disablePerformanceAudits();
  });
});
