define([
    'jquery',
    "mage/template",
    'Aheadworks_Rma/js/customer/request/model/relation-manager'
], function($, mageTemplate, relationManager){
    'use strict';

    $.widget("awrma.awRmaOrderItemsMultipleField", {
        component: 'awRmaOrderItemsMultipleField', // Breeze fix: added component name
        options: {
            itemId: '',
            addRowSelector: '.aw-rma-add-row-',
            currentRow: 1,
            uuid: 0,
            relations: {
                relationsData: window.awRmaRelationsData,
                fieldInputSelectorPatterns: [],
                fieldWrapperSelector: '.field.aw-rma__field'
            }
        },

        /**
         * Initialize widget
         */
        _create: function() {
            this.initRelationManager(this.options.itemId);
            this._bind();
        },

        /**
         * Event binding
         */
        _bind: function() {
            $(this.options.addRowSelector + '' + this.options.itemId).on('click', $.proxy(this._addRowFields, this));
        },

        /**
         * Add Row with elements to list
         */
        _addRowFields: function () {
            this.options.currentRow++;
            this.options.uuid++;
            this.canAddNewRowFields();
            var template = mageTemplate('#some-template-' + this.options.itemId);
            var newRowField = template({
                data: {
                    uuid:  this.options.itemId + '_' + this.options.uuid
                },
                item_id: this.options.itemId + '_' + this.options.uuid
            });
            $(this.element).find('.field-wrapper').append(newRowField);
            $('.remove-button-' + this.options.itemId + '_' + this.options.uuid).on('click', $.proxy(this._removeRowFields, this));
            this.initRelationManager(this.options.itemId + '_' + this.options.uuid);
        },

        /**
         * Remove Row from list
         */
        _removeRowFields: function (e) {
            this.options.currentRow--;
            this.canAddNewRowFields();
            $(e.target).parent('.field-wrapper__item').remove();
        },

        /**
         * Validation show or hide 'add button'
         */
        canAddNewRowFields: function () {
          if (this.options.currentRow < this.options.maxItems) {
              this._show(this.options.addRowSelector + '' + this.options.itemId);
          } else {
              this._hide(this.options.addRowSelector + '' + this.options.itemId);
          }
        },

        /**
         * Hide element
         */
        _hide: function (element) {
            $(element).hide();
        },

        /**
         * Show Element
         */
        _show: function (element) {
            $(element).show();
        },

        /**
         * Initialize Item with relations
         */
        initRelationManager: function (itemId) {
            var relationsOptions = this.options.relations;
            relationsOptions.fieldInputSelectorPatterns.push('[name$="order_items['+itemId+'][custom_fields][{custom_field_id}]"');
            relationManager.init(relationsOptions);
        },
    });

    return $.awrma.awRmaOrderItemsMultipleField;
});