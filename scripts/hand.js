function Hand(parentObj) {
  this.cards = [];
  this.parent = parentObj;
  this.bomb = false;
}

Hand.prototype.drawCard = function() {
  var result = false;
  var cards = this.cards.length;
  var cardValues = this.getCardsOnHandValue();
  if (cards < 3 ||
      cardValues < 21) {
        this.cards.push(deck.pop());
        result = true;
        if (this.cards.length === 2) {
          this.checkFor_BlackJack();
        }
  }
  else if (cards === 5){
      alert('already at max: 5 cards.');
  }
  else if (cardValues === 21) {
    alert('your already at max points: 21.');
  }
  else if (cardValues > 21) {
    alert('Already bomb.');
  }
  return result;
//Go2wo:
  //  cancel current players turn.
  // window.dispatchEvent(new KeyboardEvent('keyup',{'key':'Escape'}));
}

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

//  !!!!!!!!!!!!!!! need to think through logic !!!!!!!!!!!!!!!!!!!!
Hand.prototype.checkBlackJack_delmodoemo_after_modify = function() {
  var cardCounts = this.cards.length;

  if (cardCounts === 2) {
    this.checkFor_BlackJack();
  } else if (cardCounts === 3) { // triple 7 check
    this.evaluateTriple7();
  } else if (cardCounts === 5) {
    this.evaluate_5cards();
  }

  this.checkCardsOnHandValue();

}

//  tested ok. 1 win, multiple losses.
//  !!!!!!!!  use new function getcardsOnHandValue to evaluate ???????????????
Hand.prototype.evaluate_5cards = function() {
  //   add up to see if more than 21
  // get all the ace cards. take them value as small as possible.

  var totalValue = 0;
  var acesFound = this.getACEs(); //this.cards.filter((e)=>{ return e.isAce()});

  //  acesFound doesn't return null.
  //  Hence cannot use if to evaluate.
  totalValue += acesFound.length; // each ace value is 1..

  // add up all them non ace cards
  totalValue +=
    this.cards.reduce((accum, elem) => {
      return elem.isAce() ? accum : (accum + elem.getNumericalValue());
    }, 0);

  // total them value
  if (totalValue <= 21) {
    // do something
    //  reveal cards or something.
    console.log('You win! 5 cards less than 21');
  } else {
    console.log('5 cards over 21: ' + totalValue + ' points');
    this.cardPointsOverLimit = true;
  }
}

Hand.prototype.evaluateTriple7 = function() {
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
Hand.prototype.checkFor_BlackJack = function() {

  if (this.cards.length != 2) {
    for (var i = 0; i < 10; i++) {
      console.log('invalid cards on hand to check for blackjack!!');
    }
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
      setTimeout(()=>{alert(this.parent.name + ' blackJack!');},450);
    }
  }
}

Hand.prototype.getCardsOnHandValue = function() {

  if (this.cards.length === 0) {
    return 0;
  }

  // var totalValue = 0;
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
          if (nonACEsValue <= 10) {
            return acesFound[0].getNumericalValue()[1] + nonACEsValue; // 11 + nonACEsValue
          } else {
            return acesFound[0].getNumericalValue()[0] + nonACEsValue; // 1 + nonACEsValue
          }
        }
      case 2:
        {
          if (nonACEsValue <= 9) {
            return acesFound[0].getNumericalValue()[1] + // 11 +
              acesFound[1].getNumericalValue()[0] + // 01
              nonACEsValue; //        12  + nonACEsValue
          } else {
            return acesFound[0].getNumericalValue()[0] + // 01 +
              acesFound[1].getNumericalValue()[0] + // 01
              nonACEsValue; //          2 + nonACEsValue
          }
        }
      case 3:
        {
          if (nonACEsValue <= 8) {
            return acesFound[0].getNumericalValue()[1] + // 11 +
              acesFound[1].getNumericalValue()[0] + // 01 +
              acesFound[2].getNumericalValue()[0] + // 01
              nonACEsValue; //          13  + nonACEsValue
          } else {
            return acesFound[0].getNumericalValue()[0] + // 01 +
              acesFound[1].getNumericalValue()[0] + // 01 +
              acesFound[2].getNumericalValue()[0] + // 01
              nonACEsValue; //          3 + nonACEsValue
          }
        }
      case 3:
        {
          if (nonACEsValue <= 7) {
            return acesFound[0].getNumericalValue()[1] + // 11 +
              acesFound[1].getNumericalValue()[0] + // 01 +
              acesFound[2].getNumericalValue()[0] + // 01 +
              acesFound[2].getNumericalValue()[0] + // 01
              nonACEsValue; //        14 + nonACEsValue
          } else {
            return acesFound[0].getNumericalValue()[0] + // 01 +
              acesFound[1].getNumericalValue()[0] + // 01 +
              acesFound[2].getNumericalValue()[0] + // 01 +
              acesFound[2].getNumericalValue()[0] + // 01
              nonACEsValue; //          4 + nonACEsValue
          }
        }
      default:
        break;
    }
  }
}
