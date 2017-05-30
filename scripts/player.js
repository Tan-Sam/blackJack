function Player(){
  this.name;
  this.hand = [];         // cards on hand
  this.purseSize = 300;    //
  this.inGameStatus;
  this.playerToTheLeft = null;
  this.playerToTheRight = null;
  this.currentGameBetAmount;
  this.isMyTurn = false;
}

Player.prototype.draw = function(){
  this.hand = this.hand.concat(deck.pop());

  // check for jackpots (e.g blackJack, etc..)
  var cardCounts = this.hand.length
  if (cardCounts == 2) {

  }
  else if (cardCounts === 3) { // triple 7 check

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
