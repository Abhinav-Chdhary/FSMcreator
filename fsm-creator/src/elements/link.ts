import Circle from "./circle";

export default class Link {
  CircleOne: Circle;
  CircleTwo: Circle;

  constructor(c1: Circle, c2: Circle) {
    this.CircleOne = c1;
    this.CircleTwo = c2;
  }
  drawDragArrow(
    ctx: CanvasRenderingContext2D,
    color: string = "black",
    endX: number,
    endY: number
  ) {
    const pointA = { x: this.CircleOne.x, y: this.CircleOne.y };
    const pointB = { x: endX, y: endY };

    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(pointA.x, pointA.y);
    ctx.lineTo(pointB.x, pointB.y);
    ctx.stroke();
  }
  drawArrowFinalArc(ctx: CanvasRenderingContext2D, color: string = "black") {
    const radi = 30;
    if (this.CircleOne === this.CircleTwo) {
      return;
    } else {
      let startx = this.CircleOne.x+30;
      let starty = this.CircleOne.y;
      let endx = this.CircleTwo.x-30;
      let endy = this.CircleTwo.y;

      ctx.strokeStyle = color;

      ctx.beginPath();
      ctx.moveTo(startx, starty);
      ctx.lineTo(endx, endy);
      ctx.stroke();

      const angle = Math.atan2(endy - starty, endx - startx);
      const arrowLength = 10;

      ctx.beginPath();
      ctx.moveTo(endx, endy);
      ctx.lineTo(
        endx - arrowLength * Math.cos(angle - Math.PI / 6),
        endy - arrowLength * Math.sin(angle - Math.PI / 6)
      );
      ctx.moveTo(endx, endy);
      ctx.lineTo(
        endx - arrowLength * Math.cos(angle + Math.PI / 6),
        endy - arrowLength * Math.sin(angle + Math.PI / 6)
      );
      ctx.stroke();
    }
  }
  drawSelfLink(ctx: CanvasRenderingContext2D, color: string = "black") {
    // add code here
  }
}
