import Circle from "../elements/circle";
import Link from "../elements/link";
import { selectType } from "./customTypes";
import { redraw } from "./redraw";

export function handleClickOnCanvas(
  event: MouseEvent,
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  circles: Circle[],
  links: Link[],
  setSelectedObject: React.Dispatch<React.SetStateAction<selectType>>
) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  let deselect: boolean = true;
  circles.map((circle) => {
    if (circle.isCircle(x, y)) {
      deselect = false;
      setSelectedObject(circle);
      redraw(ctx, circles, links, canvas, circle);
    }
  });
  if (deselect) {
    setSelectedObject(null);
  }
}
