// clockWise: player on baker's left starts first.
// counterClockWise: player on baker's right starts first.

// evaluate results after each player draw

function Game(){
    this.players = [];
    this.score = null;
    this.deck = [];
}

Game.prototype.commence = function(){
  displayArray.forEach((elem)=>{
    elem.addEventListener('click',
      this.drawCardAndDisplay(displayArray.indexOf(elem.target)));
  });

  document.addEventListener('keyup',function(e){
    if (e.key === 'Escape') {
      var activePlayer = game.players.find((player)=>{
        return player.isMyTurn;
      });

      activePlayer.setTurnCompleted();

      if (activePlayer.nextPlayer === null) {
        this.end();
      }
    }
  });

  setTimeout(this.players[0].activateTurn(),450);
}

Game.prototype.checkBlackJack = function()
{
  var result = false;

  var blackJackResults = this.checkForBlackJackHits();

  var blackJackHits = [];
  this.players.forEach((player, playerIndex)=>{
    if (player.blackJack()) {
      blackJackHits.push({name:player.Name, index:playerIndex});
    }
  });

  return (blackJackHits.length > 0)? blackJackHits : false;


  if (blackJackResults) {
    result = true;

    var alertMsg = (blackJackResults.length === 2)?
                    'game draw. both players black jack.':
                    blackJackResults.name + ' has hit black jack'
    alert(alertMsg);
  }

  return result;
}

Game.prototype.initialDraw = function()
{debugger;
  for (var cardsToDraw = 1; cardsToDraw <= 2; cardsToDraw++) {
    for (var playerIndex = 0; playerIndex < this.players.length; playerIndex++) {
      this.drawCardAndDisplay(playerIndex);
    }
  }
}

Game.prototype.start = () => {
  initDeck();
  this.addPlayersManually();
  this.initialDraw();
  var blackJack = this.checkBlackJack();
  if (blackJack) {
    this.end();
  }
  else {
    this.commence();
  }
}

Game.prototype.addPlayersManually = function()
{

  let playerinfo = [{name:"Some Player", purseSize: 1200},
                    {name:"Banker", purseSize: 3000}];
  playerinfo.forEach(el=>{
    this.players.push(el)
  })

  this.players[0].displayDiv = document.querySelector('.player');
  this.players[1].displayDiv = document.querySelector('.banker');

  this.players[0].nextPlayer = this.players[1];
}




Game.prototype.drawCard = (playerIndex) => {
  var result = false;
  try {
    let player = this.players[playerIndex];
    if (player) {
      if (player.canDrawCard()) {
        player.hand.push(this.deck.pop());
        result = true;
      }
    }
  } catch (e) {
    console.error(`game.drawCard()\n${e}`);
  }
  return result;
}

Game.prototype.checkForBlackJackHits = function(){
    var blackJackHits = [];
    this.players.forEach((player, playerIndex)=>{
      if (player.blackJack()) {
        blackJackHits.push({name:player.Name, index:playerIndex});
      }
    });

    return (blackJackHits.length > 0)? blackJackHits : false;
}

Game.prototype.end = function(){
  callDimmer();
}
