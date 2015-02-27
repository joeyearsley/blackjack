/**
 * Created by josephyearsley on 24/02/15.
 * Simple hand object to add cards to the hand.
 */

angular.module('handModule',[]).service('Hand', function () {

  /**
   *
   * @constructor To make the hand object with a running total, see if its bust or if we can split it.
   */
  function Hand(){
    this.hand = new Array();
    this.total = 0;
    this.bust = false;
    //to see if we can split, i.e. if its the first hand of the round
    this.split = false;
    //to keep track of aces
    this._ace = 0;
    //are the initial 2 cards the same
    this.same = false;
  }

  /**
   * Add to current hand
   * @param cardX - card you wish to add.
   */
  Hand.prototype.add = function(cardX){
    //keep track of aces
    if(cardX.value == 11) this._ace++;
    this.hand.push(cardX);
    this.total += cardX.value;
    this.sameCheck();
    this.aceEval();
    };

  /**
   * To see if hand has been split already, uses default of false, so that true can be set on initial initiation.
   * Only check first two cards as can only split on those.
   * @returns {boolean} - Can the split button be shown or not.
   */
  Hand.prototype.sameCheck = function(){
    if(this.hand[0] !== undefined && this.hand[1] !== undefined){
      if(this.hand[0].value === this.hand[1].value && this.split){
        this.same = true;
      }
    }
  };

  /**
   * Automatically choose ace value for the player, works out best for them.
   */
  Hand.prototype.aceEval= function(){
    while(this.total > 21 && this._ace > 0){
      this.total -= 10;
      this._ace--;
    }
  };

  /**
   * Return the Hand object
   */
  return Hand;
});

/*
Initial Filter used to get to aceEval function
 */
angular.module('handModule').filter("totalValue", function(){
  return function(total,aces){
     while(total > 21 && aces > 0){
        total = total - 10;
        aces--;
      }
    return total;
  }
});
