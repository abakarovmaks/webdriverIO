class MAIN_PAGE {
  // Sections
  SECTIONS = {
    get reviewsSection() {
      return $('section.review-block');
    },
  };

  // CTA buttons
  CTA = {
    get sidebar() {
      return $('.btn-primary.order_1st-screen');
    },
    get findWriter() {
      return $('.btn-primary.find_writer');
    },
    get uniqueAssignment() {
      return $('.btn-primary.popular-sample-order.order_from_sample');
    },
    get placeOrder() {
      return $('.cta-footer-button.order-btn.btn-primary.order_footer');
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

  // Nav components
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
  get activeCardFeedback() {
    return $('.swiper-slide.swiper-slide-active');
  }
  get topicField() {
    return $('input[placeholder]');
  }
  get helpServices() {
    return $('.services-list');
  }
  get unitedStates() {
    return $('.services-list .service:nth-child(1) ul');
  }
  get canada() {
    return $('.services-list .service:nth-child(2) ul');
  }
  get ireland() {
    return $('.services-list .service:nth-child(3) ul');
  }
  get unitedArabEmirates() {
    return $('.services-list .service:nth-child(4) ul');
  }

  get footerLocales() {
    return $('div .footer-locales__list');
  }

  // Form
  get formInput() {
    return $('input.form-select-v2__input');
  }
  get formDropdawnList() {
    return $('div.form-select-v2__list');
  }
  get formDropdawnItems() {
    return $$('div.form-select-v2__list li');
  }
  get searchValue() {
    return $("div.form-select-v2__list li[data-text='Sport']");
  }
  get defaultValue() {
    return $("div.form-select-v2__list li[data-text='Other']");
  }
}

export default new MAIN_PAGE();
