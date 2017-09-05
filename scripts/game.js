function game(){
  return {
    players: [],
    score: null,
    deck: deck().init().shuffle(),
    addPlayers: function(players=["some","banker"]){
      players.forEach(pl=>{
        this.players.push(player(pl))
      })
    },
    start: function(){
      // initial draw of 2 cards
      for (var i = 0; i < 2; i++) {
        this.players.forEach(p=>{
          p.drawCard(this.deck)
        })
      }
      // blackjack check after initial draw
      this.players.forEach(p=>{
        if (p.jackpot) {
          console.log(`${p.name} hit ${p.jackpot}!`);
        }
      })
      // start game with first player
      // add callback for drawcard or end turn event
      //
      this.players.forEach(p=>{
        p.activateTurn();
        while (p.inTurn) {
          p.drawCard(this.deck)
        }
      })
    },
    test: function(){
      this.players.push(player())
      let x = this.players[0]
      let dc = x.drawCard()
      if (dc) {
        let c = this.deck.init().drawCard();
        dc(c)
      }
    }
  }
}
