class PARAPHRASING_TOOL {
  /* CTA buttons */
  CTA = {
    get placeOrder() {
      return $('.cta-footer-wrap a');
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
  get textarea() {
    return $('div #content-input');
  }
  get paraphraseBtn() {
    return $('#btn-run');
  }
  get changebleWord() {
    return $("//span[@data-id='1']");
  }
  get anotherword() {
    return $("//a[contains(text(),'call')]");
  }
  get finishBtn() {
    return $("//button[text()='Finish']");
  }
  get retryBtn() {
    return $('button#btn-retry');
  }
  get paraphraseAnotherBtn() {
    return $('button#btn-another-text');
  }
  get needExpertHelp() {
    return $('button.btn.btn_main.btn_without-shadow');
  }
}

export default new PARAPHRASING_TOOL();
