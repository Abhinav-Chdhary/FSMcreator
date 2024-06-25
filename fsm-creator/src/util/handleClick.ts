import { useRedraw } from "./useRedraw";
import useCanvasStore from "./canvasStore";

export function handleClickOnCanvas(
  event: MouseEvent,
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) {
  const { circles, setSelectedObject } = useCanvasStore();
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
