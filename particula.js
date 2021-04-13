class Particula{
  constructor(x,y,z,radi,massa,carrega){
    //magnituds escalars
    this.massa   = massa||0;   //kilograms
    this.carrega = carrega||0; //coulombs
    this.radi    = radi||0;    //metres
    this.spin    = 0;          //spin TODO

    //magnituds vectorials
    this.r = new Vector(x,y,z); //posició (m)
    this.v = new Vector(0,0,0); //velocitat (m/s)
    this.a = new Vector(0,0,0); //acceleració (m/s^2)
    this.F = new Vector(0,0,0); //suma de forces rebudes (N)

    //propietats descriptives (no físiques)
    this.simbol=""; //string
    this.color=(function(q){
      if(q==0){return "white"}
      if(q<0 ){return "rgba(255,   0,   0, 0.8)"}
      if(q>0 ){return "rgba(255, 255, 255, 0.8)"}
    })(this.carrega);
  }

  //calcula totes les forces rebudes
  //elèctriques, magnètiques i gravitatòria
  update_forces(){
    //forces elèctriques rebudes de les altres partícules
    //cada altra càrrega t'empeny o t'estira
    let forces_electriques = particules.map(P=>{
      return this.força_electrica(P); //Vector
    });

    //forçes magnètiques rebudes de les altres partícules
    let forces_magnetiques = particules.map(P=>{
      return this.força_magnetica(P); //Vector
    });

    //força de la gravetat de la Terra
    let gravetat = this.força_gravetat();

    //agrupa totes les forces
    let forces = [...forces_electriques, ...forces_magnetiques, gravetat]; //array de vectors

    //suma totes les forces
    this.F.x = forces.map(f=>f.x).sum();
    this.F.y = forces.map(f=>f.y).sum();
    this.F.z = forces.map(f=>f.z).sum();
  }

  //calcula acceleració partícula: a=F/m
  //si la partícula no té massa, no té acceleració
  update_acceleracio(){
    let m = this.massa;
    this.a.x = this.F.x/m||0;
    this.a.y = this.F.y/m||0;
    this.a.z = this.F.z/m||0;
  }

  //calcula velocitat partícula
  //v = v0 + a
  update_velocitat(){ //->Void
    let vel = this.v; //velocitat (vector)
    let acc = this.a; //acceleració (vector)
    vel.x += acc.x;
    vel.y += acc.y;
    vel.z += acc.z;
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
  update_colisions(){
    //return
    let pos  = this.r;
    let vel  = this.v;
    let R    = this.radi;
    //col·lisió amb parets
    if(pos.x   <= R             ){ vel.x=+Math.abs(vel.x); pos.x=R;               } //xoc vs paret esquerra
    if(pos.x+R >= canvas.width  ){ vel.x=-Math.abs(vel.x); pos.x=canvas.width-R;  } //xoc vs paret dreta
    if(pos.y   <= R             ){ vel.y=+Math.abs(vel.y); pos.y=R;               } //xoc vs sostre
    if(pos.y+R >= canvas.height ){ vel.y=-Math.abs(vel.y); pos.y=canvas.height-R; } //xoc vs terra
    if(pos.z   <= 0             ){ vel.z=+Math.abs(vel.z); pos.z=0;               } //xoc vs pantalla
    if(pos.z   >= canvas.width  ){ vel.z=-Math.abs(vel.z); pos.z=canvas.width;    } //xoc vs fons
    /*
    */
  }

  //update tot
  update(){ //->Void
    this.update_forces();
    this.update_acceleracio();
    this.update_velocitat();
    this.update_posicio();
    this.update_colisions();
    this.dibuixa();
  }

  //quantitat de moviment (vector)
  //p = m·v
  /*
  get quantitat_de_moviment(){
    let m = this.massa;
    return this.v.multiplica(m);
  }
  */

  //calcula quina força elèctrica rep de la partícula P
  //F = q·E
  força_electrica(P){ //->Vector
    let E = P.camp_electric(this.r); //camp elèctric que genera la partícula P sobre la posició (Vector)
    let F = E.multiplica(this.carrega); //força (Vector)
    return F;
  }

  //calcula quina força magnètica rep de la partícula P
  //F = q·(v x B)
  força_magnetica(P){ //->Vector
    let vel = this.v;                  //velocitat (Vector)
    let B   = P.camp_magnetic(this.r); //camp magnètic que genera la partícula P sobre la posició (Vector)
    let F   = vel.producte_vectorial(B).multiplica(this.carrega); //força (Vector)
    return F;
  }

  //calcula quina força rep de la gravetat
  força_gravetat(){ //->Vector
    //l'eix y a la pantalla va de dalt a baix, per tant g és positiu
    return new Vector(0,this.massa*g,0);
  }

  //calcula quin camp elèctric (E) genera la partícula a un punt P
  //E = K·q/r^2*u
  camp_electric(P){ //-> Vector
    let q   = this.carrega; //C
    let vec = new Vector(P.x-this.r.x, P.y-this.r.y, P.z-this.r.z); //Vector fins al punt P
    let r   = vec.length; //distància fins al punt P
    if(r==0)        return new Vector(0,0,0);
    if(r<this.radi) return new Vector(0,0,0);
    let uni = vec.normalitza(); //Vector
    let E   = uni.multiplica( K*q/(r*r) ); //Vector
    return E;
  }

  //calcula quin camp magnètic (B) genera la partícula a un punt P
  //B = μ0/4π·q(v x u)/r^2
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

  //energia cinètica
  //E = (m·v^2)/2
  get energia_cinetica(){
    let m = this.massa;
    let v = this.v.length; //velocitat
    return m*(v*v)/2;
  }

  //canvi energia cinètica => canvi velocitat
  set energia_cinetica(nou_valor){
    let Ec = nou_valor;
    let m  = this.massa;

    //valor inicial i final velocitat
    let v0 = this.v.length;
    let v1 = Math.sqrt(2*Ec/m);
    let rao = v1/v0;

    //modifica vector velocitat
    this.v.x *= rao;
    this.v.y *= rao;
    this.v.z *= rao;
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

    if(z<=0) return;
    //if(z>=canvas.width) return;

    //transforma a una càmera 2d TODO

    ctx.beginPath();
    ctx.fillStyle=this.color;
    ctx.arc(x,y,this.radi,0,2*Math.PI);
    ctx.fill();

    //text sobre la partícula
    ctx.font='bold 10px Arial';
    ctx.fillStyle="black";

    //símbol
    let text=`${this.simbol}`;
    let m = ctx.measureText(text);
    ctx.fillText(text, x-m.width/2, y-5);

    //posició
    let decimals = 0;
    text=`${x.toFixed(decimals)},${y.toFixed(decimals)},${z.toFixed(decimals)}`;
    m = ctx.measureText(text);
    ctx.fillText(text, x-m.width/2, y+5);

    //dibuixa vector velocitat
    ctx.beginPath();
    ctx.strokeStyle="red";
    ctx.moveTo(x,y);
    ctx.lineTo(x+10*this.v.x, y+10*this.v.y);
    ctx.stroke();

    //dibuixa vector posició
    /*
    ctx.beginPath();
    ctx.strokeStyle="green";
    ctx.moveTo(0,canvas.height);
    ctx.lineTo(this.r.x,this.r.y);
    ctx.stroke();
    */
  }
}

//array totes les partícules
let particules=[];
