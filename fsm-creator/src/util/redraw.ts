import Circle from "../elements/circle";
import { selectType } from "./customTypes";

export function redraw(
  ctx: CanvasRenderingContext2D,
  circles: Circle[],
  canvas: HTMLCanvasElement,
  selectedObject: selectType
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circles.map((circle) => {
    if (circle === selectedObject) circle.drawCircle(ctx, "blue");
    else circle.drawCircle(ctx, "black");
  });
}
