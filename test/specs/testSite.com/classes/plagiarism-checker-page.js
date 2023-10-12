class PLAGIARISM_CHECKER {
  /* CTA buttons */
  CTA = {
    get hireEditor() {
      return $('.banner_content a');
    },
    get hireWriter() {
      return $('.cta-block_btn a');
    },
    get hireWriterHeader() {
      return $('.header_bottom-buttons > a');
    },
    get placeOrder() {
      return $('.cta-footer-wrap a');
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
    return $('#plagiarism_checker_wrapper');
  }
  get plagiarismBtn() {
    return $('.plagiarism_btn_checking .btn-sec');
  }
  get label() {
    return $('.check_cont');
  }
  get type() {
    return $('#types_papers .pseudo-radio:nth-child(3)');
  }
  get inputText() {
    return $('.textTitle');
  }
  get textarea() {
    return $('#testText');
  }

  // Validation
  get validationType() {
    return $('.error-msg.type-paper-err');
  }
  get validationTitle() {
    return $('.error-msg.title-err');
  }
  get validationText() {
    return $('.error-msg.text-err');
  }
  get validationWindow() {
    return $('.popup-content p');
  }
}

export default new PLAGIARISM_CHECKER();
