import { useContext } from "react";
import { CanvasContext } from "../context/canvasContext";

export function redraw(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) {
  const canvasContext = useContext(CanvasContext);
  if (!canvasContext) {
    throw new Error("CanvasContext must be used within a CanvasProvider");
  }
  const { circles, selectedObject } = canvasContext;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circles.map((circle) => {
    if (circle === selectedObject) circle.drawCircle(ctx, "blue");
    else circle.drawCircle(ctx, "black");
  });
}
