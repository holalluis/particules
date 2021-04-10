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
