function player(name) {
  return {
    name,
    hand: hand(),
    inTurn: false,
    turnCompleted: false,
    jackpot: false,
    activateTurn: function(){
      this.inTurn = true;
    },
    endTurn: function(jackpot){
      this.inTurn = false;
      this.turnCompleted = true;
      if (jackpot) {
        this.jackpot = jackpot;
      }
    },
    drawCard: function(deck){
      return this.hand.drawCard(deck, this.endTurn)
    }
  }
}
