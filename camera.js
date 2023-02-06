class Matrius{
  //inverteix una mat4. Retorna una mat4
  static inverteix=function(A){
    let a00 = A[0],  a01 = A[1],  a02 = A[2],  a03 = A[3];
    let a10 = A[4],  a11 = A[5],  a12 = A[6],  a13 = A[7];
    let a20 = A[8],  a21 = A[9],  a22 = A[10], a23 = A[11];
    let a30 = A[12], a31 = A[13], a32 = A[14], a33 = A[15];

    let b00 = a00 * a11 - a01 * a10;
    let b01 = a00 * a12 - a02 * a10;
    let b02 = a00 * a13 - a03 * a10;
    let b03 = a01 * a12 - a02 * a11;
    let b04 = a01 * a13 - a03 * a11;
    let b05 = a02 * a13 - a03 * a12;
    let b06 = a20 * a31 - a21 * a30;
    let b07 = a20 * a32 - a22 * a30;
    let b08 = a20 * a33 - a23 * a30;
    let b09 = a21 * a32 - a22 * a31;
    let b10 = a21 * a33 - a23 * a31;
    let b11 = a22 * a33 - a23 * a32;

    //determinant de A
    let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if(!det){return null;}
    det = 1.0 / det;

    let out = new Array(16);
    out[0]  = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1]  = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2]  = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3]  = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4]  = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5]  = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6]  = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7]  = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8]  = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9]  = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
    return out;
  }

  //transposa una mat4. Retorna una mat4
  static transposa=function(A) {
    let R = new Array(16);
    R[0]  = A[0];
    R[1]  = A[4];
    R[2]  = A[8];
    R[3]  = A[12];
    R[4]  = A[1];
    R[5]  = A[5];
    R[6]  = A[9];
    R[7]  = A[13];
    R[8]  = A[2];
    R[9]  = A[6];
    R[10] = A[10];
    R[11] = A[14];
    R[12] = A[3];
    R[13] = A[7];
    R[14] = A[11];
    R[15] = A[15];
    return R;
  }

  //multiplica 2 mat4's. Retorna una mat4
  static multiplica=function(A, B){
    let a00 = A[0],  a01 = A[1],  a02 = A[2],  a03 = A[3];
    let a10 = A[4],  a11 = A[5],  a12 = A[6],  a13 = A[7];
    let a20 = A[8],  a21 = A[9],  a22 = A[10], a23 = A[11];
    let a30 = A[12], a31 = A[13], a32 = A[14], a33 = A[15];

    let out = new Array(16);

    let b0 = B[0], b1 = B[1], b2 = B[2], b3 = B[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = B[4];
    b1 = B[5];
    b2 = B[6];
    b3 = B[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = B[8];
    b1 = B[9];
    b2 = B[10];
    b3 = B[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = B[12];
    b1 = B[13];
    b2 = B[14];
    b3 = B[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
  }

  //multiplica una mat4 per un array4. Retorna un array4
  static multiplica_per_vector=function(A,vec){
    let a00 = A[0],  a01 = A[1],  a02 = A[2],  a03 = A[3];
    let a10 = A[4],  a11 = A[5],  a12 = A[6],  a13 = A[7];
    let a20 = A[8],  a21 = A[9],  a22 = A[10], a23 = A[11];
    let a30 = A[12], a31 = A[13], a32 = A[14], a33 = A[15];

    let v0 = vec[0], v1 = vec[1], v2 = vec[2], v3 = vec[3];

    let out = new Array(4);
    out[0] = a00*v0 + a01*v1 + a02*v2 + a03*v3;
    out[1] = a10*v0 + a11*v1 + a12*v2 + a13*v3;
    out[2] = a20*v0 + a21*v1 + a22*v2 + a23*v3;
    out[3] = a30*v0 + a31*v1 + a32*v2 + a33*v3;
    return out;
  }

  //crea una matriu camera. Retorna una mat4
  static crea_matriu_camera=function(u1,u2,u3,ull){
    let out = new Array(16);
    out[ 0]=u1[0]; out[ 1]=u2[0]; out[ 2]=u3[0]; out[ 3]=ull[0];
    out[ 4]=u1[1]; out[ 5]=u2[1]; out[ 6]=u3[1]; out[ 7]=ull[1];
    out[ 8]=u1[2]; out[ 9]=u2[2]; out[10]=u3[2]; out[11]=ull[2];
    out[12]=    0; out[13]=    0; out[14]=    0; out[15]=     1;
    return this.inverteix(out);
  }

  //crea una matriu frustum. Retorna una mat4
  static crea_matriu_frustum=function(angle1, angle2, near, far) {
    let tan1 = Math.tan(angle1);
    let tan2 = Math.tan(angle2);
    let a   = (far+near)/(far-near);
    let b   = -2*far*near/(far-near);
    let out = new Array(16);
    out[ 0]= tan1; out[ 1]= 0;    out[ 2]= 0;  out[ 3] = 0;
    out[ 4]= 0;    out[ 5]= tan2; out[ 6]= 0;  out[ 7] = 0;
    out[ 8]= 0;    out[ 9]= 0;    out[10]= a;  out[11] = -b;
    out[12]= 0;    out[13]= 0;    out[14]= -1; out[15] = 0;
    return out;
  }

  //calcula punt 2d a pintar a la pantalla. Retorna objecte {x,y}
  static calcula_punt_pantalla(x,y,z, matriu_frustum, matriu_camera){
    let F = matriu_frustum;
    let C = matriu_camera;
    let T0 = this.multiplica_per_vector(C, [x,y,z,1]);
    let T  = this.multiplica_per_vector(F, T0);
    let x_barra = T[0];
    let y_barra = T[1];
    //let z_barra = T[2]; //no és necessari
    let w       = T[3];
    //punt pantalla
    let X = x_barra/w;
    let Y = y_barra/w;
    return [X,Y];
  }
}

//frustum i càmera
let camera={
  ull:{x:0, y:0, z:-50 },
  u1:[1,0,0], //orientació x
  u2:[0,-1,0], //orientació y
  u3:[0,0,1], //orientació z
};
let frustum={
  angle1: 1.5717,
  angle2: 1.5717,
  near: -10,
  far:  -20,
};
let matriu_camera  = null;
let matriu_frustum = null;
function update_matrius(){
  matriu_camera  = Matrius.crea_matriu_camera(camera.u1,camera.u2,camera.u3,[camera.ull.x, camera.ull.y, camera.ull.z]);
  matriu_frustum = Matrius.crea_matriu_frustum(frustum.angle1, frustum.angle2, frustum.near, frustum.far);
}
update_matrius();

function update_controls_camera(){
  document.querySelector('#camera_ull_x').value   = camera.ull.x;
  document.querySelector('#camera_ull_y').value   = camera.ull.y;
  document.querySelector('#camera_ull_z').value   = camera.ull.z;
  document.querySelector('#camera_u1_x').value    = camera.u1[0];
  document.querySelector('#camera_u1_y').value    = camera.u1[1];
  document.querySelector('#camera_u1_z').value    = camera.u1[2];
  document.querySelector('#camera_u2_x').value    = camera.u2[0];
  document.querySelector('#camera_u2_y').value    = camera.u2[1];
  document.querySelector('#camera_u2_z').value    = camera.u2[2];
  document.querySelector('#camera_u3_x').value    = camera.u3[0];
  document.querySelector('#camera_u3_y').value    = camera.u3[1];
  document.querySelector('#camera_u3_z').value    = camera.u3[2];
  document.querySelector('#frustum_angle1').value = frustum.angle1;
  document.querySelector('#frustum_angle2').value = frustum.angle2;
  document.querySelector('#frustum_far').value    = frustum.far;
  document.querySelector('#frustum_near').value   = frustum.near;
}
update_controls_camera();

//funció final per traduir 3d a 2d
function calcula_punt_canvas(x,y,z){
  let xy = Matrius.calcula_punt_pantalla(x,y,z, matriu_frustum, matriu_camera);
  let X = xy[0] + canvas.width/2;
  let Y = xy[1] + canvas.height/2;
  return [X,Y];
}
