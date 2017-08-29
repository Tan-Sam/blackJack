function card(cardIndex=-1, cardType='', cardSymbol='') {
  return {
    index: cardIndex,
    type: cardType,
    symbol: cardSymbol,
    name: `${cardType} of ${cardSymbol}`,
    cardNameReplacer: /{{cardName}}/,
    cardTemplateName: `public/cards/${this.cardNameReplacer}.svg`,    
    imgPath: function(){ 
      // match 1/2/3..8/9 or AJQK.
      let ct = this.cardType.match(/(\d{1,2}|[ajqk])/gi)[0];
      // ♠, heart, club, ♦=> S,H,C,D
      let cs = this.cardSymbol.substr(0, 1); 

      return this.cardTemplateName.replace(
                this.cardNameReplacer,
                // e.g. 2H, AS
                `${ct}{cs}`.toUpperCase())                
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