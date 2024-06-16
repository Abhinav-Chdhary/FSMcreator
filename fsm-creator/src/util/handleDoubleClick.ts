import Circle from "../elements/circle";

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
  const newCircle = new Circle(x, y, 30, false);
  newCircle.drawCircle(ctx);
  setCircles([...circles, newCircle]);
}
