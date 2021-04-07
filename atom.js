class Atom{
  constructor(x,y,radi,massa,carrega){
    this.massa   = massa;   //massa
    this.carrega = carrega; //carrega elèctrica
    this.radi    = radi;    //radi

    //variables
    this.x  = x; //posició inicial     (x)
    this.y  = y; //posició inicial     (y)
    this.vx = 0; //velocitat inicial   (0)
    this.vy = 0; //velocitat inicial   (0)
    this.ax = 0; //acceleració inicial (0)
    this.ay = 0; //acceleració inicial (0)

    //color àtom
    this.color=(function(carrega){
      if(carrega==0){return "black"}
      if(carrega<0 ){return "rgba(255,255,255,0.8)"}
      if(carrega>0 ){return "rgba(  0,  0,255,0.8)"}
    })(this.carrega);
  }

  //calcula forces rebudes
  //des de tots els altres atoms
  update_forces(){
    let forces=[]; //array de vectors

    //calcula forces elèctriques que fan els altres àtoms
    let forces_electriques = atoms.map(a=>{
      return this.força_electrica(a); //vector
    });

    //afegeix forces electriques
    forces = [...forces_electriques]; //array de vectors

    //afegeix força gravetat
    forces.push(this.força_gravetat()); //

    //força total = suma de forces
    let suma_x = forces.map(f=>f.x).sum();
    let suma_y = forces.map(f=>f.y).sum();
    let F = new Vector(suma_x, suma_y);

    //update suma de forces
    this.ax = F.x/this.massa;
    this.ay = F.y/this.massa;
  }

  //calcula quina força fa la gravetat
  força_gravetat(){ //->Vector
    return new Vector(0,this.massa*g);
  }

  //calcula quina força elèctrica li fa un altre àtom
  força_electrica(atom){ //->Vector
    //la força sobre un mateix és 0
    if(atom==this) return new Vector(0,0);

    //multiplicar càrregues
    //sentit força (positiu: repel·leix, negatiu: atrau)
    let q1q2 = atom.carrega * this.carrega; //numero

    //vector this-->a
    let vec = new Vector(this.x-atom.x, this.y-atom.y); //vector

    //distància entre àtoms
    let r = vec.length; //numero

    //la distància mínima és la suma de radis en cas de càrregues diferents
    let suma_radis = this.radi + atom.radi; //numero
    if(r<suma_radis && q1q2<0) r = suma_radis; //numero

    //normalitza el vector per fer-lo unitari (volem la direcció)
    vec.normalitza();

    //fórmula força elèctrica = K*q1*q2/r^2
    vec.producte_escalar(K*q1q2/(r*r));

    //retorna vector amb la força calculada
    return vec;
  }

  //calcula velocitat àtom
  //v(t) = v0 + a*t
  update_velocitat(){ //->Void
    this.vx = this.vx + this.ax;
    this.vy = this.vy + this.ay;
  }

  //calcula posició àtom
  //x(t) = x0 + v0*t + 1/2*a*t^2
  //conserva la quantitat de moviment
  update_posicio(){ //->Void
    this.x += this.vx;
    this.y += this.vy;

    //col·lisió amb altres àtoms
    atoms.forEach(a=>{
      if(this==a) return;
      let vec = new Vector(this.x-a.x, this.y-a.y);
      if(vec.length < (this.radi+a.radi)){
        let v = new Vector(this.vx,this.vy); //velocitat this
        let u = new Vector(   a.vx,   a.vy); //velocitat a
        let massa_total = this.massa + a.massa;

        this.vx = (v.x+u.x)*a.massa/massa_total;
        this.vy = (v.y+u.y)*a.massa/massa_total;

      }
    });

    //col·lisió amb parets
    if(this.x+this.radi>canvas.width){  this.vx = -Math.abs(this.vx); this.x=canvas.width-this.radi;  } //Xoc vs paret dreta
    if(this.x<this.radi){               this.vx = +Math.abs(this.vx); this.x=this.radi;               } //Xoc vs paret esquerra
    if(this.y+this.radi>canvas.height){ this.vy = -Math.abs(this.vy); this.y=canvas.height-this.radi; } //Xoc vs terra
    if(this.y<this.radi){               this.vy = +Math.abs(this.vy); this.y=this.radi;               } //Xoc vs sostre
  }

  //update tot
  update(){ //->Void
    this.update_forces();
    this.update_velocitat();
    this.update_posicio();
    this.dibuixa();
  }

  //dibuixa al canvas
  dibuixa(){
    c.beginPath();
    c.fillStyle=this.color;
    c.arc(this.x,this.y,this.radi,0,2*Math.PI);
    c.fill();

    c.fillStyle="black";
    c.font='bold 10px Arial';
    let text=this.simbol;
    let m = c.measureText(text);
    c.fillText(text, this.x-m.width/2, this.y+10/2);
  }

  //calcula energia cinètica TODO
  get energia_cinetica(){
    let V = new Vector(this.vx, this.vy); //vector velocitat
    let v = V.length; //magnitud
    let m = this.massa;
    //1/2*m*v^2
    return m*(v*v)/2;
  }

  //calcula energia potencial TODO
  get energia_potencial(){
    //energia potencial elèctrica que provoquen els altres àtoms
    return atoms.map(a=>{
      //magnitud força elèctrica
      let F = this.força_electrica(a).length; //Newtons
      //distància
      let d = new Vector(this.x-a.x, this.y-a.y).length; //metres
      return F*d; //Joules
    }).sum();
  }
}

//array on viuen tots els àtoms
let atoms=[];
