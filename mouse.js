canvas.onclick=function(){
  canvas.requestPointerLock();
};

//hook pointer lock state change event
document.addEventListener('pointerlockchange',function(){
  if(document.pointerLockElement==canvas){
    console.log('The pointer lock status is now locked');
    document.addEventListener("mousemove", update_mouse, false);
  }else{
    console.log('The pointer lock status is now unlocked');
    document.removeEventListener("mousemove", update_mouse, false);
  }
},false);

function update_mouse(e) {
  let x = e.movementX;
  let y = e.movementY;

  camera.u3[0] += 0.0002*x;
  camera.u3[1] -= 0.0002*y;

  update_controls_camera();
  update_matrius();
}
