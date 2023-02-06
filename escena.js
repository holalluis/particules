/*
  ESCENA = "estat inicial simulació"
*/

/*
  Quantes partícules vols crear
*/
let N = Math.pow(5,2); //N^2

/*
  Paràmetres simulació =
  modificar totes les partícules
*/
let parametres_simulacio={
  massa:   1,  //massa   = "resistència al moviment"
  radi:    5e14, //tamany  = "zoom arbritrari"
  carrega: 1,    //càrrega = "força amb la que s'atrau o repelen altres càrregues"
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

  let p=null; //nova partícula
  if(false && i%2){
    //crea un electró
    p = new Electro(x,y,z);
  }else{
    //crea un protó o un neutró
    if(Math.random() /*>0.5*/){
      p = new Proto(x,y,z);
    }else{
      p = new Neutro(x,y,z);
    }
  }
  particules.push(p);
}

//ajusta paràmetres simulació
particules.forEach(p=>{
  p.massa   *= parametres_simulacio.massa;
  p.radi    *= parametres_simulacio.radi;
  p.carrega *= parametres_simulacio.carrega;
});
