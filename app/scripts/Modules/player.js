/**
 * Created by josephyearsley on 24/02/15.
 * Class for the player, providing player specific methods.
 */

angular.module('playerModule',['handModule']).service('Player',['Hand', function (Hand){

    /**
     * Constructor
     * @param userName - of player
     * @param pid - instead of having to used $index
     * @param money - to keep track of betting
     * @param cardOne - initial card
     * @param cardTwo - initial card
     * @constructor
     */
  function Player(userName, pid, money, cardOne, cardTwo) {
    // Public properties, assigned to the instance ('this')
    this.userName = userName;
    this.pid = pid;
    this.money = money;
    this.newHand(cardOne,cardTwo);
    //initially playing the first hand
    this._playingHand = 0;
  }

    /**
     * Create a new Hand
     * @param cardOne - initial card
     * @param cardTwo - initial card
     */
    Player.prototype.newHand = function(cardOne, cardTwo){
      if(this.money > 0) {
        this.hands = [];
        this.hand = new Hand();
        this.hand.split = true;
        this.hand.add(cardOne);
        this.hand.add(cardTwo);
        this.hands.push(this.hand);
      }
    };

    /**
     * Split a hand into 2 new hands.
     * @param n - which hand to split
     * @param newCard1 - additional card for each new hand
     * @param newCard2 - additional card for each new hand
     */
    Player.prototype.split = function(n,newCard1, newCard2){
      //can only split if can afford both potentially losing
      if(this.money >10){
        var handOne = new Hand();
        handOne.add(this.hands[n].hand.pop());
        handOne.add(newCard1);
        var handTwo = new Hand();
        handTwo.add(this.hands[n].hand.pop());
        handTwo.add(newCard2);
        //can only split once so just over write the array
        this.hands= [];
        this.hands.push(handOne, handTwo);
      }
    };

    /**
     * Hit function
     * @param cardX - New card been given
     * @param handLoc - location of hand to add it to, could use playinghand?
     */
    Player.prototype.hit = function(cardX,handLoc){
      this.hands[handLoc].add(cardX);
    };

    /**
     *
     * @returns {*} hand currently being played
     */
    Player.prototype.playingHand = function(){
        return this._playingHand;
    }

    /**
     * Increment the hand index
     */
    Player.prototype.nextHand = function(){
      this._playingHand++;
    };

    /**
     *
     * @param n - what to set it to.
     */
    Player.prototype.setPlayingHand = function(n){
      this._playingHand = n;
    };

    /**
     *
     * @param handNum - hand number of which to get total of
     * @returns {number|Hand.total|*} total of that hand
     */
    Player.prototype.getTotal = function(handNum){
      return this.hands[handNum].total;
    };

    /**
     * Is that hand bust?
     * @param handNum - the number of which hand to check
     * @returns {boolean|*|Hand.Hand.bust|Hand.bust} if it is or not
     */
    Player.prototype.getBust = function(handNum){
      return this.hands[handNum].bust;
    };

    /**
     *
     * @param handNum - set this hand to bust
     */
    Player.prototype.setBust = function(handNum){
      this.hands[handNum].bust = true;
    };

    /**
     * Are the cards the same, so can we split
     * @param n - hand to check if same
     * @returns {*|boolean} - are the cards the same
     */
    Player.prototype.same = function(n) {
      return this.hands[n].same();
    };


  /**
   * Return player class
   */
  return Player;
}]

);
