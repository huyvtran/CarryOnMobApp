(function () {
    'use strict';

    angular
        .module('starter')
        .filter('DateToAsap', DateToAsap)
        .filter('BooleanStrToYN', BooleanStrToYN);


    /* Converts Document status enum to label */
    DateToAsap.$inject = [];
    function DateToAsap() {
        return function (input) {
            if (input) {
                return input.toLocaleDateString('it-IT');
            } else {
                return 'Prima Possibile';
            };
        };
    };

    BooleanStrToYN.$inject = []; 
    function BooleanStrToYN() {
        return function (input) {
            return (input === true || input === 'true') ? 'Si\'' : 'No';
        };
    };



})();