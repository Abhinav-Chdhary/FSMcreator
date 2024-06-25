import Circle from "../elements/circle";
import useCanvasStore from "./canvasStore";

export function handleDoubleClick(
  event: MouseEvent,
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) {
  const { circles, selectedObject, setSelectedObject, setCircles } =
    useCanvasStore();
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
