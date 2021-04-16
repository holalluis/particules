/*PARÀMETRES ESCENA SIMULACIÓ*/

//Quantes partícules hi ha?
let N = Math.pow(2,2); //N^2

//paràmetres simulació (ajustar per poder veure moviment)
//es modificaran els valors de totes les partícules
let modificadors={
  massa:   5e5, //massa = "resistència al moviment"
  radi:    5e14, //tamany (zoom arbritrari)
  carrega: 1, //càrrega = "força amb la que s'atrau o repelen altres càrregues"
};

//ordena partícules en una quadrícula
const files_columnes = Math.floor(Math.sqrt(N)); //files i columnes
const separacio_x    = 10/files_columnes;
const separacio_y    = 10/files_columnes;

//buida array partícules i omple'l de nou
particules=[];

for(let i=0;i<N;i++){
  let carrega,radi,massa,simbol;
  //posició nova partícula
  let x = separacio_x/2 + (i%files_columnes)*separacio_x           -10/2;
  let y = separacio_y/2 + Math.floor(i/files_columnes)*separacio_y -10/2;
  let z = -1+2*Math.random();

  let par = null;
  if(i%2){
    //crea un electró
    par = new Electro(x,y,z);
  }else{
    //crea un protó o un neutró
    if(Math.random()){
      par = new Proto(x,y,z);
    }else{
      par = new Neutro(x,y,z);
    }
  }
  particules.push(par);
}

//ajusta paràmetres simulació
particules.forEach(p=>{
  p.massa   *= modificadors.massa;
  p.radi    *= modificadors.radi;
  p.carrega *= modificadors.carrega;
});
