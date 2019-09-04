(function () {
    'use strict';

    angular
        .module('app')
        .factory('QuestionService', Service);

    function Service($http, $q) {
        var service = {};
        
        service.GetAll = GetAll;        
        service.Create = Create;        

        return service;

        function GetAll() {
            return $http.get('/api/question').then(handleSuccess, handleError);
        }        

        function Create(question) {
            return $http.post('/api/question', question).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
