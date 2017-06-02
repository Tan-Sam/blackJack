function Player() {
  this.hand = new Hand(this);
  this.nextPlayer = null;
  this.isMyTurn = false;


  //   also can be known as turn completed
  this.isTurnCompleted = false;

  this.cardPointsOverLimit = false;

  this.name;
  // this.purseSize = 300;

  this.currentGameBetAmount;
}

// Player.prototype.isHitBlackJack = function(){
//   return this.hand.isHitBlackJack;
// }


Player.prototype.getCardsOnHandValue = function(){
  return this.hand.getCardsOnHandValue();
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

  this.cardPointsOverLimit = this.hand.getCardsOnHandValue() > 21;


  console.log(this.name + '\'s turn completed.');
  if (this.nextPlayer !== null) {
    this.nextPlayer.activateTurn();
  } else {
    console.log('No other players. Conclude game.');
    alert('No other players. Conclude game.');

    var player1 = playersArray[0];
    var player2 = playersArray[1];

    var player1gamePoints = player1.getCardsOnHandValue();
    var player2gamePoints = player2.getCardsOnHandValue();

    var player1_gameOut = player1.cardPointsOverLimit;
    var player2_gameOut = player2.cardPointsOverLimit;

    if (player1_gameOut &&
        player2_gameOut) {
      defaultAlertCaller('Game draw. All Players over points.\n\n' +
                          player2.name + '\s points: ' + player2.getCardsOnHandValue()+'\n'+
                          player1.name + '\s points: ' + player1.getCardsOnHandValue());

                          playersDraw = true;
    }
    else if (!player1_gameOut &&
             !player2_gameOut) {
      if (player1gamePoints > player2gamePoints) {
        defaultAlertCaller(player1.name + ' wins.\n\n' +
                            player2.name + '\s points: ' + player2.getCardsOnHandValue()+'\n'+
                            player1.name + '\s points: ' + player1.getCardsOnHandValue());

                            player1wins = true;
      }
      else if (player1gamePoints < player2gamePoints) {
        defaultAlertCaller(player2.name + ' wins.\n\n' +
                            player2.name + '\s points: ' + player2.getCardsOnHandValue()+'\n'+
                            player1.name + '\s points: ' + player1.getCardsOnHandValue());

                            player2wins = true;
      }
      else {
        defaultAlertCaller('Game draw. Players have same points.\n\n' +
                            player2.name + '\s points: ' + player2.getCardsOnHandValue()+'\n'+
                            player1.name + '\s points: ' + player1.getCardsOnHandValue());
      }
    }
    else if (!player1_gameOut && player2_gameOut) {
      defaultAlertCaller(player1.name + ' wins.\n' +
                         player2.name + ' over points.\n\n' +
                         player2.name + '\s points: ' + player2.getCardsOnHandValue()+'\n'+
                         player1.name + '\s points: ' + player1.getCardsOnHandValue());

                         player1wins = true;
    }
    else if (player1_gameOut && !player2_gameOut) {
      defaultAlertCaller(player2.name + ' wins.\n' +
                         player1.name + ' over points.\n\n' +
                         player2.name + '\s points: ' + player2.getCardsOnHandValue()+'\n'+
                         player1.name + '\s points: ' + player1.getCardsOnHandValue());

                         player2wins = true;
    }

    // setTimeout(location.reload(),2100);
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
