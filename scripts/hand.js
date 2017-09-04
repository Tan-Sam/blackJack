function hand(){
  return {
    cards: [],
    canDrawCard: function(){
        //  if cards on hand less than 5
        //  & points < 21
        //  & no blackJacks.
        return (this.points() < 21 &&
                this.cards.length < 5 &&
                !this.blackJack())
    },
    points: function(){
        if (this.cards.length === 0)
            return 0;

        const acesFound = this.getACEs();
        const nonACEsFound = this.getNonACEs();
        const nonAceValues = 0;

        if (nonACEsFound){
            nonAceValues = nonACEsFound.reduce((accum, elem) =>{
                return accum + elem.getNumericalValue();
            }, 0);
        }

        if (!acesFound){
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
        let aceCards = this.getACEs();
        if (this.cards.length === 2 &&
            aceCards.length > 0) {
            return (aceCards.length === 2 ||
                    this.getCardsOnHandValue() === 21)
        }
        // notfound
        return false;
    },
    getAces: function(){
        return this.cards.filter(elem=> elem.isAce());
    },
    getNonAces: function(){
      return this.cards.filter(elem=> !elem.isAce());
    },
    check5CardsUnder21: function(){
        if (this.cards.length === 5) {
          return (this.getCardsOnHandValue() <= 21);
        }
        return false;
    },
    checkTriple7: function(){
      var cards = this.cards;
      if (cards.length === 3){
        return cards.every(c=>c.getNumericalValue()===7);
      }
      return false;
    }
  }
}
