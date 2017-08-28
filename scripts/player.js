function Player(playerJsonObject) {
  this.hand = new Hand();
  this.nextPlayer = null;
  this.isMyTurn = false;
  this.hasTurnCompleted = false;
  this.cardPointsOverLimit = false;

  this.name = playerJsonObject.name;
  this.purseSize = playerJsonObject.purseSize;
  this.currentGameBetAmount;

  this.displayDiv = null;
}

Player.prototype.blackJack = ()=>this.hand.checkBlackJack;


Player.prototype.getCardsOnHandValue = function(){
  return this.hand.getCardsOnHandValue();
}

Player.prototype.activateTurn = function() {
  this.isMyTurn = true;
  this.displayDiv.classList.toggle('active');
}

Player.prototype.setTurnCompleted = function() {
  this.hasTurnCompleted = true;
  this.isMyTurn = false;
  this.displayDiv.classList.toggle('active');
}

Player.prototype.drawCard = function() {
  if (this.isMyTurn ||
      this.hand.cards.length < 2) {
    return this.hand.drawCard();
  }
  return false;
}


//  how to record between banker tx & player tx's
Player.prototype.collectWinnings = function() {
  this.purseSize += this.currentGameBetAmount;
}

Player.prototype.surrenderLoss = function() {
  this.purseSize -= this.currentGameBetAmount;
}

Player.prototype.placeBetAmt = function(betAmt) {
  if (betAmt <= this.purseSize) {
    this.currentGameBetAmount = betAmt;
  } else {
    console.log('not enough $$ for bet.');
  }
}
