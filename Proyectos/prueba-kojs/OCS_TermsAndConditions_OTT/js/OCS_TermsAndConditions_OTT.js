define(
  ['jquery', 'knockout', 'ccResourceLoader!global/globalFn', 'CCi18n'],

  function ($, ko, globalFn, CCi18n) {
    "use strict";

    var isLoaded = ko.observable(false);

    $.Topic(globalFn.CCConstants.TOPICS.PRODUCTS_UPDATED).subscribe(function (data) {
      isLoaded(false);
      isLoaded(true);
    });

    var API = {
      onLoad: function (widget) {
        widget.isLoaded = isLoaded;
        widget.isCheckoutFinish = ko.observable(false);
        widget.cartService = globalFn.cartService;

        $.Topic(globalFn.CCConstants.TOPICS.SHOW_STEP).subscribe(function (step) {
          widget.isCheckoutFinish(step === globalFn.CCConstants.CHECKOUT_LAST_STEP);
        });
      },
      initialize: function (widget) {
        // widget.cartService.observable.isTermsConditions(true);

      },
      beforeAppear: function (page) {
        if (globalFn.cache(globalFn.CCConstants.SERVICES.OCC_PRODUCTS)) {
          isLoaded(false);
          isLoaded(true);
        }
      }
    }
    return API;
  }
);