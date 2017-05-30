function Card(index, cardType, cardSymbol){
  // default value of cards. e.g. AceOfSpade -eq 0, AceOfHearts -eq 1, KingofDiamonds -eq 51..
  this.defaultCardIndex = index;
  this.cardName = cardType+' of '+ cardSymbol;

  //  position in deck. e.g. '0' -eq bottom of deck. '51' -eq top of deck
  this.deckIndex = index;

  //  Ace --> King
  this.cardType = cardType;

  //      ♠ ♥ ♣ ♦
  this.cardSymbol = cardSymbol;

  // console.log(this.cardSVGname());

}

Card.prototype.isFaceCard = function(){
  return this.cardType.match(/[ajqk]/i);  //  ace, jack, queen or king
}

Card.prototype.isAce = function(){
  return this.cardType.match(/^a/i);
}

// returns the name of card image(.svg)
Card.prototype.cardSVGname = function(){
  return (this.cardType.match(/(\d{1,2}|[ajqk])/gi)[0] + this.cardSymbol.substr(0,1)).toUpperCase();
  //  match numeric 1 or 2 digit(s) or AJQK.
}

Card.prototype.setDeckIndex = function(deckIndex){
  this.deckIndex = deckIndex;
}

const aceNumericalValues = [1,11];

Card.prototype.getNumericalValue = function(){
  var result = null;
  //  special handler for ace
  if (this.cardName.match(/ace/i)) {
    result = aceNumericalValues;
  }
  else {
    var cardMatchesNumeric = this.cardName.match(/\d/);
    if (cardMatchesNumeric) {
      result = parseInt(this.cardName);
    }
    else {
      result = 10;  //  jack, Queen, King
    }
  }
  return result;
}

// var symbolArray = ['♠','♥','♣','♦'];
var symbolArray = ['spade','heart','club','diamond'];

var faceCardsArray = ['Ace', 'Jack', 'Queen', 'King'];

var numbersArray = [];
function initNumbersArray(){
  for(var i=2; i<=10; i++){
    numbersArray.push(i);
  }
}

function initDeck(){
  var deckIndex = 0;

  //  populate Ace & it's symbols.
  var card = faceCardsArray[0];
  pushArrayIntoDeck(card);
  // for(var i=0; i<symbolArray.length; i++){
  //   var newCard = new Card(deckIndex++, card, symbolArray[i]);
  //   deck.push(newCard);
  // }

  //  populate Numbers & it's symbols.
  pushArrayIntoDeck(numbersArray);
  // for (var i = 0; i < numbersArray.length; i++) {
  //   for(var j=0; j<symbolArray.length; j++){
  //     //                                               toString() because of SVG
  //     var newCard = new Card(deckIndex++, numbersArray[i].toString(), symbolArray[j]);
  //     deck.push(newCard);
  //   }
  // }

  //  populate face cards & it's symbols.
  pushArrayIntoDeck(faceCardsArray.slice(1)); // dont pass Ace
  // for (var i = 1; i < faceCardsArray.length; i++) {
  //   for(var j = 0; j < symbolArray.length; j++){
  //     var newCard = new Card(deckIndex++, faceCardsArray[i], symbolArray[j]);
  //     deck.push(newCard);
  //   }
  // }

  deck.forEach(function(elem){ console.log(elem.cardName); });

  debugger;
  console.clear();

  deck = deck.shuffle();
  // deck = deck.cut(4);

  deck.forEach(function(elem){ console.log(elem.cardName); });
}



function pushArrayIntoDeck(arrToPush){
  if(Array.isArray(arrToPush)){
    for (var i = 0; i < arrToPush.length; i++) {
      for(var j=0; j<symbolArray.length; j++){
        //                                               toString() because of SVG
        var newCard = new Card(deck.length, arrToPush[i].toString(), symbolArray[j]);
        deck.push(newCard);
      }
    }
  }
  else {  // ace
    for(var i=0; i<symbolArray.length; i++){
      var newCard = new Card(deck.length, arrToPush, symbolArray[i]);
      deck.push(newCard);
    }
  }
}








var deck = [];

//  tested working
Array.prototype.shuffle = function(){
  let m = this.length, i;
  while(m){
    i = (Math.random() * m--) >>> 0;
    [this[m],this[i]] = [this[i],this[m]];
  }
  return this;
}

//  tested working
Array.prototype.cut = function(cardsToSliceFromTop){
  return this.splice(cardsToSliceFromTop).concat(this);
}
