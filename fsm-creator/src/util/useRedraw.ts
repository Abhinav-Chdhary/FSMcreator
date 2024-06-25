import useCanvasStore from "./canvasStore";

export function useRedraw(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) {
  const { circles, selectedObject } = useCanvasStore();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circles.map((circle) => {
    if (circle === selectedObject) circle.drawCircle(ctx, "blue");
    else circle.drawCircle(ctx, "black");
  });
}
