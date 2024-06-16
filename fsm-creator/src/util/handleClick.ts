import Circle from "../elements/circle";

export function handleClickOnCanvas(
  event: MouseEvent,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  circles: Circle[]
) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  circles.map((circle) => {
    if (circle.isCircle(x, y)) console.log("Yes part of a circle");
  });
}
