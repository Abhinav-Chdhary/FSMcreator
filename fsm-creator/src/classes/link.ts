import Circle from "./circle";

export default class Link {
  CircleOne: Circle;
  CircleTwo: Circle;
  textContent: string;

  constructor(c1: Circle, c2: Circle) {
    this.CircleOne = c1;
    this.CircleTwo = c2;
    this.textContent = "";
  }
  drawArrowFinalArc(ctx: CanvasRenderingContext2D, color: string = "black") {
    const radi = 30;
    if (this.CircleOne === this.CircleTwo) {
      return;
    } else {
      const startx = this.CircleOne.x;
      const starty = this.CircleOne.y;
      const endx = this.CircleTwo.x;
      const endy = this.CircleTwo.y;

      const angle = Math.atan2(endy - starty, endx - startx);

      const startArcX = startx + radi * Math.cos(angle);
      const startArcY = starty + radi * Math.sin(angle);
      const endArcX = endx - radi * Math.cos(angle);
      const endArcY = endy - radi * Math.sin(angle);

      ctx.strokeStyle = color;

      ctx.beginPath();
      ctx.moveTo(startArcX, startArcY);
      ctx.lineTo(endArcX, endArcY);
      ctx.stroke();

      const arrowLength = 10;

      ctx.beginPath();
      ctx.moveTo(endArcX, endArcY);
      ctx.lineTo(
        endArcX - arrowLength * Math.cos(angle - Math.PI / 6),
        endArcY - arrowLength * Math.sin(angle - Math.PI / 6)
      );
      ctx.moveTo(endArcX, endArcY);
      ctx.lineTo(
        endArcX - arrowLength * Math.cos(angle + Math.PI / 6),
        endArcY - arrowLength * Math.sin(angle + Math.PI / 6)
      );
      ctx.stroke();
    }
  }
  drawSelfLink(ctx: CanvasRenderingContext2D, color: string = "black") {
    // add code here
  }
}
