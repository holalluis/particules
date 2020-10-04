//SIMULACIO
const n = Math.pow(21,2); //nombre àtoms

//paràmetres simulacio
const ralentitzacio = 1e9;

//quadricula d'atoms
const fic         = Math.floor(Math.sqrt(n)); //files i columnes
const separacio_x = canvas.width/fic;
const separacio_y = canvas.height/fic;

for(let i=0;i<n;i++){
  let carrega;
  let radi;
  let massa;

  //àtoms d'oxigen i hidrogen relacio 1:3
  if(i%3==1){
    carrega=-2;
    radi=66;
    massa=16;
  }else{
    carrega=1;
    radi=31;
    massa=1;
  }

  //ajusta paràmetres simulació
  massa   *=1e9;
  radi    /=4;
  carrega *=2;

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

  atoms.push(atom);
}
