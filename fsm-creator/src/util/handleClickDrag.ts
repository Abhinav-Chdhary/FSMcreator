import { drawCircle } from "./handleDoubleClick";

export function handleClickDrag(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  circles: { x: number; y: number }[]
) {
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  const radius = 30;

  const handleMouseDown = (event: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const circle = findCircleAtPosition(x, y, circles);
    if (circle) {
      isDragging = true;
      startX = circle.x;
      startY = circle.y;
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      circles.forEach((circle) => drawCircle(ctx, circle.x, circle.y));

      const angle = Math.atan2(y - startY, x - startX);
      const fromX = startX + radius * Math.cos(angle);
      const fromY = startY + radius * Math.sin(angle);

      drawArrow(ctx, fromX, fromY, x, y);
    }
  };

  const handleMouseUp = (event: MouseEvent) => {
    if (isDragging) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const circle = findCircleAtPosition(x, y, circles);
      if (circle) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        circles.forEach((circle) => drawCircle(ctx, circle.x, circle.y));

        // const distance = Math.sqrt((x - startX) ** 2 + (y - startY) ** 2);
        // if (distance <= radius) {
        //   // Draw self-referential arrow (arc)
        //   ctx.beginPath();
        //   const angle = Math.atan2(circle.y - startY, circle.x - startX);
        //   ctx.arc(
        //     startX + radius * Math.cos(angle),
        //     startY + radius * Math.sin(angle),
        //     15,
        //     0.5 * Math.PI,
        //     1.5 * Math.PI
        //   );
        //   ctx.strokeStyle = "white";
        //   ctx.lineWidth = 2;
        //   ctx.stroke();

        //   // Draw arrowhead
        //   const headX = startX + radius * Math.cos(Math.PI);
        //   const headY = startY - radius + radius * Math.sin(Math.PI);
        //   drawArrow(ctx, headX, headY, startX, startY);
        // } else {
        const angle = Math.atan2(circle.y - startY, circle.x - startX);
        const fromX = startX + radius * Math.cos(angle);
        const fromY = startY + radius * Math.sin(angle);
        const toX = circle.x - radius * Math.cos(angle);
        const toY = circle.y - radius * Math.sin(angle);

        drawArrow(ctx, fromX, fromY, toX, toY);
        //}
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        circles.forEach((circle) => drawCircle(ctx, circle.x, circle.y));
      }
      isDragging = false;
    }
  };

  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mousemove", handleMouseMove);
  canvas.addEventListener("mouseup", handleMouseUp);

  return () => {
    canvas.removeEventListener("mousedown", handleMouseDown);
    canvas.removeEventListener("mousemove", handleMouseMove);
    canvas.removeEventListener("mouseup", handleMouseUp);
  };
}

export function findCircleAtPosition(
  x: number,
  y: number,
  circles: { x: number; y: number }[]
) {
  const radius = 30;
  for (const circle of circles) {
    const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
    if (distance <= radius) {
      return circle;
    }
  }
  return null;
}
export function drawArrow(
  ctx: CanvasRenderingContext2D,
  fromX: number,
  fromY: number,
  toX: number,
  toY: number
) {
  const headLength = 10; // Length of the arrowhead
  const angle = Math.atan2(toY - fromY, toX - fromX);

  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.lineTo(
    toX - headLength * Math.cos(angle - Math.PI / 6),
    toY - headLength * Math.sin(angle - Math.PI / 6)
  );
  ctx.moveTo(toX, toY);
  ctx.lineTo(
    toX - headLength * Math.cos(angle + Math.PI / 6),
    toY - headLength * Math.sin(angle + Math.PI / 6)
  );
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();
}
