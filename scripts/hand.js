function hand(){
  return {
    cards: [],
    canDrawCard: function(){
      //  if no blackJack jackpot
      //  & points < 21
      //  & cards on hand less than 5.
      return (!this.blackJack() &&
              this.points() < 21 &&
              this.cards.length < 5)
    },
    drawCard: function(deck, endTurn, ){
      if (this.canDrawCard()){
        // draw card
        this.cards.push(deck.drawCard());
        // check for jackpot
        switch (this.cards.length) {
          case 2:
            if (this.blackJack()) {
              endTurn('blackJack')
            }
            break;
          case 3:
            if (this.triple7()) {
              endTurn('triple7')
            }
            break;
          case 5:
            if (this.fiveCardsUnder21()) {
              endTurn('fiveCards')
            }
            break;
          default: break;
        }
        // check if can still draw, if not end turn.
        if (!this.canDrawCard()) {
          endTurn()
        }
      }else {
        return false;
      }
    },
    points: function(){
      if (this.cards.length === 0)
        return 0;

      const acesFound = this.getAces();
      const nonACEsFound = this.getNonAces();
      let nonAceValues = 0;

      // calculate non ace values first,
      // as they are non variable like ace.
      if (nonACEsFound){
        nonAceValues = nonACEsFound.reduce((accum, elem) =>{
            return accum + elem.numericalValue();
        }, 0);
      }

      // return nonAceValues if ace not found.
      if (acesFound.length > 0){
        return nonAceValues;
      }else{
        let aceValues = 0;
        //  deduced based on excel layout. strategy to not exceed 21.
        switch (acesFound.length){
            case 1: aceValues = (nonAceValues <=10) ? 11 : 1;
            case 2: aceValues = (nonAceValues <= 9) ? 12 : 2;
            case 3: aceValues = (nonAceValues <= 8) ? 13 : 3;
            case 4: aceValues = (nonAceValues <= 7) ? 14 : 4;
            default:
                break;
        }
        return (aceValues + nonAceValues);
      }
    },
    blackJack: function(){
      // if only 2 cards
      // & has ace(s):
      //  1 ace? values must be 21 or
      //  2 aces? bingo!
     if (this.cards.length === 2) {
       let aceCards = this.getAces();
       if (aceCards.length > 0) {
        return (aceCards.length === 2 ||
                this.getCardsOnHandValue() === 21)
       }
     }
    },
    getAces: function(){
      return this.cards.filter(elem=> elem.isAce());
    },
    getNonAces: function(){
      return this.cards.filter(elem=> !elem.isAce());
    },
    fiveCardsUnder21: function(){
      if (this.cards.length === 5) {
        return (this.points() <= 21);
      }
    },
    triple7: function(){
      const cards = this.cards;
      if (cards.length === 3){
        // Array.every evaluates if all element in array
        // passes predicate.
        return cards.every(c=>c.numericalValue()===7);
      }
    }
  }
}
