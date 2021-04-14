/*PARÀMETRES ESCENA SIMULACIÓ*/

//Quantes partícules hi ha?
let N = Math.pow(5,2); //N^2

//paràmetres simulació (ajustar per poder veure moviment)
//es modificaran els valors de totes les partícules
let modificadors={
  massa:   1,    //massa = "resistència al moviment"
  radi:    3e16, //tamany (zoom arbritrari)
  carrega: 1,    //càrrega = "força amb la que s'atrau o repelen altres càrregues"
};

//ordena partícules en una quadrícula
const files_columnes = Math.floor(Math.sqrt(N)); //files i columnes
const separacio_x    = canvas.width/files_columnes;
const separacio_y    = canvas.height/files_columnes;

//buida array partícules i omple'l de nou
particules=[];
for(let i=0;i<N;i++){
  let carrega,radi,massa,simbol;
  //posició nova partícula
  let x = separacio_x/2 + (i%files_columnes)*separacio_x;
  let y = separacio_y/2 + Math.floor(i/files_columnes)*separacio_y;
  let z = 90 + 20*Math.random();

  let par = null;
  if(i%2){
    //crea un electró
    par = new Electro(x,y,z);
  }else{
    //crea un protó
    par = new Proto(x,y,z);
  }
  particules.push(par);
}

//ajusta paràmetres simulació
particules.forEach(p=>{
  p.massa   *= modificadors.massa;
  p.radi    *= modificadors.radi;
  p.carrega *= modificadors.carrega;
});

//ordena'ls per simbol perquè se solapin sempre igual
particules.sort((a,b)=>{return a.simbol>b.simbol?1:-1});
