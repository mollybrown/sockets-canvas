var socket;

function setup() {
  createCanvas(400, 400);
  strokeWeight(10);

  //Create client connection
  socket = io.connect('http://localhost:3000');
  socket.on('mouse', newDrawing);
}

function newDrawing(data) {
  stroke(255, 0, 100);
  line(data.x, data.y, data.px, data.py);
}

function mouseDragged() {
  console.log(mouseX + ',' + mouseY);

  var data = {
    x: mouseX,
    y: mouseY,
    px: pmouseX,
    py: pmouseY
  }

  socket.emit('mouse', data);

  stroke(0);
  line(mouseX, mouseY, pmouseX, pmouseY);
}
