const cardTemplateName = "../Vector-Playing-Cards/cards-svg/{{cardName}}.svg";
const cardNameReplacer = /{{cardName}}/;

function someFunction(){
  initNumbersArray();
  initDeck();
  // deck.forEach((e)=>console.log(e.cardName));

  //  init players
  var banker = new Player();
  banker.name = "banker";
  banker.purseSize = 3000;

  var player = new Player();
  player.name = "Some_player";
  player.purseSize = 1200;

  // pop deck into players hand.
  for (var i = 0; i < 2; i++) {
    player.draw();
    banker.draw();
  }

  // display
  var playerDiv = document.querySelectorAll('.playerDiv')[0];
  var bankerDiv = document.querySelectorAll('.bankerDiv')[0];

  playerDiv.firstElementChild.firstElementChild.src =
  cardTemplateName.replace(cardNameReplacer, player.hand[0].cardSVGname());

  bankerDiv.firstElementChild.firstElementChild.src =
  cardTemplateName.replace(cardNameReplacer, banker.hand[0].cardSVGname());

  playerDiv.lastElementChild.firstElementChild.src =
  cardTemplateName.replace(cardNameReplacer, player.hand[1].cardSVGname());

  bankerDiv.lastElementChild.firstElementChild.src =
  cardTemplateName.replace(cardNameReplacer, banker.hand[1].cardSVGname());
}

function drawCard(e){

  console.log(e.srcElement.className + ' draw card event success.');
}

document.addEventListener("DOMContentLoaded", ()=>{
  setTimeout(someFunction, 1);
  document.getElementsByClassName('playerDiv')[0].addEventListener('click', drawCard);
  document.getElementsByClassName('bankerDiv')[0].addEventListener('click', drawCard);
});
