function Card(index, cardType, cardSymbol) {
  // default value of cards. e.g. AceOfSpade -eq 0, AceOfHearts -eq 1, KingofDiamonds -eq 51..
  this.defaultCardIndex = index;
  this.cardName = cardType + ' of ' + cardSymbol;

  //  position in deck. e.g. '0' -eq bottom of deck. '51' -eq top of deck
  this.deckIndex = index;

  //  Ace --> King
  this.cardType = cardType;

  //      ♠ ♥ ♣ ♦
  this.cardSymbol = cardSymbol;

  // console.log(this.cardSVGname());
}

Card.prototype.isFaceCard = function() {
  return this.cardType.match(/[ajqk]/i); //  ace, jack, queen or king
}

Card.prototype.isAce = function() {
  return this.cardType.match(/^a/i); //  a is at start of line
}

Card.prototype.isNumeric = function() {
  return !this.isFaceCard();
}

// returns the name of card image(.svg)
Card.prototype.cardSVGname = function() {

  //  match numeric 1 or 2 digit(s) or AJQK.
  return (this.cardType.match(/(\d{1,2}|[ajqk])/gi)[0] +
    this.cardSymbol.substr(0, 1)).toUpperCase(); // sample 2H--> Two Of hearts
}

Card.prototype.setDeckIndex = function(deckIndex) {
  this.deckIndex = deckIndex;
}

const aceNumericValues = [1, 11];

Card.prototype.getNumericalValue = function() {
  var result = null;

  if (this.isAce()) {
    result = aceNumericValues;
  }
  else if (this.isFaceCard()) {
    result = 10; //  jack, Queen, King
  }
  else {
    result = parseInt(this.cardName);
  }

  return result;
}

// var symbolArray = ['♠','♥','♣','♦'];
var symbolArray = ['spade', 'heart', 'club', 'diamond'];

var faceCardsArray = ['Ace', 'Jack', 'Queen', 'King'];

var numbersArray = [];

function initNumbersArray() {
  for (var i = 2; i <= 10; i++) {
    numbersArray.push(i);
  }
}

function initDeck() {
  var deckIndex = 0;

  //  populate Ace. Passing array as param as it's method
  //  is same as numerals & face.
  var aceCard = faceCardsArray.slice(0, 1);
  pushArrayIntoDeck(aceCard);

  //  populate Numbers.
  pushArrayIntoDeck(numbersArray);

  //  populate face cards.
  pushArrayIntoDeck(faceCardsArray.slice(1)); // slice() -eq omit Ace

  deck = deck.shuffle();
  // deck = deck.cut(4);
}

//  tested working
function pushArrayIntoDeck(arrToPush) {
  if (Array.isArray(arrToPush)) {
    for (var i = 0; i < arrToPush.length; i++) {
      for (var j = 0; j < symbolArray.length; j++) {
        //                                               toString() because of SVG
        var newCard = new Card(deck.length, arrToPush[i].toString(), symbolArray[j]);
        deck.push(newCard);
      }
    }
  } else {
    throw new Exception("Invalid array in pushArrayIntoDeck(sp) method.");
  }
}

var deck = [];

//  tested working
Array.prototype.shuffle = function() {
  let m = this.length,
    i;
  while (m) {
    i = (Math.random() * m--) >>> 0;
    [this[m], this[i]] = [this[i], this[m]];
  }
  return this;
}

//  tested working
Array.prototype.cut = function(cardsToSliceFromTop) {
  return this.splice(cardsToSliceFromTop).concat(this);
}
