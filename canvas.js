let canvas=document.querySelector('canvas');
canvas.width=window.innerWidth; //1280; //px
canvas.height=window.innerHeight; //800; //px
let ctx=canvas.getContext('2d');

//render loop
let ticks=0; //frames
(function animate(){
  requestAnimationFrame(animate);
  ticks++;

  ctx.clearRect(0,0,canvas.width,canvas.height);
  particules.forEach(p=>p.update());
  //particules.sort((a,b)=>b.r.z-a.r.z);

  if(ticks%500==0){
    let energia_cinetica  = particules.map(p=>p.energia_cinetica).sum();
    let energia_potencial = particules.map(p=>p.energia_potencial_electrica).sum();
    let energia_total     = energia_cinetica + energia_potencial;
    console.log({energia_total});
  }
})();
