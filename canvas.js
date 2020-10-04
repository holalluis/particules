let canvas=document.querySelector('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let c=canvas.getContext('2d');

function calcula_energia_cinetica_mitjana(){
  return atoms.map(a=>a.energia_cinetica).sum()/atoms.length;
}

//render loop
let ticks=0;
(function animate(){
  requestAnimationFrame(animate);
  ticks++;

  c.clearRect(0,0,canvas.width,canvas.height);
  atoms.forEach(a=>a.update());

  if(ticks%200==0){
    console.log(calcula_energia_cinetica_mitjana());
  }
})();
