import Circle from "../elements/circle";
<<<<<<< HEAD
import Link from "../elements/link";
import { selectType } from "./customTypes";
import { redraw } from "./redraw";

export function handleShiftDrag(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  event: KeyboardEvent,
  circles: Circle[],
  links: Link[],
  setLinks: React.Dispatch<React.SetStateAction<Link[]>>,
  selectedObject: selectType
) {
  let c1: Circle | null = null;
  let c2: Circle | null = null;
  let startX: number, startY: number;
  let isDragging = true;

  const handleMouseDown = (event: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    startX = event.clientX - rect.left;
    startY = event.clientY - rect.top;
    circles.forEach((circle) => {
      if (circle.isCircle(startX, startY)) {
        c1 = circle;
        isDragging = true;
      }
    });
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging && c1) {
      redraw(ctx, circles, links, canvas, selectedObject);
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      ctx.strokeStyle = "black";
      ctx.beginPath();
      ctx.moveTo(c1.x, c1.y);
      ctx.lineTo(mouseX, mouseY);
      ctx.stroke();

      const angle = Math.atan2(mouseY - c1.y, mouseX - c1.x);
      const arrowLength = 10;

      ctx.beginPath();
      ctx.moveTo(mouseX, mouseY);
      ctx.lineTo(
        mouseX - arrowLength * Math.cos(angle - Math.PI / 6),
        mouseY - arrowLength * Math.sin(angle - Math.PI / 6)
      );
      ctx.moveTo(mouseX, mouseY);
      ctx.lineTo(
        mouseX - arrowLength * Math.cos(angle + Math.PI / 6),
        mouseY - arrowLength * Math.sin(angle + Math.PI / 6)
      );
      ctx.stroke();
    }
  };

  const handleMouseUp = (event: MouseEvent) => {
    isDragging = false;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    circles.forEach((circle) => {
      if (circle.isCircle(x, y)) {
        c2 = circle;
      }
    });
    if (c1 && c2) {
      const newLink = new Link(c1, c2);
      newLink.drawArrowFinalArc(ctx);
      setLinks([...links, newLink]);
    }
  };
=======
import useCanvasStore from "./canvasStore";

export function handleShiftDrag(
  event: KeyboardEvent,
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) {
  
  const { selectedObject } = useCanvasStore();
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
>>>>>>> main
  if (event.shiftKey) {
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }
}
