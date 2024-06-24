import { useContext } from "react";
import CanvasContext from "../context/canvasContext";
import Circle from "../elements/circle";

export function handleShiftDrag(
  event: KeyboardEvent,
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) {
  const canvasContext = useContext(CanvasContext);
  if (!canvasContext) {
    throw new Error("CanvasContext must be used within a CanvasProvider");
  }
  const { selectedObject } = canvasContext;
  let isDragging = false;
  c1: Circle;
  c2: Circle;
  const handleMouseDown = (event: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (selectedObject instanceof Circle && selectedObject.isCircle(x, y)) {
      isDragging = true;
    }
  };
  if (event.shiftKey) {
    console.log("Shift pressed", selectedObject);
  }
}
