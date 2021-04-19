function teclat(ev){
  //console.log(ev.key);
  switch(ev.key){
    case 'w':
      camera.ull.x += 0.5*camera.u3[0];
      camera.ull.y += 0.5*camera.u3[1];
      camera.ull.z += 0.5*camera.u3[2]
      break;
    case 's':
      camera.ull.x -= 0.5*camera.u3[0];
      camera.ull.y -= 0.5*camera.u3[1];
      camera.ull.z -= 0.5*camera.u3[2];
      break;
    case 'a': //TODO
      camera.ull.x -= 0.5*camera.u3[2];
      //camera.ull.y -= 0.5*camera.u3[0];
      camera.ull.z -= 0.5*camera.u3[1];
      break;
    case 'd': //TODO
      camera.ull.x += 0.5*camera.u3[2];
      //camera.ull.y += 0.5*camera.u3[0];
      camera.ull.z += 0.5*camera.u3[1];
      break;
  }
  if(['w','s','a','d'].indexOf(ev.key)==-1){return;}
  update_controls_camera();
  update_matrius();
}

