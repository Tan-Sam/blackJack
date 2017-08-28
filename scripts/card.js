const cardTemplateName = "resources/cards/{{cardName}}.svg";
const cardNameReplacer = /{{cardName}}/;

function Card(index, cardType, cardSymbol) {
  //	default value of cards. e.g.
  //	Ace of ♠ -eq 0,
  //	king of ♦, KingofDiamonds -eq 51..
  this.defaultCardIndex = index;
  this.cardName = cardType + ' of ' + cardSymbol;

  //  Ace,1,2,3,4,5.. --> King
  this.cardType = cardType;

  //  ♠ ♥ ♣ ♦
  this.cardSymbol = cardSymbol;
}

//    tested working
Card.prototype.imgPath = function(){
  return cardTemplateName.replace(cardNameReplacer,
                                  this.cardSVGname());
}

Card.prototype.print = function(){
  console.log(this.cardName);
}

Card.prototype.isFaceCard = function() {
  return this.cardType.match(/[ajqk]/i); //  ace, jack, queen or king
}

//  ^a is 'a' at start of line
Card.prototype.isAce = () => this.cardType.match(/^a/i);

Card.prototype.isNumeric = function() {
  return !this.isFaceCard();
}

// returns the name of card image(.svg)
Card.prototype.cardSVGname = function() {
  return (
    //  match numeric 1 or 2 digit(s) or AJQK.
    this.cardType.match(/(\d{1,2}|[ajqk])/gi)[0] +
     // sample 2H--> Two Of hearts
    this.cardSymbol.substr(0, 1)).toUpperCase();
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
  //  populate Ace. Passing array as param as it's method
  //  is same as numerals & face.
  var aceCard = faceCardsArray.slice(0, 1); //  -eq [Ace] only
  pushArrayIntoDeck(aceCard);

  //  populate Numbers.
  initNumbersArray();
  pushArrayIntoDeck(numbersArray);

  //  populate face cards.
  pushArrayIntoDeck(faceCardsArray.slice(1)); // slice(1) -eq omit Ace

  deck = shuffleDeck(deck);
  // deck = deck.cut(4);
}

function shuffleDeck(deckArray){
  let m = deckArray.length, i;
  while (m) {
    i = (Math.random() * m--) >>> 0;
    [deckArray[m], deckArray[i]] = [deckArray[i], deckArray[m]];
  }
  return deckArray;
}

function cutDeck(deckArrayToCut, itemsToSliceFromTop) {
  return deckArrayToCut.splice(itemsToSliceFromTop).concat(deckArrayToCut);
}


//  tested working
function pushArrayIntoDeck(arrToPush) {
  let validArray = Array.isArray(arrToPush);
  if (validArray) {
		//	type	Ace,1,2,3,4,5.. --> King
    for (var i = 0; i < arrToPush.length; i++) {
      //	symbol	♠ ♥ ♣ ♦
      for (var j = 0; j < symbolArray.length; j++) {
        var newCard = new Card(deck.length,
    					             arrToPush[i].toString(),		//	toString() because of SVG
      					           symbolArray[j]);
        deck.push(newCard);
      }
    }
  }else {
    throw new Exception(
      "Invalid array type as param in pushArrayIntoDeck(sp) method.\nType received: "+
    					 typeof arrToPush);
  }
}
