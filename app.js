/*PARÀMETRES*/
//Quantes partícules hi ha?
let N = Math.pow(15,2); //nombre particules

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
const NA  = 6.02214076e23;    //número d'Avogadro (1/mol)

//gravetat
const g = 0.001; //gravetat (m/s^2)

//mostra totes les constants
console.log({constants:{π,c,μ0,ε0,h,e,k,NA,K,g}});

//paràmetres simulació (ajustar per poder veure moviment)
//es modificaran els valors de totes les partícules
let modificadors={
  massa:   1, //massa = "resistència al moviment"
  radi:    3e16, //tamany (zoom arbritrari)
  carrega: 1, //càrrega = "força amb la que s'atrau o repelen altres càrregues"
};

//ordena partícules en una quadrícula
const files_columnes = Math.floor(Math.sqrt(N)); //files i columnes
const separacio_x    = canvas.width/files_columnes;
const separacio_y    = canvas.height/files_columnes;

//omple array partícules
for(let i=0;i<N;i++){
  let carrega,radi,massa,simbol;
  if(i%2){
    //electrons
    carrega = -1*e; //C
    radi    = 1e-20; //m
    massa   = 5.485799094e-4*uma; //kg
    simbol  = "e-";
  }else{
    //protons
    carrega = +1*e; //C
    radi    = 8.41235641483227e-16; //m
    massa   = 1.007276466812*uma; //kg
    simbol  = "P+";
  }

  //posició partícula
  let x = separacio_x/2 + (i%files_columnes)*separacio_x;
  let y = separacio_y/2 + Math.floor(i/files_columnes)*separacio_y;
  let z = 90 + 20*Math.random();

  //crea nova partícula
  let par = new Particula(
    x,       //posició x
    y,       //posició y
    z,       //posició z
    radi,    //radi escollit
    massa,   //massa escollida
    carrega, //càrrega escollida
  );
  par.simbol=simbol;

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
