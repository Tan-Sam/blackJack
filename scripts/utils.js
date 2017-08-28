//  tested working
Array.prototype.cut = function(itemsToSliceFromTop) {
  return this.splice(itemsToSliceFromTop).concat(this);
}

//	Tested working.
function defaultAlertCaller(message){
  setTimeout(()=>{
    alert(message);
    console.log(message);
  },450);  //  give time for cards to render.
}
