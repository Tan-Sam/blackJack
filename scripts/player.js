function Player(){
  this.name;
  this.hand = [];         // cards on hand
  this.purseSize = 300;    //
  this.inGameStatus;
  this.playerToTheLeft = null;
  this.playerToTheRight = null;
  this.currentGameBetAmount;
  this.isMyTurn = false;
  this.hitBlackjack = false;
}

Player.prototype.draw = function(){
  this.hand = this.hand.concat(deck.pop());

  // check for jackpots (e.g blackJack, etc..)
  var cardCounts = this.hand.length
  if (cardCounts == 2) {

    var aceCardFound = this.hand.find(function(elem){return elem.isAce();});

    if (aceCardFound) {
      var faceCardFound = this.hand.find(function(elem){return elem.isFaceCard();})  ;
      if (faceCardFound) {
        this.hitBlackjack = true;
      }
    }
  }
  else if (cardCounts === 3) { // triple 7 check
    if (this.hand[0].getNumericalValue() === 7 &&
        this.hand[1].getNumericalValue() === 7 &&
        this.hand[2].getNumericalValue() === 7) {
          this.hitBlackjack = true; //  might need to change to superJackpot or soemthing.
    }
  }
  else if (cardCounts == 5) {
    //   add up to see if more than 21
  }

  // check for gameFail
  if (cardCounts >= 3) {
    var totalValue = 0;
    for (var i = 0; i < this.hand.length; i++) {
      var cardValue = this.hand[i].getNumericalValue();

      if (Array.isArray(cardValue)) {

      }
      else {
        totalValue += cardValue;
      }
    }

    if (totalValue > 21) {

    }
  }
}

Player.prototype.collectWinnings = function(){
  this.purseSize += this.currentGameBetAmount;
}

Player.prototype.surrenderLoss = function(){
  this.purseSize -= thi.currentGameBetAmount;
}

Player.prototype.placeBetAmt = function(betAmt){
  if (betAmt <= this.purseSize) {
    this.currentGameBetAmount = betAmt;
  }
  else {
    console.log('not enough $$ for bet.');
  }
}
