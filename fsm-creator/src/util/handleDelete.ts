import { selectType } from "./customTypes";
import Circle from "../elements/circle";
import { redraw } from "./redraw";

export function handleKeyDown(
  event: KeyboardEvent,
  selectedObject: selectType,
  circles: Circle[],
  setCircles: React.Dispatch<React.SetStateAction<Circle[]>>,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
): void {
  var keyPressed = event.key;
  if (keyPressed === "Delete") {
    if (selectedObject instanceof Circle) {
      setCircles((prevCircles) =>
        prevCircles.filter((circle) => circle !== selectedObject)
      );
      redraw(ctx, circles, canvas, selectedObject);
    }
  }
}
