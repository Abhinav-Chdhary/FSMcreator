import { selectType } from "./customTypes";
import Circle from "../elements/circle";

export function handleKeyDown(
  event: KeyboardEvent,
  selectedObject: selectType,
  setCircles: React.Dispatch<React.SetStateAction<Circle[]>>
): void {
  var keyPressed = event.key;
  if (keyPressed === "Delete") {
    if (selectedObject instanceof Circle) {
      setCircles((prevCircles) =>
        prevCircles.filter((circle) => circle !== selectedObject)
      );
    }
  }
}
