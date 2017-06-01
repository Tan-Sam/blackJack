/********************
  settings globally used.
    ************************/
var deck = [];
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

  // var playerName = prompt("What is your name?");
  var player = new Player();
  player.name = "Sam James";//playerName;
  player.purseSize = 1200;

  playersArray.push(player);

  var banker = new Player();
  banker.name = "banker";
  banker.purseSize = 3000;
  // banker.hand = new Hand();

  playersArray.push(banker);

  player.nextPlayer = banker;

  // pop deck into players hand.
  initialCardsDrawForAllPlayers();

  if (!banker.isHitBlackJack) {
      commenceGame();
  }
}


function drawCardDisplayEvent(event){
  drawCardAndDisplay(0);
}



function commenceGame(){
    // var currentPlayer = playersArray[i];

    playersArray[0].activateTurn();
    var tDisplay =  displayArray[0];

    tDisplay.addEventListener('click', drawCardDisplayEvent);

    document.addEventListener('keyup',  function(event){
      if (event.key === 'Escape') {
        var activePlayer = playersArray.find((elem)=>{ return elem.isMyTurn; });
        activePlayer.setTurnCompleted();
        if (activePlayer.nextPlayer === null) {
            this.removeEventListener('keyup', arguments.callee);
            console.log('Turns completed. Removed event listener.');
            console.log('Removing mouse click listener on div.');
            tDisplay.removeEventListener('click', drawCardDisplayEvent);
            console.log('Removing mouse click listener from  div.');
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

  var drawCardSuccess = tPlayer.drawCard();

  if (drawCardSuccess) {
    var newDiv = document.createElement('div');
    newDiv.classList.add('card');

    var newImg = document.createElement('img');
    newImg.src = tPlayer.hand.lastCard().imgPath();

    newDiv.appendChild(newImg);
    tPlayerDiv.appendChild(newDiv);
  }
}

document.addEventListener("DOMContentLoaded", ()=>{
  setTimeout(initGame, 1);
});
