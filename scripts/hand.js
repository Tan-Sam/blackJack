function Hand(parentObj) {
  this.cards = [];
  this.parent = parentObj;  // for raising alerts
}

Hand.prototype.drawCard = function() {
  var result = false;
  var cards = this.cards.length;
  var cardValues = this.getCardsOnHandValue();

  if (cards < 3 ||
      (cardValues < 21 && cards !== 5)) {
        this.cards.push(deck.pop());
        result = true;  // draw card success.

        var newCardLength = this.cards.length;

        if (newCardLength === 2) {
          this.checkFor_BlackJack();
        }
        else if (newCardLength === 5) {
          this.evaluate_5cards();
        }
  }
  else if (cards === 5){
      alert('already at max: 5 cards.');
  }
  else if (cardValues === 21) {
    alert('your already at max points: 21.');
  }
  else if (cardValues > 21) {
    alert('Already bomb:\t' + cardValues + ' points.');
  }
  return result;
}

//  aces returned is a new array. Cannnot
//  be use Array.prototype.indexOf() ?
Hand.prototype.getACEs = function() {
  var aces = this.cards.filter((elem) => {
    return elem.isAce();
  });
  return (aces.length === 0) ? false : aces;
}
Hand.prototype.getNon_aces = function() {
  var nonAces = this.cards.filter((elem) => {
    return !elem.isAce();
  });
  return (nonAces.length === 0) ? false : nonAces;
}

Hand.prototype.lastCard = function() {
  return this.cards[this.cards.length - 1];
}

//  tested ok.
Hand.prototype.evaluate_5cards = function() {
  //   add up to see if more than 21
  // get all the ace cards. take them value as small as possible.

  var totalValue = 0;
  var acesFound = this.getACEs();

  if (acesFound) {//  otherwise value would be Nan
    totalValue += acesFound.length; // each ace value is 1..
  }

  // add up all them non ace cards
  totalValue +=
    this.cards.reduce((accum, elem) => {
      return elem.isAce() ? accum : (accum + elem.getNumericalValue());
    }, 0);

    var userMsg;
  // total them value
  if (totalValue <= 21) {
    //  do something
    //  reveal cards or something.
    userMsg = 'You win! 5 cards less than 21.\n'+'Your total points:\t' + totalValue;
    defaultAlertCaller(userMsg);
  } else {
    userMsg = '5 cards over 21:\t' + totalValue + ' points'
    defaultAlertCaller(userMsg);
    this.cardPointsOverLimit = true;
  }
}

Hand.prototype.evaluateTriple7 = function() {
  var cards = this.cards;

  if (cards[0].getNumericalValue() === 7 &&
    cards[1].getNumericalValue() === 7 &&
    cards[2].getNumericalValue() === 7) {
    this.isHitBlackJack = true; //  might need to change to superJackpot or soemthing.
    defaultAlertCaller('Triple 7 hit!\n' +
                        cards[0].cardName + '+\n' +
                        cards[1].cardName + '+\n' +
                        cards[2].cardName);
  }
}

//   tested working multiple times.
//    but there was 1 fluke, player had 1 Ace & 1 4.
//      but the blackJack alert came out. kiv..
Hand.prototype.checkFor_BlackJack = function() {
  var noOfCards = this.cards.length;
  if (noOfCards != 2) {
    var warnings = 5;
    var warningMsg = 'invalid cards on hand to check for blackjack!!:\n '+
                     'Cards on hand: ' + noOfCards;
    do { console.log(warningMsg); }while(warnings-- >0)
    return;
  }

  var aceCardsFound = this.getACEs();
  var success = false;

  if (aceCardsFound) {
    if (aceCardsFound.length === 2) {
      success = true;
    } else if (this.getCardsOnHandValue() === 21) {
      success = true;
    }

    if (success) {
      this.isHitBlackJack = true;
      defaultAlertCaller(this.parent.name + ' blackJack!');
    }
  }
}

//  can reduce code, by using ternary in ace(s) value determination.
//  but should I do that? I've commented the old code.
//  Delete them when things are stable.
Hand.prototype.getCardsOnHandValue = function() {
  if (this.cards.length === 0) {
    return 0;
  }

  var acesFound = this.getACEs();
  var nonACEsFound = this.getNon_aces();
  var nonACEsValue = 0;

  if (nonACEsFound) {
    nonACEsValue = nonACEsFound.reduce((accum, elem) => {
      return accum + elem.getNumericalValue();
    }, 0);
  }

  if (!acesFound) {
    return nonACEsValue;
  } else { //  deduced based on excel layout
    switch (acesFound.length) {
      case 1:
        {
           return (nonACEsValue <= 10) ? (11 + nonACEsValue):(1 + nonACEsValue);{
             // if (nonACEsValue <= 10) {
             //   return acesFound[0].getNumericalValue()[1] + nonACEsValue; // 11 + nonACEsValue
             // } else {
             //   return acesFound[0].getNumericalValue()[0] + nonACEsValue; // 1 + nonACEsValue
             // }
           }
        }
      case 2:
        {
          return (nonACEsValue <= 9) ? (12 + nonACEsValue):(2 + nonACEsValue);{
            // if (nonACEsValue <= 9) {
            //   return acesFound[0].getNumericalValue()[1] + // 11 +
            //     acesFound[1].getNumericalValue()[0] + // 01
            //     nonACEsValue; //        12  + nonACEsValue
            // } else {
            //   return acesFound[0].getNumericalValue()[0] + // 01 +
            //     acesFound[1].getNumericalValue()[0] + // 01
            //     nonACEsValue; //          2 + nonACEsValue
            // }
          }
        }
      case 3:
        {
          return (nonACEsValue <= 8) ? (13 + nonACEsValue):(3 + nonACEsValue);{
            // if (nonACEsValue <= 8) {
            //   return acesFound[0].getNumericalValue()[1] + // 11 +
            //     acesFound[1].getNumericalValue()[0] + // 01 +
            //     acesFound[2].getNumericalValue()[0] + // 01
            //     nonACEsValue; //          13  + nonACEsValue
            // } else {
            //   return acesFound[0].getNumericalValue()[0] + // 01 +
            //     acesFound[1].getNumericalValue()[0] + // 01 +
            //     acesFound[2].getNumericalValue()[0] + // 01
            //     nonACEsValue; //          3 + nonACEsValue
            // }
          }
        }
      case 4:
        {
          return (nonACEsValue <= 7) ? (14 + nonACEsValue):(4 + nonACEsValue);{
            // if (nonACEsValue <= 7) {
            //   return acesFound[0].getNumericalValue()[1] + // 11 +
            //     acesFound[1].getNumericalValue()[0] + // 01 +
            //     acesFound[2].getNumericalValue()[0] + // 01 +
            //     acesFound[2].getNumericalValue()[0] + // 01
            //     nonACEsValue; //        14 + nonACEsValue
            // } else {
            //   return acesFound[0].getNumericalValue()[0] + // 01 +
            //     acesFound[1].getNumericalValue()[0] + // 01 +
            //     acesFound[2].getNumericalValue()[0] + // 01 +
            //     acesFound[2].getNumericalValue()[0] + // 01
            //     nonACEsValue; //          4 + nonACEsValue
            // }
          }
        }
      default:
        break;
    }
  }
}
