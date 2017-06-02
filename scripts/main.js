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
  document.getElementsByClassName('playerDiv')[0],
  document.getElementsByClassName('bankerDiv')[0],
];

//  indexing doesn't work.
// var displayArray = {};
// displayArray.playerDiv = document.getElementsByClassName('playerDiv')[0];
// displayArray.bankerDiv = document.getElementsByClassName('bankerDiv')[0];

function initGame() {

  initDeck();

  //  init players
  // var playerName = prompt("What is your name?");
  var player = new Player();
  player.name = "Some player"; //playerName;
  player.purseSize = 1200;
  playersArray.push(player);

  var banker = new Player();
  banker.name = "banker";
  banker.purseSize = 3000;
  playersArray.push(banker);

  player.nextPlayer = banker;

  // pop deck into players hand.
  initialCardsDrawForAllPlayers();

  if (!banker.hand.isHitBlackJack &&
    !player.hand.isHitBlackJack) {
    commenceGame();

  } else if (banker.hand.isHitBlackJack &&
    player.hand.isHitBlackJack) {
    callDimmer(3);
    defaultAlertCaller('Game draw. All both players black jack');

  } else if (banker.hand.isHitBlackJack &&
    !player.hand.isHitBlackJack) {
    callDimmer(2);
    defaultAlertCaller(playersArray[1].name + ' wins. Black Jack.\n');

  }
  else if (!banker.hand.isHitBlackJack &&
  player.hand.isHitBlackJack) {
  callDimmer(1);
  defaultAlertCaller(playersArray[0].name + ' wins. Black Jack.\n');

}
}

function drawCardDisplayEvent(event) {
  var eventSource = event.target;
  var eventSourceIndex = displayArray.indexOf(eventSource);

  var sourcePlayer = playersArray[eventSourceIndex];

  if (sourcePlayer.hand.isHitBlackJack) {
    if (sourcePlayer.nextPlayer === null) {
        callDimmer(2);
        return;
    }


  }

  var playerIndex = playersArray.indexOf(sourcePlayer);

  var isPlayersTurn = sourcePlayer.isMyTurn;
  var isPlayersTurnCompleted = sourcePlayer.isTurnCompleted;

  if (isPlayersTurn) {
    drawCardAndDisplay(playerIndex);
  } else if (isPlayersTurnCompleted) {
    console.log(sourcePlayer.name + '\'s turn is over. Please wait for next game.');
  } else { //  haven't reach turn yet.
    console.log('Not yet ' + sourcePlayer.name + '\'s turn. Please wait.');
  }
}

function commenceGame() {


  var spanText = document.createTextNode(playersArray[0].name);
  var newSpan = document.createElement('span');
  newSpan.appendChild(spanText);
  newSpan.classList.add('playerSpan');
  displayArray[0].insertAdjacentElement('afterend', newSpan);

  spanText = document.createTextNode(playersArray[1].name);
  newSpan = document.createElement('span');
  newSpan.appendChild(spanText);
  newSpan.classList.add('bankerSpan');

  displayArray[1].insertAdjacentElement('beforebegin', newSpan);

  for (var i = 0; i < 2; i++) {
    displayArray[i].addEventListener('click', drawCardDisplayEvent);
  }

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

function callDimmer(status) {



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

  // switch (status) {
  //   case 1: finmsg = m1; break;
  //   case 2: finmsg = m2; break;
  //   case 3: finmsg = m3; break;
  //   default:
  //     break;
  // }

  var someTxt = document.createTextNode(finmsg);

  var sp2 = document.createElement('span');
  sp2.appendChild(someTxt);
  sp2.classList.add('xx2');

  var sd = document.createElement('div');
  sd.appendChild(sp2);

  dimmer.appendChild(sd);


  console.log('Dimmer added.');
}

function initialCardsDrawForAllPlayers() {
  //  2 cards
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

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(initGame, 1);
});
