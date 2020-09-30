class Atom{
  constructor(x,y,radi){
    this.radi=radi; //radi
    this.x=x;       //posició inicial
    this.y=y;       //posició inicial
    this.dx=0;      //velocitat inicial
    this.dy=0;      //velocitat inicial
    this.carrega=0; //carrega elèctrica

    this.gravetat=0;
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
      let v = new Vector(this.x-a.x, this.y-a.y);
      let d = v.length;

      let sentit = this.carrega * a.carrega; //-1 ò 1

      v.producte_escalar(sentit/Math.pow(d,2));
      forces.push(v);

    });

    //força total = suma de forces
    let x_total = forces.map(v=>v.x).sum();
    let y_total = forces.map(v=>v.y).sum();
    let F = new Vector(x_total, y_total);
    F.normalitza();

    //update velocitat
    this.dx += F.x/this.radi;
    this.dy += F.y/this.radi + this.gravetat;
  }

  update_posicio(){
    if(this.x<=this.radi){this.x=this.radi; this.dx*=-1}
    if(this.y<=this.radi){this.y=this.radi; this.dy*=-1}
    if(this.x+this.radi>=canvas.width ){this.x=canvas.width-this.radi;  this.dx*=-1}
    if(this.y+this.radi>=canvas.height){this.y=canvas.height-this.radi; this.dy*=-1}
    this.x += this.dx;
    this.y += this.dy;
  }

  dibuixa(){
    c.beginPath();
    c.fillStyle=(function(carrega){
      if(carrega==0){return "white"}
      if(carrega<0 ){return "blue" }
      if(carrega>0 ){return "white"  }
    })(this.carrega);
    c.arc(this.x,this.y,this.radi,0,2*Math.PI);
    c.fill();
  }
}
