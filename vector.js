class Vector{
  constructor(x,y){
    this.x=x||0;
    this.y=y||0;
  }
  get length(){
    let x=this.x;
    let y=this.y;
    return Math.sqrt(x*x + y*y);
  }
  normalitza(){
    let length = this.length;
    this.x /= length;
    this.y /= length;
  }
  producte_escalar(escalar){
    this.x *= escalar;
    this.y *= escalar;
  }

  angle(vec){
    return Math.acos((this.x*vec.x+this.y*vec.y)/(this.length*vec.length));
  }
}
