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

//	Tested working.
function defaultAlertCaller(message){
  setTimeout(()=>{
    alert(message);
    console.log(message);
  },450);  //  give time for cards to render.
}
