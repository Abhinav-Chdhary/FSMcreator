export default class Circle {
  x: number;
  y: number;
  radius: number;
  isFinalState: boolean;
  constructor(x: number, y: number, radius: number, isFinal: boolean) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.isFinalState = isFinal;
  }
  drawCircle(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
  }
}
