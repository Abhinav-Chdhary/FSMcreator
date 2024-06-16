import Circle from "../elements/circle";
import { selectType } from "./customTypes";

export function handleClickOnCanvas(
  event: MouseEvent,
  canvas: HTMLCanvasElement,
  circles: Circle[],
  setSelectedObject: React.Dispatch<React.SetStateAction<selectType>>
) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  circles.map((circle) => {
    if (circle.isCircle(x, y)) {
      setSelectedObject(circle);
    }
  });
}
