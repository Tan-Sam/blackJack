//  tested working
Array.prototype.shuffle = function() {
  let m = this.length,
    i;
  while (m) {
    i = (Math.random() * m--) >>> 0;
    [this[m], this[i]] = [this[i], this[m]];
  }
  return this;
}

//  tested working
Array.prototype.cut = function(itemsToSliceFromTop) {
  return this.splice(itemsToSliceFromTop).concat(this);
}

//  seems to work. tested few rounds.
//  return for cancelling callbacks.
function defaultAlertCaller(message){
  setTimeout(()=>{
    alert(message);
    console.log(message);
  },450);  //  give time for cards to render.
}
