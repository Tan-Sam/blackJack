function Hand()
{
    this.cards = [];
}

//  allow draw if cards on hand less than 5
//  & points < 21
//  & no blackJacks.
Hand.prototype.checkIfCanDrawCard = function ()
{
  if (this.getCardsOnHandValue() < 21 &&
      this.cards.length < 5 &&
      !this.checkBlackJack()) {
    return true;
  }

  return false;
}

Hand.prototype.drawCard = function()
{
    if (this.checkIfCanDrawCard()) {
      this.cards.push(deck.pop());
      return this.lastCard();
    }

    return false;
}

//  aces returned is a new array. Cannnot
//  be use Array.prototype.indexOf() ?
Hand.prototype.getACEs = function()
{
    var aces = this.cards.filter((elem) =>{ return elem.isAce(); });
    return (aces.length === 0) ? false : aces;
}

Hand.prototype.getNon_aces = function()
{
    var nonAces = this.cards.filter((elem) =>{ return !elem.isAce(); });
    return (nonAces.length === 0) ? false : nonAces;
}

Hand.prototype.lastCard = function()
{
    return (this.cards.length === 0)?
    false :
    this.cards[this.cards.length - 1];
}

//  tested ok.
Hand.prototype.check_5cardsBlackJack = function()
{
    if (this.cards.length === 5) {
      return (this.getCardsOnHandValue() <= 21);
    }

    return false;
}

Hand.prototype.evaluateTriple7 = function()
{
    var cards = this.cards;

    if (cards.length === 3)
    {
      if (cards[0].getNumericalValue() === 7 &&
          cards[1].getNumericalValue() === 7 &&
          cards[2].getNumericalValue() === 7)
      {
          return true;
      }
    }

    return false;
}

Hand.prototype.checkBlackJack = function()
{
    var noOfCards = this.cards.length;
    var aceCardsFound = this.getACEs();

    if (noOfCards === 2) {
      if (aceCardsFound) {
        if (aceCardsFound.length === 2 ||
            this.getCardsOnHandValue() === 21) {
          return true;
        }
      }
    }

    return false; //  no else. if inner if's fail, default false will return.
}

Hand.prototype.getCardsOnHandValue = function()
{
    if (this.cards.length === 0)
        return 0;

    var acesFound = this.getACEs();
    var nonACEsFound = this.getNon_aces();
    var nonACEsValue = 0;

    if (nonACEsFound)
    {
        nonACEsValue = nonACEsFound.reduce((accum, elem) =>
        {
            return accum + elem.getNumericalValue();
        }, 0);
    }

    if (!acesFound)
    {
        return nonACEsValue;
    }
    else
    { //  deduced based on excel layout. strategy to not exceed 21.
        switch (acesFound.length)
        {
            case 1: return (nonACEsValue <= 10) ? (11 + nonACEsValue) : (1 + nonACEsValue);
            case 2: return (nonACEsValue <= 9) ? (12 + nonACEsValue) : (2 + nonACEsValue);
            case 3: return (nonACEsValue <= 8) ? (13 + nonACEsValue) : (3 + nonACEsValue);
            case 4: return (nonACEsValue <= 7) ? (14 + nonACEsValue) : (4 + nonACEsValue);
            default:
                break;
        }
    }
}
