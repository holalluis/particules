//TODO

class Matrius{
  //inverteix una matriu --> matriu
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

    //determinant
    let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if(!det){return null;}
    det = 1.0 / det;

    let R = new Array(16);
    R[0]  = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    R[1]  = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    R[2]  = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    R[3]  = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    R[4]  = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    R[5]  = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    R[6]  = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    R[7]  = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    R[8]  = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    R[9]  = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    R[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    R[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    R[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    R[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    R[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    R[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
    return R;
  }

  //multiplica 2 matrius --> matriu
  static multiplica=function(A, B){
    let a00 = A[0],  a01 = A[1],  a02 = A[2],  a03 = A[3];
    let a10 = A[4],  a11 = A[5],  a12 = A[6],  a13 = A[7];
    let a20 = A[8],  a21 = A[9],  a22 = A[10], a23 = A[11];
    let a30 = A[12], a31 = A[13], a32 = A[14], a33 = A[15];

    let R = new Array(16);

    let b0 = B[0], b1 = B[1], b2 = B[2], b3 = B[3];
    R[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    R[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    R[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    R[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = B[4];
    b1 = B[5];
    b2 = B[6];
    b3 = B[7];
    R[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    R[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    R[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    R[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = B[8];
    b1 = B[9];
    b2 = B[10];
    b3 = B[11];
    R[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    R[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    R[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    R[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = B[12];
    b1 = B[13];
    b2 = B[14];
    b3 = B[15];
    R[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    R[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    R[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    R[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return R;
  }

  //multiplica una matriu per un vector --> vector
  static multiplica_per_vector=function(A,vec){
    let a00 = A[0],  a01 = A[1],  a02 = A[2],  a03 = A[3];
    let a10 = A[4],  a11 = A[5],  a12 = A[6],  a13 = A[7];
    let a20 = A[8],  a21 = A[9],  a22 = A[10], a23 = A[11];
    let a30 = A[12], a31 = A[13], a32 = A[14], a33 = A[15];

    let v0 = vec[0],
        v1 = vec[1],
        v2 = vec[2],
        v3 = vec[3];

    let out = new Vector(4);
    out[0] = a00*v0 + a01*v1 + a02*v2 + a03*v3;
    out[1] = a10*v0 + a11*v1 + a12*v2 + a13*v3;
    out[2] = a20*v0 + a21*v1 + a22*v2 + a23*v3;
    out[3] = a30*v0 + a31*v1 + a32*v2 + a33*v3;
    return out;
  }

  //crea una matriu camera
  static crea_matriu_camera=function(u1,u2,u3,posicio){
    return [
      u1.x, u2.x, u3.x, pos.x,
      u1.y, u2.y, u3.y, pos.y,
      u1.z, u2.z, u3.z, pos.z,
         0,    0,    0,     1,
    ];
  }

  //crea una matriu frustum
  static crea_matriu_frustum=function(angle, far, near){
    let a   = (f+n)/(f-n);
    let b   = -2*n*f/(f-n);
    let tan = Math.tan(angle);
    let matriu = [
      tan,   0,  0,  0,
        0, tan,  0,  0,
        0,   0,  a, -b,
        0,   0, -1,  0,
    ];
    return matriu;
  }

  //calcula el punt 2d a pintar a la pantalla
  static calcula_punt_pantalla(P, matriu_frustum, matriu_camera){
    let F = matriu_frustum;
    let C = matriu_camera;
    let T = this.multiplica(F, this.multiplica_per_vector(C, [P.x,P.y,P.z,1]));

    let x = T[0];
    let y = T[1];
    //let z = T[2]; no és necessari
    let w = T[3];

    //punt pantalla
    let X = x/w;
    let Y = y/w;
    return {x:X,y:Y};
  }
}

/*https://github.com/toji/gl-matrix/blob/master/src/mat4.js*/

//Transpose a mat4
export function transpose(A) {
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

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */
export function frustum(out, left, right, bottom, top, near, far) {
  let rl = 1 / (right - left);
  let tb = 1 / (top - bottom);
  let nf = 1 / (near - far);
  out[0] = near * 2 * rl;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = near * 2 * tb;
  out[6] = 0;
  out[7] = 0;
  out[8] = (right + left) * rl;
  out[9] = (top + bottom) * tb;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = far * near * 2 * nf;
  out[15] = 0;
  return out;
}
