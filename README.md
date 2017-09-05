## some rules for reference:

1. banker draws last.
2. at least 2 players.
3. deck.pop() = player.draw()
4. try to use pure functions

## game flow

1. init deck
2. shuffle Deck
3. distribute cards
4. calculate blackjack
5. if no blacksjacks, allow draw sequence
6. game sequence banker ai


## Ace value calculation

![calculation flow](./resources/calculateCardValuesLogicwithAces.png)
- start with the right 2 tables.
- They calculate the ace values permissible,  
based on the value of non ace cards on hand.

## Script Dependencies
Because this isn't using react/redux, there isn't a single source of truth  
(a core mechanism to manage/diburse states).  
Hence need to chain everything up.
Which gets messy quickly. Hence my strategy is to build the code,
from the bottom functionality up. In the following order(high to low):

|no.|module|status|properties|functions|
|---|---|:---:|:---|---|
|1.|main|||
|2.|domHandler|||
|3.|game|||
|4.|player|||
|5.|hand|✓|<ul><li>cards [2-5]</li></ul>|<ul><li>canDrawCard()</li><li>points()</li><li>blackJack()</li><li>getAces()</li><li>getNonAces()</li><li>check5CardsUnder21()</li><li>checkTriple7()</li></ul>|
|6.|deck|✓|<ul><li>cards [52]</li><li>symbols [♠,♡,♣,♢]</li><li>cardTypes [A-K]</li></ul>|<ul><li>init()</li><li>print()</li><li>shuffle()</li><li>cut()</li><li>draw()</li></ul>|
|7.|card|✓|<ul><li>index (0-51)</li><li>type 🂡 to 🃞</li><li>symbol ♠,♦</li><li>name (Ace of spade)</li></ul>|<ul><li>print()</li><li>isFaceCard()</li><li>isAce()</li><li>isNumeric()</li><li>numericalValue()</li></ul>|

Should player be above game? or game above player?  
A game can have many players. Players can enter or leave game.  
No game, no blackjack. Hence game > player.
## javascript class design
```js
function createCard(cardIndex=-1, cardType='', cardSymbol='') {
  return {    
    name: `${cardType} of ${cardSymbol}`,
    // works
    imgPath: function(){ return this.name },

    // doesn't
    imgPath2: ()=>this.name ,
    // doesn't
    imgPath2: ()=>{ return this.name },
  }  
}
```
I think with the advent of the traditional OO **class** implementation in es6,
It should be used.  
But without it, the cleanest way to write a class object I think would be it to be JSON like format (key/value).  
As opposed to prototyping additional functions e.g.
`Card.prototype.imgPath = function(){}`  
Imagine this repeating for each function.
Not `neat` in my opinion.  
Current task to refactor all class objects from the `prototype` way to the json format.
```js
function hand(){
    return {
      cards:[]
    }
}

function player(){
  hand,
  drawCard: function(){}
}

```
Previously was confused with how to implement C# like events in js.  
Now it seems it can be done with callbacks.  
Passing the function without concern of how it is implemented. And using the callback to pass the parameter.
