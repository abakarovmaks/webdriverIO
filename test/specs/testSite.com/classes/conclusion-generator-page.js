class CONCLUSION_GENERATOR {
  /* CTA buttons */
  CTA = {
    get placeOrder() {
      return $('.cta-footer-wrap a');
    },
    get hireWriter() {
      return $('.header_bottom-buttons > a');
    },
  };

  get logo() {
    return $('a.logo');
  }
  get emailHeader() {
    return $('.contact-email');
  }
  get emailFooter() {
    return $('.footer-email');
  }
  get loginBtn() {
    return $('.log-in a');
  }

  /* Nav components */
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
  get footerLocales() {
    return $('div .footer-locales__list');
  }

  /* Form */
  get form() {
    return $('.plag-checker.js_plag-checker');
  }
  get inputTitle() {
    return $('#input-title');
  }
  get inputText() {
    return $('#input-content');
  }
  get summariseBtn() {
    return $('#generator-submit');
  }
  get textarea() {
    return $('#testText');
  }
  get summaryRatio() {
    return $('div.plag-checker__sitename');
  }
  get originalLength() {
    return $(
      '.plag-checker__col:nth-child(2) .plag-checker__table-percent.js_checker__table-percent'
    );
  }
  get summaryLength() {
    return $(
      '.plag-checker__col:nth-child(3) .plag-checker__table-percent.js_checker__table-percent'
    );
  }
  get resultSummary() {
    return $('#result-summary');
  }
  get orderUniquePaper() {
    return $('.improve-summary__btn-wrap .btn.btn_main');
  }
  get summariseAnotherText() {
    return $('a.js_checker__submit');
  }

  // Validation
  get validationTitle() {
    return $('#errmsg');
  }
}

export default new CONCLUSION_GENERATOR();
