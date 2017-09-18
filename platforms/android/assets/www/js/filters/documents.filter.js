(function () {
    'use strict';

    angular
        .module('app.documents')
        .filter('DocumentsStatusEnum', DocumentsStatusEnum)
		.filter('UnderCheckStatusEnumIcon', UnderCheckStatusEnumIcon)
        .filter('UnderCheckStatusEnumIconClass', UnderCheckStatusEnumIconClass)
        .filter('UnderCheckStatusEnumTranslate', UnderCheckStatusEnumTranslate)
		.filter('UcAmendCausalEnumTranslate', UcAmendCausalEnumTranslate)
        .filter('UcAmendActionEnumTranslate', UcAmendActionEnumTranslate)
        .filter('UnitOfMeasureEnumTranslate', UnitOfMeasureEnumTranslate)
        .filter('LogisticCheckStateEnumTranslate', LogisticCheckStateEnumTranslate)
        .filter('MinusOneForMultipleAmendment', MinusOneForMultipleAmendment)
        .filter('MinusIfEmpty', MinusIfEmpty)
        .filter('DocumentTypeEnum', DocumentTypeEnum)
        .filter('DocumentStatusEnumIcon', DocumentStatusEnumIcon)
        .filter('DocumentStatusEnumIconClass', DocumentStatusEnumIconClass)
        .filter('BooleanToYN', BooleanToYN)
        .filter('UndefinedToEmpty', UndefinedToEmpty);


    /* Converts Document status enum to label */
    DocumentsStatusEnum.$inject = ['$translate'];
    function DocumentsStatusEnum($translate) {
        return function (input) {
            var retValue = porGlobal.DocStatusEnum.properties[input] ? porGlobal.DocStatusEnum.properties[input].value : '';
            return retValue;
        };
    };

    /* Converts Document type enum to label */
    DocumentTypeEnum.$inject = ['$translate'];
    function DocumentTypeEnum($translate) {
        return function (input) {
            var retValue = porGlobal.DocumentTypeEnum.properties[input] ? porGlobal.DocumentTypeEnum.properties[input].value : '';
            return retValue;
        };
    };

    /* Converts Under Check status enum to icon */
    UnderCheckStatusEnumIcon.$inject = [];
    function UnderCheckStatusEnumIcon() {
        return function (input) {
            if (porGlobal.DocStatusEnum.properties[input]) {
                var retValue = porGlobal.UnderCheckEnum.properties[input] ? porGlobal.UnderCheckEnum.properties[input].icon : porGlobal.UnderCheckEnum.properties[porGlobal.UnderCheckEnum.RELEASED].icon;
                return retValue;
            }
        };
    };

    /* Converts Under Check status enum to icon class */
    UnderCheckStatusEnumIconClass.$inject = [];
    function UnderCheckStatusEnumIconClass() {
        return function (input) {
            if (porGlobal.DocStatusEnum.properties[input]) {
                var retValue = porGlobal.UnderCheckEnum.properties[input] ? porGlobal.UnderCheckEnum.properties[input].iconClass : porGlobal.UnderCheckEnum.properties[porGlobal.UnderCheckEnum.RELEASED].iconClass;
                return retValue;
            }
        };
    };

    /* Converts Document status enum to icon */
    DocumentStatusEnumIcon.$inject = [];
    function DocumentStatusEnumIcon() {
        return function (input) {
            if (porGlobal.DocStatusEnum.properties[input]) {
                var retValue = porGlobal.DocStatusEnum.properties[input] ? porGlobal.DocStatusEnum.properties[input].icon : porGlobal.DocStatusEnum.properties[porGlobal.DocStatusEnum.TO_BE_CHECKED].icon;
                return retValue;
            }
        };
    };

    /* Converts Document status enum to icon class */
    DocumentStatusEnumIconClass.$inject = [];
    function DocumentStatusEnumIconClass() {
        return function (input) {
            if (porGlobal.DocStatusEnum.properties[input]) {
                var retValue = porGlobal.DocStatusEnum.properties[input] ? porGlobal.DocStatusEnum.properties[input].iconClass : porGlobal.DocStatusEnum.properties[porGlobal.DocStatusEnum.TO_BE_CHECKED].iconClass;
                return retValue;
            }
        };
    };



    /* Converts Under Check status enum to icon class */
    UnderCheckStatusEnumTranslate.$inject = ['$translate'];
    function UnderCheckStatusEnumTranslate($translate) {
        return function (input) {
            var retValue = porGlobal.UnderCheckEnum.properties[input] ? porGlobal.UnderCheckEnum.properties[input].value : porGlobal.UnderCheckEnum.properties[porGlobal.UnderCheckEnum.RELEASED].value;
            return retValue;
        };
    };

    /* Converts Under Check Amend Causal enum to icon class */
    UcAmendCausalEnumTranslate.$inject = ['$translate'];
    function UcAmendCausalEnumTranslate($translate) {
        return function (input) {
            var retValue = porGlobal.UcAmendCausalEnum.properties[input] ? porGlobal.UcAmendCausalEnum.properties[input].value : '-';
            return retValue;
        };
    };

    /* Converts Under Check Amend Action enum to icon class */
    UcAmendActionEnumTranslate.$inject = ['$translate'];
    function UcAmendActionEnumTranslate($translate) {
        return function (input) {
            var retValue = porGlobal.UcAmendActionEnum.properties[input] ? porGlobal.UcAmendActionEnum.properties[input].value : '-';
            return retValue;
        };
    };

    /* Converts Under Check Unit Of Measure enum to icon class */
    UnitOfMeasureEnumTranslate.$inject = ['$translate'];
    function UnitOfMeasureEnumTranslate($translate) {
        return function (input) {
            var retValue = porGlobal.UnitOfMeasureEnum.properties[input] ? porGlobal.UnitOfMeasureEnum.properties[input].value : '-';
            return retValue;
        };
    };

    /* Converts Logistic Check State enum */
    LogisticCheckStateEnumTranslate.$inject = ['$translate'];
    function LogisticCheckStateEnumTranslate($translate) {
        return function (input) {
            var retValue = porGlobal.LogisticCheckStateEnum.properties[input] ? porGlobal.LogisticCheckStateEnum.properties[input].value : '-';
            return retValue;
        };
    };

    /* Converts Under Check status enum to icon class */
    function MinusOneForMultipleAmendment() {
        return function (input) {
            return (!input || input <= 0) ? '-' : input;
            return retValue;
        };
    };

    /* Converts Under Check status enum to icon class */
    function MinusIfEmpty() {
        return function (input) {
            return (!input) ? '-' : input;
            return retValue;
        };
    };

    /* Converts true/false to Y/N */
    function BooleanToYN() {
        return function (input) {
            return (input === true) ? 'Y' : 'N';
        };
    };

    /* Converts Undefined to empty */
    function UndefinedToEmpty() {
        return function (input) {
            return (input) ? input : '';
        };
    };

    

})();