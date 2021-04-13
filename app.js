/*PARÀMETRES ESCENA SIMULACIÓ*/

//Quantes partícules hi ha?
let N = Math.pow(2,2); //N^2

/*constants matemàtiques*/
const π = Math.PI;

/*constants universals*/
const c  = 299792458;      //velocitat de la llum (m/s)
const h  = 6.62607015e-34; //constant de Planck (J·s)
const k  = 1.380649e-23;   //constant de Boltzmann (J/K)
const μ0 = 4*π*1e-7;       //permetivitat magnètica en el buit (T·m/A)
const ε0 = 1/(c*c*μ0);     //permetivitat elèctrica en el buit ( C^2/(N·m^2) )
const K  = 1/(4*π*ε0);     //constant de Coulomb (N·m^2/C^2)

const uma = 1.6605390666e-27; //unitat de massa atòmica, dalton (kg)
const e   = 1.602176634e-19;  //càrrega elemental (C)

//gravetat
const g = 0.000; //gravetat (m/s^2)

//mostra totes les constants
console.log({constants:{π,c,μ0,ε0,h,e,k,K,g}});

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

//omple array partícules
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
