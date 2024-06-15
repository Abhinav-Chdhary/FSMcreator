export function handleDoubleClick(
  event: MouseEvent,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  circles: { x: number; y: number }[],
  setCircles: React.Dispatch<React.SetStateAction<{ x: number; y: number }[]>>
) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const newCircle = { x, y };
  setCircles([...circles, newCircle]);

  drawCircle(ctx, x, y);
}

export function drawCircle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number
) {
  ctx.beginPath();
  ctx.arc(x, y, 30, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}
