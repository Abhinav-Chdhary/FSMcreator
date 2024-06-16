import Circle from "../elements/circle";
import { selectType } from "./customTypes";

export function handleDoubleClick(
  event: MouseEvent,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  circles: Circle[],
  setCircles: React.Dispatch<React.SetStateAction<Circle[]>>,
  selectedObject: selectType,
  setSelectedObject: React.Dispatch<React.SetStateAction<selectType>>
) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  if (selectedObject instanceof Circle) {
    if (!selectedObject.isFinalState) {
      selectedObject.makeFinal(ctx);
      setSelectedObject(null);
    }
  } else {
    const newCircle = new Circle(x, y, 30, false);
    newCircle.drawCircle(ctx, "black");
    setCircles([...circles, newCircle]);
  }
}
