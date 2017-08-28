let playerElement = document.querySelector('.player');
let bankerElement = document.querySelector('.banker');

let playerElements = ['.player','.banker'].map(el=>document.querySelector(el));


let initResetDOM = ()=>{
  playerElements.forEach(el=>{
      while (el.firstChild) {
        el.removeChild(el.firstChild);
      }
  })

  // draw cards
  //


  // add event listener for click
  //
  playerElements.forEach(el=>el.addEventListener('click',drawCard))

  // add event listener for end turn
  document.addEventListener('keyup',()=>endTurn);
}

function endTurn(e){
  console.log(`end turn: ${e.key}`);
}

function drawCard(e){
  console.log(`drawCard: ${e.target}`);
}
