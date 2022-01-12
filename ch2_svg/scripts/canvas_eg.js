const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.save();

// rectangle
ctx.fillStyle = "#ff0000";
ctx.strokeStyle = "blue";
ctx.lineWidth = 10;

ctx.fillRect(50, 50, 50, 50);
ctx.globalAlpha = 0.5;
ctx.strokeRect(50, 50, 50, 50);

