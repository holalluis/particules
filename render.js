//render loop
let ticks=0; //frames renderitzats
let play=true;
(function anima(){

  requestAnimationFrame(anima); //loop renderització

  //clear canvas
  ctx.clearRect(0,0,canvas.width,canvas.height);

  //dibuixa eixos x y z
  (function(){
    ctx.strokeStyle="black";
    ctx.fillStyle="black";

    //eix x
    ctx.beginPath();
    ctx.moveTo(...calcula_punt_canvas( 10,0,0));
    ctx.lineTo(...calcula_punt_canvas(-10,0,0));
    ctx.stroke();
    ctx.closePath();

    //eix y
    ctx.beginPath();
    ctx.moveTo(...calcula_punt_canvas(0, 10,0));
    ctx.lineTo(...calcula_punt_canvas(0,-10,0));
    ctx.stroke();
    ctx.closePath();

    //eix z
    ctx.beginPath();
    ctx.moveTo(...calcula_punt_canvas(0,0, 10));
    ctx.lineTo(...calcula_punt_canvas(0,0,-10));
    ctx.stroke();
    ctx.closePath();

    //dibuixa un cub
    ctx.beginPath();
    ctx.strokeStyle='red';

    ctx.moveTo(...calcula_punt_canvas(-10,-10,-10));
    ctx.lineTo(...calcula_punt_canvas(10,-10,-10));
    ctx.lineTo(...calcula_punt_canvas(10,-10,10));
    ctx.lineTo(...calcula_punt_canvas(-10,-10,10));
    ctx.lineTo(...calcula_punt_canvas(-10,-10,-10));

    ctx.moveTo(...calcula_punt_canvas(-10,10,-10));
    ctx.lineTo(...calcula_punt_canvas(10,10,-10));
    ctx.lineTo(...calcula_punt_canvas(10,10,10));
    ctx.lineTo(...calcula_punt_canvas(-10,10,10));
    ctx.lineTo(...calcula_punt_canvas(-10,10,-10));

    ctx.moveTo(...calcula_punt_canvas(-10,-10,-10));
    ctx.lineTo(...calcula_punt_canvas(-10,10,-10));

    ctx.moveTo(...calcula_punt_canvas(-10,-10,10));
    ctx.lineTo(...calcula_punt_canvas(-10,10,10));

    ctx.moveTo(...calcula_punt_canvas(10,-10,-10));
    ctx.lineTo(...calcula_punt_canvas(10,10,-10));

    ctx.moveTo(...calcula_punt_canvas(10,-10,10));
    ctx.lineTo(...calcula_punt_canvas(10,10,10));

    ctx.stroke();
    ctx.closePath();

    for(let i=-10;i<=10;i++){
      if(i==0) continue;
      let p0 = calcula_punt_canvas(i, 0.1,0);
      let p1 = calcula_punt_canvas(i,-0.1,0);
      ctx.beginPath();
      ctx.strokeStyle='black';
      ctx.moveTo(...p0);
      ctx.lineTo(...p1);
      ctx.stroke();
      let text=`(${i},0,0)`;
      let m = ctx.measureText(text);
      ctx.fillText(text, p1[0]-m.width/2, p1[1]+6);
      ctx.closePath();
    }
    for(let i=-10;i<=10;i++){
      if(i==0) continue;
      let p0 = calcula_punt_canvas( 0.1,i,0);
      let p1 = calcula_punt_canvas(-0.1,i,0);
      ctx.beginPath();
      ctx.moveTo(...p0);
      ctx.lineTo(...p1);
      ctx.stroke();
      let text=`(0,${i},0)`;
      let m = ctx.measureText(text);
      ctx.fillText(text, p1[0]-m.width, p1[1]+6);
      ctx.closePath();
    }
    for(let i=-10;i<=10;i++){
      if(i==0) continue;
      let p0 = calcula_punt_canvas( 0.1,0,i);
      let p1 = calcula_punt_canvas(-0.1,0,i);
      ctx.beginPath();
      ctx.moveTo(...p0);
      ctx.lineTo(...p1);
      ctx.stroke();
      let text=`(0,0,${i})`;
      let m = ctx.measureText(text);
      ctx.fillText(text, p1[0]-m.width, p1[1]+6);
      ctx.closePath();
    }
  })();

  //actualitza estat i redibuixa cada partícula
  particules.forEach(p=>{
    p.update();
  });

  //mostra logs
  if(ticks%100==0){
    //suma energia cinètica totes les partícules
    dom.Ec_total.innerHTML = particules.map(p=>p.energia_cinetica).sum().toExponential(2);
    //busca la partícula amb la velocitat més alta
    dom.v_max.innerHTML = Math.max(...particules.map(p=>p.v.length)).toExponential(2);
  }

  ticks++; //seguent frame
})();
