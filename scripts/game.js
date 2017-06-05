const flowDirection = { clockWise:1, counterClockWise:-1};
  // clockWise: player on baker's left starts first.
  // counterClockWise: player on baker's right starts first.

var gameDirection = flowDirection.counterClockWise;

// evaluate results after each player draw


function Game()
{
    this.players = [];
}

Game.prototype.addPlayers = function(playerJsonObject)
{
  this.players.push(playerJsonObject);
}

Game.prototype.commence = function()
{
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
{
  for (var cardsToDraw = 1; cardsToDraw <= 2; cardsToDraw++) {
    for (var playerIndex = 0; playerIndex < this.players.length; playerIndex++) {
      this.drawCardAndDisplay(playerIndex);
    }
  }
}

Game.prototype.initializeGame = function()
{
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
  // var playerName = prompt("What is your name?");
  var player = new Player({name:"Some Player", purseSize: 1200,});
  this.players.push(player);

  player.displayDiv = document.querySelector('.player');

  var banker = new Player({name:"Banker", purseSize: 3000,});
  this.players.push(banker);

  banker.displayDiv = document.querySelector('.banker');

  player.nextPlayer = banker;
}

Game.prototype.drawCardAndDisplay = function(playerIndex)
{
  var result = false;
  try {
    var cardDrawn = game.players[playerIndex].drawCard();
    if (cardDrawn) {
      var newCardDiv = document.createElement('div');
      newCardDiv.classList.add('card');

      var newImg = document.createElement('img');
      newImg.src = cardDrawn.imgPath();
      newCardDiv.appendChild(newImg);

      displayArray[playerIndex].appendChild(newCardDiv);
      result = true;
    }
  } catch (e) {
    console.log("Error in Game.drawCardAndDisplay()\n " + e);
  }
  return result;
}

Game.prototype.checkForBlackJackHits = function()
{
    var blackJackHits = [];
    this.players.forEach((player, playerIndex)=>{
      if (player.hasHitBlackJack()) {
        blackJackHits.push({name:player.Name, index:playerIndex});
      }
    });

    return (blackJackHits.length > 0)? blackJackHits : false;
}

Game.prototype.end = function()
{
  callDimmer();
}



// function initGame() {
//
//
//   initialCardsDrawForAllPlayers();
//
//   if (!banker.hand.isHitBlackJack &&
//     !player.hand.isHitBlackJack) {
//     commenceGame();
//
//   } else if (banker.hand.isHitBlackJack &&
//     player.hand.isHitBlackJack) {
//     callDimmer(3);
//     defaultAlertCaller('Game draw. All both players black jack');
//
//   } else if (banker.hand.isHitBlackJack &&
//     !player.hand.isHitBlackJack) {
//     callDimmer(2);
//     defaultAlertCaller(playersArray[1].name + ' wins. Black Jack.\n');
//
//   }
//   else if (!banker.hand.isHitBlackJack &&
//             player.hand.isHitBlackJack) {
//             callDimmer(1);
//             defaultAlertCaller(playersArray[0].name + ' wins. Black Jack.\n');
//   }
// }
