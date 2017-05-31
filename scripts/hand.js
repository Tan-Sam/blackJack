Player.prototype.checkHand = function(){
  var cardCounts = this.hand.length;

  if (cardCounts === 2) {
    this.checkFor_BlackJack();
  }
  else if (cardCounts === 3) { // triple 7 check
      this.evaluateTriple7();
  }
  else if (cardCounts === 5) {
    this.evaluate_5cards();
  }

  this.checkCardsOnHandValue();

}

//  tested ok. 1 win, multiple losses.
Player.prototype.evaluate_5cards = function(){
  //   add up to see if more than 21
  // get all the ace cards. take them value as small as possible.

  debugger;
  var totalValue = 0;
  var acesFound = this.hand.filter((e)=>{ return e.isAce()});

  //  acesFound doesn't return null.
  //  Hence cannot use if to evaluate.
  totalValue += acesFound.length; // each ace value is 1..

  // add up all them non ace cards
  totalValue +=
  this.hand.reduce((accum, elem)=>{
    return elem.isAce()? accum : (accum + elem.getNumericalValue());}, 0);

  // total them value
  if (totalValue <= 21) {
    // do something
    //  reveal cards or something.
    console.log('You win! 5 cards less than 21');
  }
  else {
    console.log('5 cards over 21: '+ totalValue + ' points');
    this.cardPointsOverLimit = true;
  }
}

Player.prototype.evaluateTriple7 = function(){
  if (this.hand[0].getNumericalValue() === 7 &&
      this.hand[1].getNumericalValue() === 7 &&
      this.hand[2].getNumericalValue() === 7) {
        this.isHitBlackJack = true; //  might need to change to superJackpot or soemthing.
      }
}

//   tested working multiple times.
//    but there was 1 fluke, player had 1 Ace & 1 4.
//      but the blackJack alert came out. kiv..
Player.prototype.checkFor_BlackJack = function(){
  var aceCardFound = this.hand.find((elem)=>{return elem.isAce();});
  if (aceCardFound) {

    var aceCardIndex = this.hand.indexOf(aceCardFound);

    //  https://stackoverflow.com/a/4084058/1699071
    var theOtherCardIndex = 1 - aceCardIndex;   //  flip 1->0 & 0->1

    var otherCard = this.hand[theOtherCardIndex];

    if (otherCard.isAce()||
        otherCard.getNumericalValue() === 10 ) {
          this.isHitBlackJack = true;
          alert(  this.name+' blackJack!');
    }
  }
}

Player.prototype.checkCardsOnHandValue = function(){

  var totalValue = 0;

  var aces = this.hand.filter((elem)=>{
      return elem.isAce();
  });

  var nonAces = this.hand.filter((elem)=>{
      return !elem.isAce();
  });

  totalValue = nonAces.reduce((accum, elem)=>{
    return accum + elem.getNumericalValue();
  },0);
  if (totalValue > 21) {

  }
}

Player.prototype.lastCard = function(){
  return this.hand[this.hand.length-1];
}
