//render loop
let ticks=0; //frames renderitzats
(function anima(){
  requestAnimationFrame(anima); //loop renderització

  //clear canvas
  ctx.clearRect(0,0,canvas.width,canvas.height);

  //actualitza estat i redibuixa cada partícula
  particules.forEach(p=>{
    p.update();
  });

  //mostrar logs
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
