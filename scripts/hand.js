var Hand = function(){
  this.cards = [];

}

Hand.prototype.drawCard = function(){
  this.cards.concat(deck.pop());
}

Hand.prototype.getACEs = function(){
  var aces = this.cards.filter((elem)=>{ return elem.isAce(); });
  return (aces.length === 0)? false : aces;
}

Hand.prototype.getNon_aces = function(){
  this.cards.filter((elem)=>{ return ! elem.isAce(); });
}

Hand.prototype.lastCard = function(){
  return this.cards[this.cards.length-1];
}

Hand.prototype.checkBlackJack = function(){
  var cardCounts = this.cards.length;

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
Hand.prototype.evaluate_5cards = function(){
  //   add up to see if more than 21
  // get all the ace cards. take them value as small as possible.

  debugger;
  var totalValue = 0;
  var acesFound = this.cards.filter((e)=>{ return e.isAce()});

  //  acesFound doesn't return null.
  //  Hence cannot use if to evaluate.
  totalValue += acesFound.length; // each ace value is 1..

  // add up all them non ace cards
  totalValue +=
  this.cards.reduce((accum, elem)=>{
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

Hand.prototype.evaluateTriple7 = function(){
  var cards = this.cards;

  if (cards[0].getNumericalValue() === 7 &&
      cards[1].getNumericalValue() === 7 &&
      cards[2].getNumericalValue() === 7) {
        this.isHitBlackJack = true; //  might need to change to superJackpot or soemthing.
      }
}

//   tested working multiple times.
//    but there was 1 fluke, player had 1 Ace & 1 4.
//      but the blackJack alert came out. kiv..
Hand.prototype.checkFor_BlackJack = function(){
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

Hand.prototype.getCardsOnHandValue = function(){
  var totalValue = 0;
  var acesFound = this.hand.getACEs();
  var nonACEs = this.hand.getNon_aces();

  var nonACEsValue = nonACEs.reduce((accum, elem)=>{
                        return accum + elem.getNumericalValue();
                      },0);

  if (!acesFound) {
      return nonACEsValue;
  }
  else {  //  deduced based on excel layout
    switch (acesFound.length) {
      case 1:
        {
          if (nonACEsValue <= 10) {
            return acesFound[0][1] + nonACEsValue;  // 11 + nonACEsValue
          }
          else
            return acesFound[0][0] + nonACEsValue;  // 1 + nonACEsValue
          }
        }
      case 2:
        {
          if (nonACEsValue <= 9) {
            return acesFound[0][1] + // 11 +
                   acesFound[1][0] + // 01 +
                   nonACEsValue;    // + nonACEsValue
          }
          else
            return acesFound[0][0] + // 01 +
                   acesFound[1][0] + // 01 +
                   nonACEsValue;  // + nonACEsValue
          }
        }
      case 3:
        {
          if (nonACEsValue <= 8) {
            return acesFound[0][1] + // 11 +
                   acesFound[1][0] + // 01 +
                   acesFound[2][0] + // 01 +
                   nonACEsValue;    //  + nonACEsValue
          }
          else
          return acesFound[0][0] + // 01 +
                 acesFound[1][0] + // 01 +
                 acesFound[2][0] + // 01 +
                 nonACEsValue;    //  + nonACEsValue
          }
        }
        case 3:
          {
            if (nonACEsValue <= 7) {
              return acesFound[0][1] + // 11 +
                     acesFound[1][0] + // 01 +
                     acesFound[2][0] + // 01 +
                     acesFound[2][0] + // 01 +
                     nonACEsValue;    //  + nonACEsValue
            }
            else
            return acesFound[0][0] + // 01 +
                   acesFound[1][0] + // 01 +
                   acesFound[2][0] + // 01 +
                   acesFound[2][0] + // 01 +
                   nonACEsValue;    //  + nonACEsValue
            }
          }
      default:
        break;
    }
  }
}
