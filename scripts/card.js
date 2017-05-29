function Card(index, cardName){
  this.defaultCardIndex = index;
  this.cardName = cardName;
  this.numericalValue = null;
  this.img;
  this.deckIndex = index;
}

Card.prototype.setDeckIndex = function(deckIndex){
  this.deckIndex = deckIndex;
}

const aceNumericalValues = [1,10,11];

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
  for(var i=0; i<symbolArray.length; i++){
    var newCard = new Card(deckIndex++, card+' of '+ symbolArray[i]);
    deck.push(newCard);
  }

  //  populate Numbers & it's symbols.
  for (var i = 0; i < numbersArray.length; i++) {
    for(var j=0; j<symbolArray.length; j++){
      var newCard = new Card(deckIndex++, numbersArray[i]+' of '+ symbolArray[j]);
      deck.push(newCard);
    }
  }

  //  populate face cards & it's symbols.
  for (var i = 1; i < faceCardsArray.length; i++) {
    for(var j = 0; j < symbolArray.length; j++){
      var newCard = new Card(deckIndex++, faceCardsArray[i]+' of '+ symbolArray[j]);
      deck.push(newCard);
    }
  }

  deck = deck.shuffle();
  // deck = deck.cut(4);
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
