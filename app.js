//SIMULACIO
const n = Math.pow(18,2); //nombre àtoms

//quadricula d'atoms
const fic         = Math.floor(Math.sqrt(n)); //files i columnes
const separacio_x = canvas.width/fic;
const separacio_y = canvas.height/fic;

for(let i=0;i<n;i++){
  let carrega;
  let radi;
  let massa;
  let simbol;

  //àtoms d'oxigen i hidrogen relacio 1:3
  if(i%2==1){
    carrega = -1;
    massa   = 35;
    radi    = 35;
    simbol  = "Cl-";
  }else{
    carrega = +1;
    massa   = 23;
    radi    = 23;
    simbol  = "Na+";
  }

  //ajust paràmetres simulació
  massa   *=5e7;
  radi    /=2;
  carrega *=1;

  //posició nou àtom
  let x = separacio_x/2 + (i%fic)*separacio_x;
  let y = separacio_y/2 + Math.floor(i/fic)*separacio_y;

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
