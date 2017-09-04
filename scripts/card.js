function card(cardIndex=-1, cardType='', cardSymbol='') {
  const cardNameReplacer = '{{cardName}}',
        cardTemplateName = `public/cards/${cardNameReplacer}.svg`,
        // match 1/2/3..8/9 or AJQK.
        ct = cardType.match(/(\d{1,2}|[ajqk])/gi)[0],
        // ♠, heart, club, ♦=> S,H,C,D
        cs = cardSymbol.substr(0, 1);

  return {
    index: cardIndex,
    type: cardType,
    symbol: cardSymbol,
    name: `${cardType} of ${cardSymbol}`,
    imgPath: function(){
      return cardTemplateName.replace(
                cardNameReplacer,
                // e.g. 2H, AS
                `${ct}${cs}`.toUpperCase())
    },
    print: function(){
      console.log(this.name);
    },
    isFaceCard: function(){
       //  ace, jack, queen or king
      return this.type.match(/[ajqk]/i);
    },
    isAce: function(){
      //  ^a is 'a' at start of line
      return this.type.match(/^a/i);
    },
    isNumeric: function(){
      return !this.isFaceCard();
    },
    numericalValue: function(){
      let result = null;

      if(this.isAce()) {
        result = [1, 11];
      }else if (this.isFaceCard()) {
        result = 10; //  jack, Queen, King
      }else {
        result = parseInt(this.name);
      }
      return result;
    }
  }
}
