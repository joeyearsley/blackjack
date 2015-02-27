/**
 * Dealer module so controller has to talk to dealer to link everything up, keeps scope to a minimum.
 * Takes the deck module and player module to make the table.
 */

angular.module('dealerModule',['deckModule','playerModule']).service('Dealer',['Deck','Player', function (Deck,Player){

    /**
     * Constructor with initial values
     */
    function Dealer(numPlayers) {
      this.Players = new Array();
      this._deck = new Deck();
      this._deck.shuffle();
      //Who's playing now
      this._playing = 0;
      //to tell when finished
      this.gameOver = false;
      //index for keeping track of where we are in the deck.
      this._index = 0;
      this.finished = false;
      this.giveCards(numPlayers);
    }

    /**
     * To set up new number of players with cards
     * @param numPlayers - how many players to give cards too.
     */
    Dealer.prototype.giveCards = function(numPlayers){
      var card1,card2;
      for(var i = 0; i < numPlayers; i++){
        card1 = this.getCard();
        card2 = this.getCard();
        this.Players.push(new Player('P'+i, i, 50, card1, card2));
      }
      card1 = this.getCard();
      card2 = this.getCard();
      //Dealer is also a player
      this.Players.push(new Player('dealer', 'd', numPlayers*50, card1, card2));
    };

    /**
     * Calls the player split function
     * p - player we are interested in
     * h - hand we are interested in
     */
    Dealer.prototype.split = function(){
      var p = this._playing;
      var h = this.Players[p]._playingHand;
      this.Players[p].split(h, this.getCard(), this.getCard());
    };

    /**
     * Get a new card from the deck
     * @returns {*} - new card from deck
     */
    Dealer.prototype.getCard = function(){
       var x = this._deck.DECK[this._index++];
       return x;
    };

    /**
     * Shuffle the deck
     */
    Dealer.prototype.shuffle = function(){
      this._deck.shuffle();
    };


    /**
     * Hit function to place another card in the hand of player and see if they are bust yet.
     * loc - index for currently playing player
     * handLoc - players index for which hand they are currently playing
     */
    Dealer.prototype.hit = function(){
      var loc = this._playing;
      var handLoc = this.Players[loc]._playingHand;
      this.Players[loc].hit(this.getCard(),handLoc);
      if(this.Players[loc].getTotal(handLoc)>21){
        this.Players[loc].setBust(handLoc);
        if(this.Players[loc].pid != 'd') this.nextHand(loc);
      }
    };


    /**
     * Move the playing onto the next hand, also in use for stick.
     *
     */
    Dealer.prototype.nextHand = function(){
      var loc = this._playing;
      //Update the players track of which hand they are playing
      this.Players[loc].nextHand();
      //see if no more hands, if so move to next player
      if(this.Players[loc].hands[this.Players[loc].playingHand()] === undefined){
        this.next();
      }
    };

    /**
     * Function to move along the play to the next player, by rendering the buttons.
     * Also implements simple dealer strategy for its turn.
     * Dealer always has only one hand hence the 0.
     */
    Dealer.prototype.next = function(){
      //To keep track of which player is playing now
      this._playing++;
      var p = this._playing;
      if(this.Players[p].pid == 'd'){
        while(!this.Players[p].getBust(0)){
          if(this.Players[p].getTotal(0) < 17) {
            //dealer only has one hand
            this.hit(p,0)
          }else{
            break;
          }
        }
        this.evaluateGame();
      }
    };

    /**
     * End Game evaluation, go through all players and hands comparing wins + losses.
     * Alters money as it goes along, all players have that money or they wouldn't of been able
     * to play the hands.
     */
    Dealer.prototype.evaluateGame = function() {
      var p = this.Players[this.Players.length-1];
      var playerNum = this.Players.length-1;
      angular.forEach(this.Players, function (value, key) {
        angular.forEach(value.hands, function (v2, k) {
          //Don't count the dealer
          if(value.pid != 'd'){
            //both bust or equal in total
            if(v2.bust && p.getBust(0) || p.getTotal(0) == v2.total) {
              //Do Nothing
            }//total is larger & not bust or one is bust
            else if(v2.bust || v2.total < p.getTotal(0) && !p.getBust(0)){
              value.money -= 5;
              p.money += 5;
            }
            //total is larger & not bust or one is bust
            else if(p.getBust(0)|| v2.total > p.getTotal(0) && !v2.bust) {
              value.money += 5;
              p.money -= 5;
            }
          }
        });
        if (value.money <= 0){
          //see how many players are out of game
            playerNum--;
        }
      });
      //All players or dealer are bust.
      if(playerNum == 0 || p.money == 0 ){this.gameOver = true;}
      //to show new hand button
      this.finished = true;
    };

    /**
     * To either reset the hand for the next round or reset then entire game.
     * @param type - As taking a parameter is cheaper than an extra for loop
     */
    Dealer.prototype.newHand = function(type){
      this.finished = false;
      this.gameOver = false;
      this.shuffle();
      this._index = 0;
      this._playing = 0;
      //so the forEach knows what to call
      var self = this;
      //New Hand Settings
      angular.forEach(this.Players, function (value) {
        //otherwise they are out of the game
        if(value.money>0){
          //reset number of hands
          value.setPlayingHand(0);
          //reset splits
          value.newHand(self.getCard(), self.getCard());
        }
        //reset
        if(type == 'r') value.money = 50;
      });
      //reset
      if(type == 'r') this.Players[this.Players.length-1].money = (this.Players.length-1) *50;

    };



    /**
     * Return the class, In Angular V2 this could just be of type class, instead of lots of prototypes.
     */
    return Dealer;
  }]

);
