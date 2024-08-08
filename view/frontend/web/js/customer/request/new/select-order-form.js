define([
    'jquery',
    'underscore'
], function($, _) {
    'use strict';

    $.widget("awrma.awRmaSelectItemForm", {
        component: 'awRmaSelectOrderForm', // Breeze fix: added component name
        options: {
            currentOrderId: '',
            nextAction: '[data-role=next-action]',
            orderSelector: 'input[name=order_id]'
        },

        /**
         * Initialize widget
         */
        _create: function() {
            this._bind();
            this._setCurrentValues();
        },

        /**
         * Event binding
         */
        _bind: function() {
            var handlers = {};

            handlers['click .order-row'] = '_onOrderSelect';
            this._on(handlers);
        },

        /**
         * Order action click event handler
         *
         * @param {Object} event
         */
        _onOrderSelect: function(event) {
            this.rowToggle(event.currentTarget);
        },

        /**
         * Row toggle
         *
         * @param {Object|String} rowSelector
         * @param {Boolean} selectRow
         */
        rowToggle: function (rowSelector, selectRow) {
            var orderInput = $(rowSelector).find(this.options.orderSelector),
                orderId = orderInput.val();

            selectRow = _.isUndefined(selectRow) ? !$(rowSelector).hasClass('selected') : selectRow;
            if (selectRow) {
                this.selectOrderItems(orderId);
                this._scrollTo(rowSelector);
            } else {
                this.resetRowSelected();
            }
            orderInput.prop('checked', true);
            this._updateActionRowVisibility(rowSelector);
        },

        /**
         * Update order item rows
         *
         * @param {Number} orderId
         */
        selectOrderItems: function (orderId) {
            var itemRows = $(this.element).find('.order-item-row'),
                selectedItemRows = itemRows.filter('[data-order-id="' + orderId + '"]'), // Cash fix: added quotes around attribute value
                orderRows = $(this.element).find('.order-row');

            this.resetRowSelected();
            orderRows.filter('[data-order-id="' + orderId + '"]').addClass('selected'); // Cash fix: added quotes around attribute value
            selectedItemRows.show();
        },

        /**
         * Reset selected order
         */
        resetRowSelected: function() {
            var itemRows = $(this.element).find('.order-item-row'),
                orderRows = $(this.element).find('.order-row');

            itemRows.hide();
            orderRows.removeClass('selected')
        },

        /**
         * Update action row visibility
         *
         * @param {Object|String} rowSelector
         */
        _updateActionRowVisibility: function(rowSelector) {
            var nextActions = $(this.element).find(this.options.nextAction),
                selectedRowAction = $(rowSelector).find(this.options.nextAction);

            nextActions.hide().attr('disabled', 'disabled');
            selectedRowAction.show().removeAttr('disabled');
        },

        /**
         * Set current values
         */
        _setCurrentValues: function() {
            this.setCurrentOrderId();
        },

        /**
         * Set current order id
         */
        setCurrentOrderId: function () {
            if (this.options.currentOrderId) {
                this.rowToggle('.order-row[data-order-id="' + this.options.currentOrderId + '"]', false); // Cash fix: added quotes around attribute value
            }
        },

        /**
         * Scroll to element
         *
         * @param {Object|String} selector
         */
        _scrollTo: function(selector) {
            // Breeze fix: no animations supported
            // $('html, body').animate({
            //     scrollTop: $(selector).offset().top
            // }, 200);
        }
    });

    return $.awrma.awRmaSelectItemForm;
});
