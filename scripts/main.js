var player1wins = false;
var player2wins = false;
var playersDraw = false;

/********************
  settings globally used.
    ************************/
var deck = [];
//  bankers push last
var playersArray = [];

var displayArray = [
  document.querySelector('.player'),
  document.querySelector('.banker'),
];

function commenceGame() {
debugger;
  displayArray.forEach(el=>{
    el.addEventListener('click', drawCardDisplayEvent);
  })


  document.addEventListener('keyup', function(event) {
    if (event.key === 'Escape') {
      var activePlayer = playersArray.find((elem) => {
        return elem.isMyTurn;
      });
      activePlayer.setTurnCompleted();

      if (activePlayer.nextPlayer === null) {
        this.removeEventListener('keyup', arguments.callee);
        console.log('Turns completed. Removed event listener.');

        console.log('Removing mouse click listener on div.');
        for (var i = 0; i < 2; i++) {
          displayArray[i].removeEventListener('click', drawCardDisplayEvent);
        }
        console.log('Removed mouse click listener from  div.');
        callDimmer();
      }
    }
  });

  setTimeout(playersArray[0].activateTurn(), 250);
}

function callDimmer() {
  console.log('Adding dimmer.');
  var dimmer = document.createElement('div');
  dimmer.setAttribute('id', 'dimmer');
  document.querySelector('body').insertAdjacentElement('afterbegin', dimmer);
  var endSpan = document.createElement('span');
  endSpan.classList.add('endSpan');

  endSpan.innerText = "End";

  var m1 = playersArray[0].name + " wins";
  var m2 = playersArray[1].name + " wins";
  var m3 = "draw";


  dimmer.appendChild(endSpan);
  // dimmer.appendChild(endSpan);

  var finmsg;
  if (playersDraw) {
    finmsg = m3;
  }
  else if (player1wins) {
    finmsg = m1;
  }
  else if (player2wins) {
    finmsg = m2;
  }

  var someTxt = document.createTextNode(finmsg);

  var sp2 = document.createElement('span');
  sp2.appendChild(someTxt);
  sp2.classList.add('xx2');

  var sd = document.createElement('div');
  sd.appendChild(sp2);

  dimmer.appendChild(sd);


  console.log('Dimmer added.');

  setInterval(function(){ if(dimmer.visibility === 'hidden'){
      dimmer.visibility = 'visible';
  }
  else {
      dimmer.visibility = 'hidden';
  }},3000);
}

function initialCardsDrawForAllPlayers() {  //  2 cards
  for (var i = 0; i < 2; i++) { //  all players 1 card each
    for (var j = 0; j < playersArray.length; j++) {
      drawCardAndDisplay(j);
    }
  }
}

function drawCardAndDisplay(playerIndex) {
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

var game;
function initGame(){
  game = new Game();
  game.initializeGame();
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(initGame, 1);
});
