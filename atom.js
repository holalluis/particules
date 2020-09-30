const K=9e4; //constant de coulomb
const g=0;   //constant de gravetat a la terra

class Atom{
  constructor(x,y,radi){
    this.x=x;       //posició inicial
    this.y=y;       //posició inicial
    this.radi=radi; //radi
    this.dx=0;      //velocitat inicial
    this.dy=0;      //velocitat inicial
    this.massa=10;  //massa
    this.carrega=0; //carrega elèctrica
  }

  get energia_cinetica(){
    let dx = this.dx;
    let dy = this.dy;
    return Math.sqrt(dx*dx + dy*dy);
  }

  update(){
    this.update_forces();
    this.update_posicio();
    this.dibuixa();
  }

  update_forces(){ //forces elèctriques
    let forces=[];
    atoms.forEach(a=>{
      if(this==a) return;

      //vector de l'atom a a aquest
      let f = new Vector(this.x-a.x, this.y-a.y);

      //llargada del vector (distància)
      let d = f.length;

      //sentit de la força
      let sentit = this.carrega * a.carrega; //-1 ò 1

      //normalitza el vector perquè sigui unitari
      f.normalitza();

      //la distància no pot ser 0
      let d_efectiva = null;
      if(sentit<0){
        d_efectiva = Math.max(this.radi, d);
      }else{
        d_efectiva = Math.max(1, d);
      }

      //aplica força elèctrica
      f.producte_escalar(K*sentit/Math.pow(d_efectiva,2));

      forces.push(f);
    });

    //força total = suma de forces
    let x_total = forces.map(f=>f.x).sum();
    let y_total = forces.map(f=>f.y).sum();
    let F = new Vector(x_total, y_total);

    //modifica velocitat (v = v0 + at), (a = F/m)
    this.dx += F.x/this.massa;
    this.dy += F.y/this.massa + g;

    //limita la velocitat
    let v = new Vector(this.dx, this.dy);
    if(v.length>10){
      v.normalitza();
      this.dx=v.x;
      this.dy=v.y;
    }
  }

  update_posicio(){
    if(this.x<=this.radi){this.x=this.radi+1;                             this.dx*=-1*0.5}
    if(this.y<=this.radi){this.y=this.radi+1;                             this.dy*=-1*0.5}
    if(this.x+this.radi>=canvas.width ){this.x=canvas.width-this.radi-1;  this.dx*=-1*0.5}
    if(this.y+this.radi>=canvas.height){this.y=canvas.height-this.radi-1; this.dy*=-1*0.5}
    this.x += this.dx;
    this.y += this.dy;
  }

  dibuixa(){
    c.beginPath();
    c.fillStyle=(function(carrega){
      if(carrega==0){return "black"}
      if(carrega<0 ){return "rgba(255,255,255,0.8)"}
      if(carrega>0 ){return "rgba(  0,  0,255,0.8)"}
    })(this.carrega);
    c.arc(this.x,this.y,this.radi,0,2*Math.PI);
    c.fill();
  }
}
