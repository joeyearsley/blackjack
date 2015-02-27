
/**
 * Created by josephyearsley on 24/02/15.
 *
 * A deck service for creating and shuffling decks using the Yates-Fisher shuffling algorithm.
 * Uses prototype to allow functions to be run on the object.
 *
 */

angular.module('deckModule',[]).factory('Deck', function () {


  /**
   * Constructor/Initiator, Builds up the DECK
   */
  function Deck() {
    this.DECK = new Array();
    for (var i = 1; i < 5; i++) {
      var suit;
      switch (i) {
        default:
          suit = 'Spades';
          break;
        case  1:
          suit = 'Hearts';
          break;
        case  2:
          suit = 'Clubs';
          break;
        case  3:
          suit = 'Diamonds';
          break;
      }
      for (var j = 1; j < 14; j++) {
        var card;
        var value;
        switch (j) {
          case 1:
            card = 'Ace';
            //start off high then auto lower in game for the player
            value = 11;
            break;
          case 2:
            card = '2';
            value = 2;
            break;
          case 3:
            card = '3';
            value = 3;
            break;
          case 4:
            card = '4';
            value = 4;
            break;
          case 5:
            card = '5';
            value = 5;
            break;
          case 6:
            card = '6';
            value = 6;
            break;
          case 7:
            card = '7';
            value = 7;
            break;
          case 8:
            card = '8';
            value = 8;
            break;
          case 9:
            card = '9';
            value = 9;
            break;
          case 10:
            card = '10';
            value = 10;
            break;
          case 11:
            card = 'Jack';
            value = 10;
            break;
          case 12:
            card = 'Queen';
            value = 10;
            break;
          case 13:
            card = 'King';
            value = 10;
            break;
        }
        //Push to our array for the deck
        this.DECK.push({'suit': suit, 'card': card, 'value': value});
      }
    }
  }


  /**
   * Uses the Fisher-Yates Shuffle to randomly in-line shuffle O(n)
   */
  Deck.prototype.shuffle = function () {
    var m = this.DECK.length, t, i;
    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = this.DECK[m];
      this.DECK[m] = this.DECK[i];
      this.DECK[i] = t;
    }

  };

  /**
   * Return Deck with its functions
   */
  return Deck;
});
