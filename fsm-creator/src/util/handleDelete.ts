import { selectType } from "./customTypes";
import Circle from "../elements/circle";
import useCanvasStore from "./canvasStore";

export function handleKeyDown(
  event: KeyboardEvent,
  selectedObject: selectType,
): void {
  var keyPressed = event.key;
  const {setCircles} = useCanvasStore();
  if (keyPressed === "Delete") {
    if (selectedObject instanceof Circle) {
      setCircles((prevCircles) =>
        prevCircles.filter((circle) => circle !== selectedObject)
      );
    }
  }
}
