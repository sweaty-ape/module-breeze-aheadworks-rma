define([
    'jquery',
    'Magento_Ui/js/modal/modal',
    'Magento_Ui/js/modal/alert',
    'mageUtils'
], function($, modal, alert, utils){
    'use strict';

    $.widget("awrma.awRmaPolicyLink", {
        component: 'awRmaPolicyLink', // Breeze fix: added component name
        options: {
            popupSelector: '#aw-rma-policy-popup',
        },

        /**
         * Initialize widget
         */
        _create: function() {
            var options = {
                'type': 'popup',
                'modalClass': '',
                'responsive': true,
                'innerScroll': true,
                'buttons': []
            };

            this._bind();
            modal(options, $(this.options.popupSelector));
        },

        /**
         * Event binding
         */
        _bind: function() {
            this._on({
                'click': '_onClick'
            });
            $(document).on('click', $.proxy(this._onClickDocument, this));
        },

        /**
         * Click event handler
         *
         * @param {Object} event
         */
        _onClick: function (event) {
            event.preventDefault();
            $(this.options.popupSelector).modal('openModal');
        },

        /**
         * Click on document
         */
        _onClickDocument: function(e) {
            var popupContent = $(this.options.popupSelector),
                popupData = popupContent.data('mageModal');

            if (!_.isEmpty(popupData) && popupData.options.isOpen // Breeze fix: changed to `isEmpty` from underscore
                && !popupContent.is(e.target) && popupContent.has(e.target).length === 0
                && $(e.target).data('role') !== this.element.data('role')
            ) {
                popupContent.modal('closeModal');
            }
        }
    });

    return $.awrma.awRmaPolicyLink;
});