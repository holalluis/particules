class Vector{
  constructor(x,y){
    this.x=x;
    this.y=y;
  }
  get length(){
    let x=this.x;
    let y=this.y;
    return Math.sqrt(x*x + y*y);
  }
  normalitza(){
    this.x /= this.length;
    this.y /= this.length;
  }
  producte_escalar(escalar){
    this.x *= escalar;
    this.y *= escalar;
  }

  angle(vec){
    return Math.acos((this.x*vec.x+this.y*vec.y)/(this.length*vec.length));
  }
}
