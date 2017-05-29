function Player(){
  this.name;
  this.hand;         // cards on hand
  this.purseSize = 300;    //
  this.inGameStatus;

  this.playerToTheLeft;
  this.playerToTheRight;

  this.currentGameBetAmount;

}

Player.prototype.draw = function(){
  this.hand.concat(deck.pop());
}
Player.prototype.collectWinnings = function(){}
Player.prototype.surrenderLoss = function(){}
Player.prototype.placeBetAmt = function(betAmt){
  if (betAmt <= this.purseSize) {
    this.currentGameBetAmount = betAmt;
  }
  else {
    console.log('not enough $$ for bet.');
  }
}
