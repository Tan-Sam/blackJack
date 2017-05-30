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

Player.prototype.checkHand = function(){
  // check for jackpots (e.g blackJack, etc..)
  var cardCounts = this.hand.length;

  if (cardCounts === 2) {
    var aceCardFound = this.hand.find((elem)=>{return elem.isAce();});
    if (aceCardFound) {

      var aceCardIndex = this.hand.indexOf(aceCardFound);

      //  https://stackoverflow.com/a/4084058/1699071
      var theOtherCardIndex = 1 - aceCardIndex;

      var otherCard = this.hand[theOtherCardIndex];

      if (otherCard.isAce()||
          otherCard.getNumericalValue() === 10 ) {
            this.hitBlackjack = true;
            alert(  this.name+' blackJack!');
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
  else if (cardCounts === 5) {
    //   add up to see if more than 21
    // get all the ace cards. take them value as small as possible.

    // add up all them non ace cards

    // total them value


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

Player.prototype.draw = function(){
  this.hand = this.hand.concat(deck.pop());
  this.checkHand();
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
