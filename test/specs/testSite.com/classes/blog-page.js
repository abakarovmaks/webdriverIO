class BLOG_PAGE {
  // CTA buttons
  CTA = {
    get placeOrder() {
      return $('.cta_footer_blog');
    },
    get hireWriter() {
      return $('.header_bottom-buttons > a');
    },
  };

  get emailHeader() {
    return $('.contact-email');
  }
  get emailFooter() {
    return $('.footer-email');
  }

  // Nav components
  get tabs() {
    return $('.blog-category__list');
  }
  get worldwideLocal() {
    return $('div.header-locale');
  }
  get localListHeader() {
    return $('div.locale-list');
  }
  get localItemsHeader() {
    return $$('div.locale-list a');
  }
  get navComponents() {
    return $('#menu-main-menu');
  }
  get navServices() {
    return $('.menu-item-34061');
  }
  get navServicesList() {
    return $('.menu-item-34061 > ul');
  }
  get navTools() {
    return $('.menu-item-38591');
  }
  get navToolsList() {
    return $('.menu-item-38591 > ul');
  }
  get navCitations() {
    return $('.menu-item-38597');
  }
  get navCitationsList() {
    return $('.menu-item-38597 > ul');
  }
  get navContact() {
    return $('.menu-item-34056');
  }
  get navContactList() {
    return $('.menu-item-34056 > ul');
  }
  get navBlog() {
    return $('.menu-item-67342');
  }
  get navAboutUs() {
    return $('.menu-item-34055');
  }

  // Search
  get searchField() {
    return $('form .blog-search__input');
  }
  get searchBtn() {
    return $('form .blog-search__submit');
  }

  // Cards
  get card() {
    return $('.posts-list .post:first-child');
  }
  get cardInfoFirst() {
    return $('.posts-list .post:first-child .post__content .post__box-top');
  }
  get cardInfoBottom() {
    return $('.posts-list .post:first-child .post__content .post__box-bottom');
  }
  get cardBtn() {
    return $('.posts-list .post:first-child .post__more');
  }

  // Pagination
  get secondPage() {
    return $('.page-numbers li:nth-child(2) a');
  }

  get footerLocales() {
    return $('div .footer-locales__list');
  }
}

export default new BLOG_PAGE();
