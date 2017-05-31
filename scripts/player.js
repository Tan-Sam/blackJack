function Player(){
  this.name;
  this.hand = [];         // cards on hand
  this.purseSize = 300;    //

  // this.inGameStatus;

  this.nextPlayer = null;

  // this.playerToTheLeft = null;
  // this.playerToTheRight = null;
  this.currentGameBetAmount;
  this.isMyTurn = false;
  this.isHitBlackJack = false;

  //   also can be known as turn completed
  this.isTurnCompleted = false;

  this.cardPointsOverLimit = false;
}

Player.prototype.activateTurn = function(){
  this.isTurnCompleted = false;
  this.isMyTurn = true;

  console.log('Now is ' + this.name + '\'s turn');

}

Player.prototype.setTurnCompleted = function(){
  this.isTurnCompleted = true;
  this.isMyTurn = false;
  console.log(this.name + '\'s turn completed.');
  if (this.nextPlayer !== null) {
    this.nextPlayer.activateTurn();
  }
  else {
    console.log('No other players. Conclude game.');
  }
}

Player.prototype.drawCard = function(){
  this.hand = this.hand.concat(deck.pop());
  if (this.hand.length >= 2) {
      this.checkHand();
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
