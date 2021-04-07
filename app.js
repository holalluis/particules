/*PARÀMETRES*/

//Quants àtoms hi ha
const N = Math.pow(15,2); //nombre àtoms

//Constants
const K = 9e9; //constant de coulomb
const g = 0.001; //constant de gravetat

//Paràmetres
let modificadors={
  massa:   6e6, //massa = "resistència al moviment"
  radi:    1/10, //tamany
  carrega: 1,   //càrrega = "força amb la que s'atrau o repelen altres càrregues"
};

//quadricula d'atoms
const files_columnes = Math.floor(Math.sqrt(N)); //files i columnes
const separacio_x    = canvas.width/files_columnes;
const separacio_y    = canvas.height/files_columnes;

//omple array atoms
for(let i=0;i<N;i++){
  let carrega;
  let radi;
  let massa;
  let simbol;

  //àtoms
  if(i%2==1){
    carrega = -1;
    massa   = 35;
    radi    = 175;
    simbol  = "Cl-";
  }else{
    carrega = +1;
    massa   = 23;
    radi    = 227;
    simbol  = "Na+";
  }

  //posició nou àtom
  let x = separacio_x/2 + (i%files_columnes)*separacio_x;
  let y = separacio_y/2 + Math.floor(i/files_columnes)*separacio_y;

  //crea nou àtom
  let atom = new Atom(
    x,       //posicio x
    y,       //posicio y
    radi,    //radi escollit
    massa,   //massa escollida
    carrega, //càrrega escollida
  );
  atom.simbol=simbol;

  atoms.push(atom);
}

//ajust paràmetres simulació
atoms.forEach(a=>{
  a.massa   *= modificadors.massa;   //daltons
  a.radi    *= modificadors.radi;    //tamany àtoms
  a.carrega *= modificadors.carrega; //càrrega d'un electró
});

//ordena'ls per simbol perquè se solapin sempre igual
atoms.sort((a,b)=>{
  return b.simbol>a.simbol?1:-1
});
