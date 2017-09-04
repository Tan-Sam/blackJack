function deck(){
    return {
        cards: [],
        // ['♠','♥','♣','♦']
        symbols: ['spade ♠', 'heart ♥', 'club ♣', 'diamond ♦'],
        cardTypes: ['Ace',2,3,4,5,6,7,8,9,10,'Jack','Queen','King'].map(ct=>ct.toString()),
        init: function(){
            // clear deck if has cards
            if (this.cards.length > 0) {
                this.cards.splice(0,this.cards.length);
            }
            // populate deck
            // special note: 'this' as the 2nd param of the forEach (after function())
            // passes 'this'from the outer scope (class instance) to
            // the inner scope (forEach func() call).
            // otherwise calling 'this' is calling the 'window'object.
            this.cardTypes.forEach(function(cardType) {
                this.symbols.forEach(function(sym){
                    let newcard = card(this.cards.length, cardType, sym);
                    this.cards.push(newcard);
                }, this)
            }, this);
            
            // for function chaining.
            return this;
        },
        print: function(){
            this.cards.forEach(card=>console.log(card.name))
        },
        shuffle: function(){
            let cards = this.cards;
            let m = cards.length, i;
            while (m) {
              i = (Math.random() * m--) >>> 0;
              [cards[m], cards[i]] = [cards[i], cards[m]];
            }
            return this
        },
        cut: function(cardsToSlice){            
            let cards = this.cards;            
            let slicedCards = cards.splice(cards.length - cardsToSlice);
            this.cards = slicedCards.concat(cards);
            // Example
            // let q=[1,2,3,4,5,6]
            // let tr = q.splice(5)  returns [6]
            //           .concat(q)  q --> [1,2,3,4,5]
            // result:
            // tr --> [6, 1, 2, 3, 4, 5]
            return true;
        },
        draw: function(){
            return this.cards.pop();
        }
    }
}
