/*tipus de partícules*/

//Electró
class Electro extends Particula{
  constructor(x,y,z){
    let radi    = 1e-20; //m
    let massa   = 5.485799094e-4*uma; //kg
    let carrega = -1*e; //C
    super(x,y,z,radi,massa,carrega);
    this.simbol = "e-";
  }
}

//Protó
class Proto extends Particula{
  constructor(x,y,z){
    let radi    = 8.41235641483227e-16; //m
    let massa   = 1.007276466812*uma; //kg
    let carrega = +1*e; //C
    super(x,y,z,radi,massa,carrega);
    this.simbol = "P+";
  }
}

//Neutró
class Neutro extends Particula{
  constructor(x,y,z){
    let radi    = 8e-16;//m
    let massa   = 1.00866491588*uma;
    let carrega = 0; //C
    super(x,y,z,radi,massa,carrega);
    this.simbol = "N";
  }
}
