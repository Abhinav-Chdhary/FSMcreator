export default function drawArrow(context, x, y, angle, color = "black") {
  let dx = Math.cos(angle);
  let dy = Math.sin(angle);
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x - 8 * dx + 5 * dy, y - 8 * dy - 5 * dx);
  context.lineTo(x - 8 * dx - 5 * dy, y - 8 * dy + 5 * dx);
  context.fillStyle = color;
  context.fill();
}
