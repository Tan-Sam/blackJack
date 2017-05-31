
//  bankers push last
var playersArray = [];

var displayArray =
[
  document.getElementsByClassName('playerDiv')[0],
  document.getElementsByClassName('bankerDiv')[0],
];

//  indexing doesn't work.
// var displayArray = {};
// displayArray.playerDiv = document.getElementsByClassName('playerDiv')[0];
// displayArray.bankerDiv = document.getElementsByClassName('bankerDiv')[0];

function initGame(){

  initDeck();

  //  init players

  var player = new Player();
  player.name = "sam james";
  player.purseSize = 1200;

  playersArray.push(player);




  var banker = new Player();
  banker.name = "banker";
  banker.purseSize = 3000;

  playersArray.push(banker);

  player.nextPlayer = banker;


  // pop deck into players hand.
  initialCardsDrawForAllPlayers();

  if (!banker.isHitBlackJack) {
      commenceGame();
  }

  // draw 5 cards test
  // var draws = 3;
  // do {
  //   player.draw();
  // } while (--draws > 0);
}

function commenceGame(){
    // var currentPlayer = playersArray[i];

    playersArray[0].activateTurn();

    document.addEventListener('keyup',  function(event){
      if (event.key === 'Escape') {
        var activePlayer = playersArray.find((elem)=>{ return elem.isMyTurn; });
        activePlayer.setTurnCompleted();
        if (activePlayer.nextPlayer === null) {
            this.removeEventListener('keyup', arguments.callee);
            console.log('Turns completed. Removed event listener.');
        }
      }
    });
}

function initialCardsDrawForAllPlayers(){
  //  2 cards
  for (var i = 0; i < 2; i++) {   //  all players 1 card each
    for (var j = 0; j < playersArray.length; j++) {
      drawCardAndDisplay(j);
    }
  }
}

function drawCardAndDisplay(playerIndex){
  var tPlayer = playersArray[playerIndex];
  var tPlayerDiv = displayArray[playerIndex];

  tPlayer.drawCard();

  var newDiv = document.createElement('div');
  newDiv.classList.add('card');

  var newImg = document.createElement('img');
  newImg.src = tPlayer.lastCard().imgPath();

  newDiv.appendChild(newImg);
  tPlayerDiv.appendChild(newDiv);
}

document.addEventListener("DOMContentLoaded", ()=>{
  setTimeout(initGame, 1);
});
