/* ========================= NAVBAR ========================= */
let last_scroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  let current_scroll = window.pageYOffset || document.documentElement.scrollTop;

  if (current_scroll > last_scroll) {
    navbar.style.top = '-11vh';
  } else {
    navbar.style.top = '1vh';
  }

  last_scroll = current_scroll;
});

/* ========================= CANVAS ========================= */
const SPEED_Z = 0.0001;
const SPEED_Y = 0.0001;
const SPEED_X = 0.0001;

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

var wave = document.getElementById('wave');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//wave.width = window.innerWidth;
wave.setAttribute('width', window.innerWidth);

var deltaTime, timeLast = 0;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  wave.width = window.innerWidth;

  refreshCubes();
});

const point = (x, y, z) => ({ x, y, z });
const cube = (v0, v1, offset) => {
  const vertices = [
    v0,
    point(v0.x, v1.y, v0.z),
    point(v1.x, v1.y, v0.z),
    point(v1.x, v0.y, v0.z),
    point(v0.x, v0.y, v1.z),
    point(v0.x, v1.y, v1.z),
    point(v1.x, v1.y, v1.z),
    point(v1.x, v0.y, v1.z),
    v1
  ];
  const center = point((v0.x + v1.x) / 2, (v0.y + v1.y) / 2, (v0.z + v1.z) / 2);
  const length = Math.abs(v0.x - v1.x) ;

  return { vertices, center, length, offset };
};
const edges = [
  [0, 1], [1, 2], [2, 3], [3, 0],
  [4, 5], [5, 6], [6, 7], [7, 4],
  [0, 4], [1, 5], [2, 6], [3, 7],
];

function drawCube(cube, color = '#ddd') {
  ctx.strokeStyle = color;
  let angle = deltaTime * SPEED_Z * Math.PI * 2 + cube.offset.x;
  for (let v of cube.vertices) {
    let dx = v.x - cube.center.x,
        dy = v.y - cube.center.y;

    let x0 = dx * Math.cos(angle) - dy * Math.sin(angle),
        y0 = dx * Math.sin(angle) + dy * Math.cos(angle);

    v.x = x0 + cube.center.x;
    v.y = y0 + cube.center.y;
  }

  angle = deltaTime * SPEED_X * Math.PI * 2 + cube.offset.y;
  for (let v of cube.vertices) {
    let dy = v.y - cube.center.y,
        dz = v.z - cube.center.z;

    let y0 = dy * Math.cos(angle) - dz * Math.sin(angle),
        z0 = dy * Math.sin(angle) + dz * Math.cos(angle);

    v.y = y0 + cube.center.y;
    v.z = z0 + cube.center.z;
  }

  angle = deltaTime * SPEED_Y * Math.PI * 2 + cube.offset.z;
  for (let v of cube.vertices) {
    let dx = v.x - cube.center.x,
        dz = v.z - cube.center.z;

    let x0 = dx * Math.cos(angle) - dz * Math.sin(angle),
        z0 = dx * Math.sin(angle) + dz * Math.cos(angle);

    v.x = x0 + cube.center.x;
    v.z = z0 + cube.center.z;
  }

  for (let edge of edges) {
    ctx.beginPath();
    ctx.moveTo(cube.vertices[edge[0]].x, cube.vertices[edge[0]].y);
    ctx.lineTo(cube.vertices[edge[1]].x, cube.vertices[edge[1]].y);
    ctx.stroke();
  }
}

function drawLoop(now) {
  deltaTime = now - timeLast;
  timeLast = now;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let cube of cubes) {
    drawCube(cube);
  }

  requestAnimationFrame(drawLoop);
}

let cubes = [];

function refreshCubes() {
  cubes = [];
  for (let i = 0; i < 100; i++) {
    let v0p = Math.random() * canvas.width,
        v1p = Math.random() * canvas.height,
        v2p = Math.random() * 100;
  
    let length = 20;
  
    let v0 = point(v0p, v1p, v2p),
        v1 = point(v0p + length, v1p + length, v2p + length);
  
    cubes.push(cube(v0, v1, point(Math.random() / 100, Math.random() / 100, Math.random() / 100)));
  }
}

refreshCubes();
requestAnimationFrame(drawLoop);
