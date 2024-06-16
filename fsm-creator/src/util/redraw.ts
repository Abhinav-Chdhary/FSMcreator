import Circle from "../elements/circle";

export function redraw(
  ctx: CanvasRenderingContext2D,
  circles: Circle[],
  canvas: HTMLCanvasElement
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circles.map((circle) => {
    circle.drawCircle(ctx);
  });
}
