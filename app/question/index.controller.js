(function () {
    'use strict';

    angular
        .module('app')
        .controller('questionController', Controller);

    function Controller($window, UserService, FlashService) {
        var vm = this;

        vm.question = '';
        vm.createQuestion = createQuestion

        vm.title = 'Question Page';

        vm.questions = []

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }

        function createQuestion () {
            if(vm.question != null || vm.question != '') {               
                vm.questions.push( { key: vm.questions.length ,value: vm.question } )
                vm.question = null
                //TODO MONGO INTEGRATION
            }
        }
    }

})();