module.exports = {
  TITLES: {
    mainPage: 'test data',
    blogPage: 'Blog - test data',
    plagiarismChecker: 'test data',
    conclusionGenerator: 'test data',
    paraphrasingTool: 'test data',
  },

  HEADING: {
    mainPage: 'test data',
    blogPage: 'test data Blog',
    plagiarismChecker: 'test data',
    conclusionGenerator: 'test data',
    paraphrasingTool: 'test data',
  },

  H1: {
    mainPage: 'h1.first-screen-heading',
    blogPage: '#replace-title-js',
    plagiarismChecker: '.plagiarism_box h1',
    conclusionGenerator: '.text-content h1',
    paraphrasingTool: '.text-content h1',
  },

  SocialLinks: {
    facebook: 'https://www.facebook.com/test/',
    instagram: 'https://www.instagram.com/test/?hl=en',
    twitter: 'https://twitter.com/test',
    pinterest: 'https://www.pinterest.com/test/',
  },

  get loginBtn() {
    return $('.login .header-button-login');
  },
  get logoMain() {
    return $('.logo');
  },
  get logo() {
    return $('.logo[href]');
  },
  get header() {
    return $('a.hire_writer-header.header-button-hire.btn-primary');
  },

  get canonical() {
    return $("link[rel='canonical']");
  },
  get manyCanonical() {
    return $$("link[rel='canonical']");
  },
  get nextLink() {
    return $$("link[rel='next']");
  },
  get prevLink() {
    return $$("link[rel='prev']");
  },

  /* Healthcheck */
  get headerWraper() {
    return $('div.header_top-wrap');
  },
  get footer() {
    return $('div.footer-wrap');
  },
  get breadcrumbs() {
    return $('div.breadcrumbs');
  },
  get allImages() {
    return $('* img');
  },
};
