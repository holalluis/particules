let canvas=document.querySelector('canvas');
canvas.width=window.innerWidth; //1280; //px
canvas.height=window.innerHeight; //800; //px
let c=canvas.getContext('2d');

//render loop
let ticks=0; //temps
(function animate(){
  requestAnimationFrame(animate);
  ticks++;

  c.clearRect(0,0,canvas.width,canvas.height);
  atoms.forEach(a=>a.update());

  if(ticks%200==0){
    let energia_cinetica_total  = atoms.map(a=>a.energia_cinetica).sum();
    let energia_potencial_total = atoms.map(a=>a.energia_potencial).sum();
    let energia_total           = energia_cinetica_total + energia_potencial_total;
    console.log({energia_total});
  }
})();
