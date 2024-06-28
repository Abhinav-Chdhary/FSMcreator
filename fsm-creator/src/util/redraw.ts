import Circle from "../elements/circle";
import Link from "../elements/link";
import { selectType } from "./customTypes";

export function redraw(
  ctx: CanvasRenderingContext2D,
  circles: Circle[],
  links: Link[],
  canvas: HTMLCanvasElement,
  selectedObject: selectType
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circles.forEach((circle) => {
    if (circle === selectedObject) circle.drawCircle(ctx, "blue");
    else circle.drawCircle(ctx, "black");
  });
  links.forEach((link) => {
    link.drawArrowFinalArc(ctx);
  });
}