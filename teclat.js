function teclat(ev){
  //console.log(ev.key);
  switch(ev.key){
    case 'w':
      camera.ull.x += camera.u3[0];
      camera.ull.y += camera.u3[1];
      camera.ull.z += 0.5;
      break;
    case 's':
      camera.ull.x -= camera.u3[0];
      camera.ull.y -= camera.u3[1];
      camera.ull.z -= 0.5;
      break;
    case 'a': camera.ull.x -= 0.5; break;
    case 'd': camera.ull.x += 0.5; break;
  }
  update_controls_camera();
  update_matrius();
}

