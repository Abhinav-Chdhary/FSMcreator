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
  drawCircle(ctx: CanvasRenderingContext2D, color: string) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
    if (this.isFinalState) {
      this.makeFinal(ctx);
    }
  }
  isCircle(x: number, y: number): boolean {
    const distanceSquared = Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2);
    const radiusSquared = Math.pow(this.radius, 2);
    return distanceSquared <= radiusSquared;
  }
  makeFinal(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius - 10, 0, Math.PI * 2);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();

    this.isFinalState = true;
  }
}
