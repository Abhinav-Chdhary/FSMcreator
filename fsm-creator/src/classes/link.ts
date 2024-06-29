import Circle from "./circle";

export default class Link {
  CircleOne: Circle;
  CircleTwo: Circle;
  textContent: string;

  constructor(c1: Circle, c2: Circle) {
    this.CircleOne = c1;
    this.CircleTwo = c2;
    this.textContent = "t";
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
      this.drawTextAboveArrow(ctx, startArcX, startArcY, endArcX, endArcY);
    }
  }
  drawSelfLink(ctx: CanvasRenderingContext2D, color: string = "black") {
    // add code here
  }
  drawTextAboveArrow(
    ctx: CanvasRenderingContext2D,
    startArcX: number,
    startArcY: number,
    endArcX: number,
    endArcY: number,
    color = "black"
  ) {
    const midX = (startArcX + endArcX) / 2;
    const midY = (startArcY + endArcY) / 2;

    // Adjust position to place text above the midpoint
    const textX = midX;
    const textY = midY - 10; // Adjust as needed

    // Draw the text above the midpoint
    ctx.font = "20px sans serif";
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.fillText(this.textContent, textX, textY);
  }
}
