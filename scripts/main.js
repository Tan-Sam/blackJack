function someFunction(){
  initNumbersArray();
  initDeck();
  deck.forEach((e)=>console.log(e.cardName));
}




$(document).ready(()=>{
    setTimeout(someFunction, 1500);
});
