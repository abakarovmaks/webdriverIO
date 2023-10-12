module.exports = {
  async verifyTitle(page) {
    await expect(browser).toHaveTitle(page);
  },
};
