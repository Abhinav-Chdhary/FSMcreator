import Circle from "../elements/circle";
import { useContext } from "react";
import { CanvasContext } from "../context/canvasContext";
import { redraw } from "./redraw";

export function handleClickDrag(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) {
  const canvasContext = useContext(CanvasContext);
  if (!canvasContext) {
    throw new Error("CanvasContext must be used within a CanvasProvider");
  }
  const { circles, selectedObject } = canvasContext;
  let isDragging = false;

  const handleMouseDown = (event: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (selectedObject instanceof Circle && selectedObject.isCircle(x, y)) {
      isDragging = true;
    }
  };
  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (selectedObject instanceof Circle) {
        selectedObject.x = x;
        selectedObject.y = y;
        redraw(ctx, canvas);
      }
    }
  };
  const handleMouseUp = () => {
    isDragging = false;
  };
  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseup", handleMouseUp);
  return () => {
    canvas.removeEventListener("mousedown", handleMouseDown);
    canvas.removeEventListener("mousemove", handleMouseMove);
    canvas.removeEventListener("mouseup", handleMouseUp);
  };
}
