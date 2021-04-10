class Vector{
  constructor(x,y,z){
    this.x=x||0;
    this.y=y||0;
    this.z=z||0;
  }

  //llargada del vector
  get length(){ //->number
    let x=this.x;
    let y=this.y;
    let z=this.z;
    return Math.sqrt(x*x + y*y + z*z);
  }

  //genera un vector de llargada 1
  normalitza(){ //->Vector
    let length = this.length;
    let x = this.x/length;
    let y = this.y/length;
    let z = this.z/length;
    return new Vector(x,y,z);
  }

  //retorna un número a partir de 2 vectors
  producte_escalar(vector){ //->number
    let x = this.x*vector.x;
    let y = this.y*vector.y;
    let z = this.z*vector.z;
    return x+y+z;
  }

  //allarga o escurça un vector
  multiplica(escalar){ //->vector
    let x = this.x*escalar;
    let y = this.y*escalar;
    let z = this.z*escalar;
    return new Vector(x,y,z);
  }

  //retorna un vector a partir de 2 vectors
  producte_vectorial(vector){ //->Vector
    let x = this.y*vector.z - this.z*vector.y;
    let y = this.z*vector.x - this.x*vector.z;
    let z = this.x*vector.y - this.y*vector.x;
    return new Vector(x,y,z);
  }

  //calcula l'angle entre 2 vectors
  angle(vec){ //->number
    return Math.acos((this.x*vec.x+this.y*vec.y)/(this.length*vec.length));
  }
}
