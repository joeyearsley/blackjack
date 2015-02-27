'use strict';

/**
 * @ngdoc function
 * @name blackjackApp.controller:PlayCtrl
 * @description
 * # PlayCtrl
 * Controller of the actual game play for the blackjackApp
 */
angular.module('blackjackApp').controller('PlayCtrl',['$scope','Dealer','$routeParams',playController]);

/**
 * Start the dealer class/service with the number of players you wish for, capped at 8.
 * Set some start functions so that
 * @param $scope
 * @param Dealer
 * @param $routeParams
 */
  function playController($scope,Dealer,$routeParams) {
    if($routeParams.playerNum > 8)
      {$scope.playerNum = 8;}
    else{$scope.playerNum = $routeParams.playerNum;}
    var dealer  = new Dealer($scope.playerNum);
    $scope.dealer = dealer;
    $scope.newHand = function(){$scope.dealer.newHand('')};
    $scope.resetGame = function(){$scope.dealer.newHand('r')};

  };




