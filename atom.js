
//constants natura
const K = 9e9; //coulomb (9e9)
const g = 0;   //gravetat

//tots els atoms
let atoms=[];

class Atom{
  constructor(x,y,radi,massa,carrega){
    this.x=x;             //posició
    this.y=y;             //posició
    this.radi=radi;       //radi
    this.massa=massa;     //massa
    this.carrega=carrega; //carrega elèctrica

    this.fx=0; //suma de forces rebudes
    this.fy=0; //suma de forces rebudes
    this.dx=0; //velocitat
    this.dy=0; //velocitat

    this.color=(function(carrega){
      if(carrega==0){return "black"}
      if(carrega>0 ){return "rgba(255,255,255,0.8)"}
      if(carrega<0 ){return "rgba(  0,  0,255,0.8)"}
    })(this.carrega);
  }

  //calcula forces rebudes des de tots els altres atoms
  update_forces(){
    let forces = atoms.filter(a=>a!=this).map(a=>{
      //sentit de la força (positiu: repel·leix, negatiu: atrau)
      let sentit = this.carrega * a.carrega;

      //vector des de l'atom "a"
      let f = new Vector(this.x-a.x, this.y-a.y);

      //distància fins a l'àtom "a"
      let d = f.length;

      //normalitza el vector perquè sigui unitari
      f.normalitza();

      //la distància no pot ser 0
      //sino la força seria infinita
      let radi_efectiu = Math.max(this.radi, a.radi);
      let K_efectiva   = d < radi_efectiu ? 0:K;

      //fórmula força elèctrica
      f.producte_escalar(K_efectiva*sentit/Math.pow(d,2));

      //afegeix la força a la suma de forces
      return f;
    });

    //força total = suma de forces
    let suma_x = forces.map(f=>f.x).sum();
    let suma_y = forces.map(f=>f.y).sum();
    let F = new Vector(suma_x, suma_y);

    //update suma de forces
    this.fx = F.x;
    this.fy = F.y;
  }

  //modifica la velocitat de l'atom
  update_velocitat(){
    this.dx += this.fx/this.massa;
    this.dy += this.fy/this.massa;
  }

  //modifica la posició de l'àtom
  update_posicio(){
    let width =canvas.width-1;
    let height=canvas.height-1;
    if(this.x<this.radi){       this.x=this.radi;        this.dx*=-1}
    if(this.y<this.radi){       this.y=this.radi;        this.dy*=-1}
    if(this.x+this.radi>width ){this.x=width-this.radi;  this.dx*=-1}
    if(this.y+this.radi>height){this.y=height-this.radi; this.dy*=-1}

    this.x += this.dx;
    this.y += this.dy;
  }

  //update tot
  update(){
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
  }

  //calcula energia cinètica
  get energia_cinetica(){
    let dx = this.dx;
    let dy = this.dy;
    //1/2*m*v^2
    return 0.5*this.massa*(dx*dx + dy*dy);
  }
}
