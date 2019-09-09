(function () {
    'use strict';

    angular
        .module('app')
        .controller('Question.IndexController', Controller);

    function Controller($window,QuestionService) {
        var vm = this;

        vm.question = '';
        vm.createQuestion = createQuestion

        vm.title = 'Question Page';

        vm.questions = []

        initController();

        function initController() {
            
            QuestionService.GetAll().then(function (questions) {
                vm.questions = questions;
            });
            
        }

        function createQuestion () {

            if(vm.question != null || vm.question != '') {  
                var quest = { key: vm.questions.length ,value: vm.question }     
                vm.questions.push(quest)
                QuestionService.Create(quest)
                vm.question = null
            }
            
        }
        
    }    

})();