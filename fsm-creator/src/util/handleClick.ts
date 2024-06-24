import { useContext } from "react";
import { useRedraw } from "./useRedraw";
import CanvasContext from "../context/canvasContext";

export function handleClickOnCanvas(
  event: MouseEvent,
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) {
  const canvasContext = useContext(CanvasContext);
  if (!canvasContext) {
    throw new Error("CanvasContext must be used within a CanvasProvider");
  }
  const { circles, setSelectedObject } = canvasContext;
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  let deselect: boolean = true;
  circles.map((circle) => {
    if (circle.isCircle(x, y)) {
      deselect = false;
      setSelectedObject(circle);
      useRedraw(ctx, canvas);
    }
  });
  if (deselect) {
    setSelectedObject(null);
  }
}
