define([
    'jquery',
], function($) {
    $.widget('awrma.awRmaButtonControl', {
        component: 'awRmaButtonControl', // Breeze fix: added component name
        options: {
            newLocation: '',
            submitForm: {
                formSelector: '',
                actionSelector: '',
                action: ''
            },
            confirm: {
                enabled: false,
                message: ''
            }
        },

        /**
         * Initialize widget
         */
        _create: function() {
            this._bind();
        },

        /**
         * Event binding
         */
        _bind: function() {
            this._on({
                'click': '_onButtonClick'
            });
        },

        /**
         * Click event handler
         *
         * @param {Object} event
         */
        _onButtonClick: function(event) {
            var self = this;

            event.stopPropagation();
            if (this.options.confirm.enabled) {
                if (this._isValidForm()) {
                    $.confirm({ // Breeze fix: changed to Breeze confirm UI component
                        modalClass: 'confirm aw-rma__confirm',
                        content: this.options.confirm.message,
                        actions: {
                            confirm: function () {
                                self._action();
                            }
                        },
                        buttons: [
                            {
                                text: $t('No'), // Breeze fix: changed translate
                                class: 'action-secondary action-dismiss',
                                click: function (event) {
                                    this.closeModal(event);
                                }
                            },
                            {
                                text: $t('Yes'), // Breeze fix: changed translate
                                class: 'action-primary action-accept',
                                click: function (event) {
                                    this.closeModal(event, true);
                                }
                            }
                        ]
                    });
                }
            } else {
                this._action();
            }
        },

        /**
         * Button action
         */
        _action: function()
        {
            if (!_.isEmpty(this.options.submitForm.formSelector)) {
                this._submitForm();
            } else {
                this._redirectToUrl();
            }
        },

        /**
         * Submit form
         */
        _submitForm: function () {
            if (!_.isEmpty(this.options.submitForm.action)) {
                $(this.options.submitForm.actionSelector).val(this.options.submitForm.action);
            }

            if (this._isValidForm()) {
                $(this.options.submitForm.formSelector).submit();
            }
        },

        /**
         * Check if form valid
         *
         * @return {Boolean}
         */
        _isValidForm: function()
        {
            if (_.isEmpty(this.options.submitForm.formSelector)) {
                return true;
            }

            // var event = $.Event('additional.validation'),
            //     isValid;

            // // Valida UI component from form
            // $(this.options.submitForm.formSelector).trigger(event);
            // isValid = $(this.options.submitForm.formSelector).valid();

            // return event.isDefaultPrevented() == false && isValid;

            // Breeze fix: jQuery Event is no longer available
            var event = new Event('additional.validation'),
                isValid;

            $(this.options.submitForm.formSelector).trigger(event);
            isValid = $(this.options.submitForm.formSelector).valid();

            return event.defaultPrevented == false && isValid;
        },

        /**
         * Redirect to url
         */
        _redirectToUrl: function () {
            window.location = this.options.newLocation;
        }
    });

    return $.awrma.awRmaButtonControl;
});
