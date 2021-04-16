class Particula{
  constructor(x,y,z,radi,massa,carrega){
    //magnituds escalars
    this.massa   = massa||0;   //kilograms
    this.carrega = carrega||0; //coulombs
    this.radi    = radi||0;    //metres
    this.spin    = 0;          //spin TODO

    //magnituds vectorials
    this.r = new Vector(x||0, y||0, z||0); //posició (m)
    this.v = new Vector(0,0,0); //velocitat (m/s)
    this.a = new Vector(0,0,0); //acceleració (m/s^2)
    this.F = new Vector(0,0,0); //suma de forces rebudes (N)

    //propietats descriptives (no físiques)
    this.simbol=""; //string
    this.color=(function(q){
      if(q==0){return "rgba(  0,   0, 255, 0.5)"}
      if(q<0 ){return "rgba(255,   0,   0, 0.5)"}
      if(q>0 ){return "rgba(255, 255, 255, 0.5)"}
    })(this.carrega);
  }

  //calcula totes les forces rebudes
  //elèctriques, magnètiques i gravitatòria
  update_forces(){ //->Void
    //forces elèctriques rebudes de les altres partícules
    //cada altra càrrega t'empeny o t'estira
    let forces_electriques = particules.map(P=>{
      return this.força_electrica(P); //Vector
    });

    //forçes magnètiques rebudes de les altres partícules
    let forces_magnetiques = particules.map(P=>{
      return this.força_magnetica(P); //Vector
    });

    //forces protó-neutró
    let forces_nuclears_fortes = particules.map(P=>{
      return this.força_nuclear_forta(P); //Vector
    });

    //força de la gravetat de la Terra
    let gravetat = this.força_gravetat();

    //agrupa totes les forces
    let forces = [
      ...forces_electriques,
      ...forces_magnetiques,
      ...forces_nuclears_fortes,
      gravetat,
    ]; //array de vectors

    //suma totes les forces (suma tots els vectors)
    let F = this.F;
    F.x = forces.map(f=>f.x).sum();
    F.y = forces.map(f=>f.y).sum();
    F.z = forces.map(f=>f.z).sum();
  }

  //calcula acceleració: a=F/m (vector)
  /*
    nota: si la partícula no té massa no tindrà acceleració, es mourà a la
    velocitat de la llum
  */
  update_acceleracio(){ //->Void
    let m = this.massa; //massa (kg)
    let a = this.a; //acceleració (vector)
    let F = this.F; //suma de forces (vector)
    a.x = F.x/m||0;
    a.y = F.y/m||0;
    a.z = F.z/m||0;
  }

  //calcula velocitat partícula
  //v = v0 + a
  update_velocitat(){ //->Void
    let vel = this.v; //velocitat (vector)
    let acc = this.a; //acceleració (vector)
    vel.x += acc.x;
    vel.y += acc.y;
    vel.z += acc.z;

    //comprova que la partícula no passi de la velocitat de la llum
    let v = vel.length;
    if(v>c){
      let rao = c/v;
      vel.x *= rao;
      vel.y *= rao;
      vel.z *= rao;
    }
  }

  //calcula posició partícula
  //x = x0 + v
  update_posicio(){ //->Void
    let pos = this.r;
    let vel = this.v;
    pos.x += vel.x;
    pos.y += vel.y;
    pos.z += vel.z;
  }

  //calcula xocs amb altres partícula o parets
  update_colisions(){ //->Void
    let pos  = this.r;
    let vel  = this.v;
    let R    = this.radi;
    //col·lisió amb parets
    if(pos.x < -10 ){ vel.x=+Math.abs(vel.x); pos.x=-10; } //xoc vs paret esquerra
    if(pos.x > +10 ){ vel.x=-Math.abs(vel.x); pos.x= 10; } //xoc vs paret dreta
    if(pos.y < -10 ){ vel.y=+Math.abs(vel.y); pos.y=-10; } //xoc vs sostre
    if(pos.y > +10 ){ vel.y=-Math.abs(vel.y); pos.y= 10; } //xoc vs terra
    if(pos.z < -10 ){ vel.z=+Math.abs(vel.z); pos.z=-10; } //xoc vs pantalla
    if(pos.z > +10 ){ vel.z=-Math.abs(vel.z); pos.z= 10; } //xoc vs fons
  }

  //update tot
  update(){ //->Void
    if(play){
      this.update_forces();
      this.update_acceleracio();
      this.update_velocitat();
      this.update_posicio();
      this.update_colisions();
    }
    this.dibuixa();
  }

  //calcula quantitat de moviment "p" (vector)
  //p = m·v
  /*
  get quantitat_de_moviment(){
    let m = this.massa;
    return this.v.multiplica(m);
  }
  */

  //calcula quin camp elèctric (E) genera la partícula a un punt P
  //E = K·q/r^2*u
  camp_electric(P){ //-> Vector
    let q   = this.carrega; //C
    let vec = new Vector(P.x-this.r.x, P.y-this.r.y, P.z-this.r.z); //Vector fins al punt P
    let r   = vec.length; //distància fins al punt P
    if(r<this.radi) return new Vector(0,0,0);
    let uni = vec.normalitza(); //Vector
    let E   = uni.multiplica( K*q/(r*r) ); //Vector
    return E;
  }

  //calcula quina força elèctrica rep de la partícula p
  //F = q·E
  força_electrica(p){ //->Vector
    let E = p.camp_electric(this.r); //camp elèctric que genera la partícula p
    let F = E.multiplica(this.carrega); //força (Vector)
    return F;
  }

  //calcula quin camp magnètic (B) genera la partícula a un punt P
  //B = (μ0/4π)·q(v x u)/r^2
  camp_magnetic(P){ //->Vector
    let q   = this.carrega; //C
    let vel = this.v; //velocitat partícula actual
    let vec = new Vector(P.x-this.r.x, P.y-this.r.y, P.z-this.r.z); //Vector fins al punt P
    let r   = vec.length; //distància fins al punt P
    if(r==0) return new Vector(0,0,0);
    let uni = vec.normalitza(); //Vector
    let B   = vel.producte_vectorial(uni).multiplica( μ0/(4*π)*q/(r*r)); //Vector
    return B;
  }

  //calcula quina força magnètica rep de la partícula p
  //F = q·(v x B)
  força_magnetica(p){ //->Vector
    let B   = p.camp_magnetic(this.r); //camp magnètic que genera la partícula p
    let vel = this.v; //velocitat (vector)
    let F   = vel.producte_vectorial(B).multiplica(this.carrega); //força (Vector)
    return F;
  }

  //calcula quina força rep de la gravetat
  força_gravetat(){ //->Vector
    //l'eix y a la pantalla va de dalt a baix, per tant g és positiu
    return new Vector(0,this.massa*g,0);
  }

  //calcula quina força nuclear forta rep de la partícula P
  //F = ?
  força_nuclear_forta(par){ //->Vector
    //TODO
    return new Vector(0,0,0);

    if(par==this) return new Vector(0,0,0);

    if(
      this.constructor!=Proto &&
      this.constructor!=Neutro
    ){
      return new Vector(0,0,0);
    }

    if(
      par.constructor!=Proto &&
      par.constructor!=Neutro
    ){
      return new Vector(0,0,0);
    }

    let vec = new Vector(par.r.x-this.r.x, par.r.y-this.r.y, par.r.z-this.r.z); //vector cap a la partícula
    let r   = vec.length; //distància fins al punt P

    if(r>1e-15) return new Vector(0,0,0);

    //console.log(vec.x, vec.y, vec.z);
    let uni = vec.normalitza(); //Vector
    let F   = uni.multiplica(1); //Vector
    //console.log(`${this.simbol} rep força nuclear de ${par.simbol}: (${F.x},${F.y},${F.z})`);
    return F;
  }

  //energia cinètica
  //E = (m·v^2)/2
  get energia_cinetica(){
    let m = this.massa;
    let v = this.v.length; //velocitat
    return m*(v*v)/2;
  }

  //canvi energia cinètica => canvi velocitat
  set energia_cinetica(nou_valor){
    let Ec = nou_valor; //energia cinètica (J)
    let m  = this.massa; //massa (kg)

    //velocitat inicial i final
    let v0 = this.v.length; //magnitud
    let v1 = Math.sqrt(2*Ec/m); //magnitud
    let rao = v1/v0;

    //modifica vector velocitat
    let vel = this.v;
    vel.x *= rao;
    vel.y *= rao;
    vel.z *= rao;
  }

  //energia potencial deguda a la resta de partícules
  //Ep = V*q
  get energia_potencial_electrica(){
    let V = K * particules.map(P=>{
      let vec = new Vector(P.x-this.r.x, P.y-this.r.y, P.z-this.r.z); //Vector fins al punt P
      let r   = vec.length; //distància fins al punt P
      if(r==0) return 0;
      let q   = P.carrega;
      return q/r;
    }).sum();
    let q = this.carrega;
    let Ep = V*q;
    return Ep;
  }

  //energia deguda a la massa
  //E=m·c^2
  /*
  get energia_massa(){
    let m = this.massa;
    return m*c*c;
  }
  */

  //longitud d'ona de l'ona associada al moviment de la partícula
  /*
  get longitud_ona(){
    let m = this.massa;
    return h/(m*c);
  }
  */

  //dibuixa partícula al canvas
  dibuixa(){
    let x = this.r.x;
    let y = this.r.y;
    let z = this.r.z;
    let R = this.radi;

    //calcula punt canvas posició partícula
    let punt_canvas = calcula_punt_canvas(x,y,z);
    let X = punt_canvas[0];
    let Y = punt_canvas[1];

    //un punt a la superficie de l'esfera
    let punt_superficie = calcula_punt_canvas(x+R,y,z);
    let XR = punt_superficie[0];
    let YR = punt_superficie[1];
    let llargada_radi = Math.sqrt(Math.pow(XR-X,2) + Math.pow(YR-Y,2));

    //centre partícula
    //TODO com determinar llargada radi al canvas?
    ctx.beginPath()
    ctx.fillStyle=this.color;
    ctx.arc(X,Y,llargada_radi,0,2*Math.PI);
    ctx.fill();
    ctx.closePath()

    //superfície de la partícula TODO
    /*
    for(let i=0; i<360; i++){
      let dx = R-2*R*Math.random();
      let dy = R-2*R*Math.random();
      let dz = 0;//R-2*R*Math.random();
      ctx.fillRect(...calcula_punt_canvas(x+dx,y+dy,z+dz), 2, 2);
    }
    */

    /*textos sobre la partícula*/
    ctx.font='bold 10px Arial';
    ctx.fillStyle="blue";

    //text símbol
    let text=`${this.simbol}`;
    let m = ctx.measureText(text);
    ctx.fillText(text, X-m.width/2, Y-5);

    //text posició
    let decimals = 0;
    text=`(${x.toFixed(decimals)},${y.toFixed(decimals)},${z.toFixed(decimals)})`;
    m = ctx.measureText(text);
    ctx.fillText(text, X-m.width/2, Y+5);

    //dibuixa vector velocitat
    /*
    let vel = this.v;
    ctx.beginPath();
    ctx.strokeStyle="orange";
    ctx.moveTo(X,Y);
    ctx.lineTo(...calcula_punt_canvas(x+vel.x, y+vel.y, z+vel.z));
    ctx.stroke();
    ctx.closePath();
    */

    //dibuixa vector posició
    /*
    ctx.beginPath();
    ctx.strokeStyle='green';
    ctx.moveTo(...calcula_punt_canvas(0,0,0));
    ctx.lineTo(X,Y);
    ctx.stroke();
    ctx.closePath();
    */
  }
}

//array totes les partícules
let particules=[];
