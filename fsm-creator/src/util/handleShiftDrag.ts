import Circle from "../elements/circle";
import Link from "../elements/link";

export function handleShiftDrag(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  event: KeyboardEvent,
  circles: Circle[],
  links: Link[],
  setLinks: React.Dispatch<React.SetStateAction<Link[]>>
) {
  let c1: Circle | null = null;
  let c2: Circle | null = null;
  let startX: number, startY: number;
  const handleMouseDown = (event: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    startX = event.clientX - rect.left;
    startY = event.clientY - rect.top;
    circles.forEach((circle) => {
      if (circle.isCircle(startX, startY)) {
        c1 = circle;
        // attach link to circle too here
      }
    });
  };
  const handleMouseUp = (event: MouseEvent) => {
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
      newLink.drawArrowArc(ctx);
      setLinks([...links, newLink]);
    }
  };
  if (event.shiftKey) {
    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }
}
