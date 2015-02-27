'use strict';

/**
 * @ngdoc function
 * @name blackjackApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the blackjackApp
 */
angular.module('blackjackApp')
  .controller('MainCtrl', function ($scope,$location) {
    //simple submit go to actual game section
    $scope.submit = function(){
      $location.path('/play/' + $scope.text);
    }
  });
