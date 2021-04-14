/*constants matemàtiques*/
const π = Math.PI;

/*constants universals*/
const c   = 299792458;        //velocitat de la llum (m/s)
const μ0  = 4*π*1e-7;         //permetivitat magnètica en el buit (T·m/A)
const ε0  = 1/(c*c*μ0);       //permetivitat elèctrica en el buit ( C^2/(N·m^2) )
const K   = 1/(4*π*ε0);       //constant de Coulomb (N·m^2/C^2)
const h   = 6.62607015e-34;   //constant de Planck (J·s)
const uma = 1.6605390666e-27; //unitat de massa atòmica, dalton (kg)
const e   = 1.602176634e-19;  //càrrega elemental (C)
const k   = 1.380649e-23;     //constant de Boltzmann (J/K)

//gravetat
const g = 0.000; //gravetat (m/s^2)

//mostra les constants
console.log({constants:{π,c,μ0,ε0,K,h,uma,e,k,g}});
