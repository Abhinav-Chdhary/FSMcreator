export default class Circle {
  x: number;
  y: number;
  radius: number;
  isFinalState: boolean;
  textContent: string;
  constructor(
    x: number,
    y: number,
    radius: number,
    isFinal: boolean,
    text = "S"
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.isFinalState = isFinal;
    this.textContent = text;
  }
  drawCircle(ctx: CanvasRenderingContext2D, color: string = "black") {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = color;
    ctx.font = `bold 20px sans serif`;
    ctx.textAlign = "center";
    ctx.fillText(this.textContent, this.x, this.y + this.radius / 6);

    if (this.isFinalState) {
      this.makeFinal(ctx, color);
    }
  }
  isCircle(x: number, y: number): boolean {
    const distanceSquared = Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2);
    const radiusSquared = Math.pow(this.radius, 2);
    return distanceSquared <= radiusSquared;
  }
  makeFinal(ctx: CanvasRenderingContext2D, color: string = "black") {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius - 10, 0, Math.PI * 2);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();

    this.isFinalState = true;
  }
}
