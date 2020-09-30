
function calcula_energia_cinetica(){
  return atoms.map(a=>a.energia_cinetica).sum();
}

//render loop
let ticks=0;
(function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0,0,canvas.width,canvas.height);
  atoms.forEach(a=>a.update());
  ticks++;

  if(ticks%200==0)
    console.log(calcula_energia_cinetica());
})();
