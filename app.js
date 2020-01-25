const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const button = document.querySelector("#jsMode");
const saveBtn = document.querySelector("#jsSave");

canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const INITIAL__COLOR = "#2c2c2c";
ctx.strokeStyle = INITIAL__COLOR;
ctx.lineWidth = 2.5;
ctx.fillStyle = INITIAL__COLOR;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const width = event.target.value;
  ctx.lineWidth = width;
}

function handleButton() {
  if (filling === true) {
    filling = false;
    button.innerText = "Fill";
  } else {
    filling = true;
    button.innerText = "Paint";
  }
}
function handleRect() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSave() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "save canvas with js";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleRect);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color =>
  color.addEventListener("click", handleClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (button) {
  button.addEventListener("click", handleButton);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSave);
}
