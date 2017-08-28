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
Because, this isn't using react/redux,  
there isn't a single source of truth.  Hence need to chain everything up.
Which gets messy quickly. Hence my strategy is to build the code,
from the bottom functionality up. In the following order(high to low):
1. main
2. domHandler
3. player
4. game    
5. hand
6. card
