let canvas=document.querySelector('canvas'); //agafa element <canvas> del DOM
let ctx=canvas.getContext('2d'); //agafa objecte "context" del canvas

//set dimensions canvas
canvas.width=window.innerWidth; //1280; //px
canvas.height=800; //px

//render loop
let ticks=0; //frames
(function animate(){
  requestAnimationFrame(animate); //loop renderització

  //clear canvas
  ctx.clearRect(0,0,canvas.width,canvas.height);

  //renderitza cada partícula
  particules.forEach(p=>p.update());

  //logs
  if(false&& ticks%500==0){
    console.info({
      //suma energia cinètica totes les partícules
      suma_energia_cinetica: particules.map(p=>p.energia_cinetica).sum().toExponential(2),

      //busca la partícula amb la velocitat més alta
      max_velocitat: Math.max(...particules.map(p=>p.v.length)).toExponential(2),
    });
  }

  ticks++; //seguent frame
})();
