define([
    'jquery',
    'underscore',
    'Aheadworks_Rma/js/customer/request/model/relation-manager'
], function($, _, relationManager) {

    $.widget('aw.awRmaRelationManager', {
        component: 'awRmaRelationManager', // Breeze fix: added component name
        options: {
            relationsData: [],
            fieldInputSelectorPatterns: ['[name="custom_fields[{custom_field_id}]"'],
            fieldWrapperSelector: '.field.aw-rma__field'
        },

        /**
         * Initialize widget
         */
        _create: function() {
            $(document).ready(this._bind.bind(this));
        },

        /**
         * Event binding
         */
        _bind: function() {
            relationManager.init(this.options);
        },
    });

    return $.aw.awRmaRelationManager;
});
