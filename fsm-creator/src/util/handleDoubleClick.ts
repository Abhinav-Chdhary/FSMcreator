import { useContext } from "react";
import CanvasContext from "../context/canvasContext";
import Circle from "../elements/circle";


export function handleDoubleClick(
  event: MouseEvent,
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) {
  const canvasContext = useContext(CanvasContext);
  if (!canvasContext) {
    throw new Error("CanvasContext must be used within a CanvasProvider");
  }
  const { circles, selectedObject, setSelectedObject, setCircles } =
    canvasContext;
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
