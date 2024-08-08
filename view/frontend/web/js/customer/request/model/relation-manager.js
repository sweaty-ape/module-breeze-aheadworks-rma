define([
    'jquery',
    'underscore'
], function ($,_) {
    'use strict';

    return {
        component: 'Aheadworks_Rma/js/customer/request/model/relation-manager', // Breeze fix: added component name
        fieldWrapperSelector: '',

        /**
         * Initialize
         */
        init: function (config) {
            this.fieldWrapperSelector = config.fieldWrapperSelector;
            this.setEventHandlers(config);
        },

        /**
         * Set events
         */
        setEventHandlers: function (options) {
            var self = this,
                mainElement;

            _.each(options.relationsData, function (relatedData, customFieldId) {
                _.each(options.fieldInputSelectorPatterns, function (pattern) {
                    mainElement = self._getCustomField(pattern, customFieldId);
                    if (mainElement.length) {
                        $(mainElement).change(self.onChange.bind(self, customFieldId, relatedData, pattern));
                        $(mainElement).change();
                    }
                });
            });
        },

        /**
         * On change handler
         *
         * @param {int} customFieldId
         * @param {Object} relatedData
         * @param {String} pattern
         * @param {jQuery.Event} event
         * @return {Object}
         */
        onChange: function (customFieldId, relatedData, pattern, event) {
            var value = parseInt($(event.currentTarget).val()),
                self = this;

            if (relatedData[value]) {
                this._toggleFieldsVisibility(relatedData[value], pattern, true);
            }
            _.each(relatedData, function (dependentCustomFieldIds, optionValue) {
                if (parseInt(optionValue) !== value) {
                    self._toggleFieldsVisibility(dependentCustomFieldIds, pattern, false);
                }
            });

            return this;
        },

        /**
         * Hide fields
         *
         * @param {Object} dependentCustomFieldIds
         * @param {String} pattern
         * @param {Boolean} toShow
         * @private
         */
        _toggleFieldsVisibility: function (dependentCustomFieldIds, pattern, toShow) {
            var self = this;

            _.each(dependentCustomFieldIds, function (dependentCustomFieldId) {
                toShow ? self._show(dependentCustomFieldId, pattern) : self._hide(dependentCustomFieldId, pattern);
            });
        },

        /**
         * Hide element
         *
         * @param {int} dependentCustomFieldId
         * @param {String} pattern
         * @private
         */
        _hide: function(dependentCustomFieldId, pattern) {
            var elem = this._getCustomField(pattern, dependentCustomFieldId);

            if (elem.length) {
                $(elem).closest(this.fieldWrapperSelector).hide();
                $(elem).prop('disabled', true);
            }
        },

        /**
         * Show element
         *
         * @param {int} dependentCustomFieldId
         * @param {String} pattern
         * @private
         */
        _show: function(dependentCustomFieldId, pattern) {
            var elem = this._getCustomField(pattern, dependentCustomFieldId);

            if (elem.length) {
                $(elem).closest(this.fieldWrapperSelector).show();
                $(elem).prop('disabled', false);
            }
        },

        /**
         * Retrieve custom field by id
         *
         * @param {String} pattern
         * @param {int} id
         * @return {Object}
         * @private
         */
        _getCustomField: function (pattern, id) {
            return $(pattern.replace('{custom_field_id}', id));
        }
    }

});
