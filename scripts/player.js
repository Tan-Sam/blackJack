function Player() {
  this.hand = new Hand(this);
  this.nextPlayer = null;
  this.isMyTurn = false;
  this.isHitBlackJack = false;

  //   also can be known as turn completed
  this.isTurnCompleted = false;

  this.cardPointsOverLimit = false;

  this.name;
  // this.purseSize = 300;

  this.currentGameBetAmount;
}

Player.prototype.activateTurn = function() {
  this.isTurnCompleted = false;
  this.isMyTurn = true;
  var msg = this.name + '\'s turn';

  var playerIndex = playersArray.indexOf(this);

  if (playerIndex === 0) {
    document.querySelector('.playerSpan').classList.toggle('activePlayer');
  }
  else {
    document.querySelector('.bankerSpan').classList.toggle('activePlayer');
  }

  defaultAlertCaller(msg);
}

Player.prototype.setTurnCompleted = function() {
  this.isTurnCompleted = true;
  this.isMyTurn = false;

  var playerIndex = playersArray.indexOf(this);
  
  if (playerIndex === 0) {
    document.querySelector('.playerSpan').classList.toggle('activePlayer');
  }
  else {
    document.querySelector('.bankerSpan').classList.toggle('activePlayer');
  }

  console.log(this.name + '\'s turn completed.');
  if (this.nextPlayer !== null) {
    this.nextPlayer.activateTurn();
  } else {
    console.log('No other players. Conclude game.');
    alert('No other players. Conclude game.');
  }
}

Player.prototype.drawCard = function() {
  return this.hand.drawCard();
}

Player.prototype.collectWinnings = function() {
  this.purseSize += this.currentGameBetAmount;
}

Player.prototype.surrenderLoss = function() {
  this.purseSize -= thi.currentGameBetAmount;
}

Player.prototype.placeBetAmt = function(betAmt) {
  if (betAmt <= this.purseSize) {
    this.currentGameBetAmount = betAmt;
  } else {
    console.log('not enough $$ for bet.');
  }
}
