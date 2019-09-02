(function () {
    'use strict';

    angular
        .module('app')
        .controller('questionController', Controller);

    function Controller($window, UserService, FlashService) {
        var vm = this;

        vm.title = 'Question Page';

        vm.questions = [
            { key : 1, value : 'Matheus'},
            { key : 2, value : 'Leite'},
            { key : 3, value : 'Maria'},
            { key : 4, value : 'Higao'},
            { key : 5, value : 'Gile'},

        ]

        function createQuestion (question) {
            console.log('Question:',question)
        }
    }

})();