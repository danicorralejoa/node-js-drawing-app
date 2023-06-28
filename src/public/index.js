const socket = io();

var isMouseDown = false;
var movingMouse = false;
var x_position = 0;
var y_position = 0;
let previous_position = null;
let color = "black";

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext("2d");

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height

function changeColor(inputColor){
  color = inputColor;
}

canvas.addEventListener('mousedown', ()=>{
  isMouseDown = true;
});

canvas.addEventListener('mouseup', ()=>{
  isMouseDown = false;  
});

canvas.addEventListener('mousemove', (e)=>{
  x_position = e.clientX;
  y_position = e.pageY;
  //console.log(e);
  movingMouse = true;
});

function createDrawing() {
  if(isMouseDown && movingMouse && previous_position != null){
    let drawing = {
      x_position : x_position,
      y_position : y_position,
      color : color,
      previous_position: previous_position
    }
    //show_drawing(drawing);
    socket.emit('drawing', drawing);
  }
  previous_position = {x_position:x_position, y_position:y_position};
  setTimeout(createDrawing,25)
}

  socket.on('show_drawing', (drawing)=>{
    if (drawing !=null) {
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = drawing.color;
      ctx.moveTo(drawing.x_position, drawing.y_position);
      ctx.lineTo(drawing.previous_position.x_position, drawing.previous_position.y_position);
      ctx.stroke(); 
    } else{
      ctx.clearRect(0,0,canvas.width,canvas.height)
    }
    
  })
  
createDrawing();


//Reset the drawing
function reset_drawing(){
  socket.emit('reset_drawing')
}

socket.on('reset_drawing_now',()=>{
  ctx.reset();
})

//SOCKET
var user_counter_selector = document.querySelector('#users > p');

socket.on("new_user", (number)=>{
  user_counter_selector.innerText = `Usuarios conectados: ${number}`;
});


