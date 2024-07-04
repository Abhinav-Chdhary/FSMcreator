export default class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isAcceptState = false;
    this.text = "txt";
    this.nodeRadius = 30;
    this.mouseOffsetX = 0;
    this.mouseOffsetY = 0;
  }
  draw(context, color = "black") {
    context.beginPath();
    context.arc(this.x, this.y, this.nodeRadius, 0, 2 * Math.PI, false);
    context.strokeStyle = color;
    context.stroke();

    this.drawText(context, color);

    if (this.isAcceptState) {
      context.beginPath();
      context.strokeStyle = color;
      context.arc(this.x, this.y, this.nodeRadius - 6, 0, 2 * Math.PI, false);
      context.stroke();
    }
  }
  containsPoint(x, y) {
    let dx = x - this.x;
    let dy = y - this.y;
    let distanceFromCenter = dx * dx + dy * dy;
    return distanceFromCenter < this.nodeRadius * this.nodeRadius;
  }
  setAcceptState() {
    this.isAcceptState = true;
  }
  setMouseStart(x, y) {
    this.mouseOffsetX = this.x - x;
    this.mouseOffsetY = this.y - y;
  }
  setAnchorPoint(x, y) {
    this.x = x + this.mouseOffsetX;
    this.y = y + this.mouseOffsetY;
  }
  drawText(context, color = "black") {
    context.fillStyle = color;
    context.font = "20px 'Times New Roman', sans-serif";
    context.textAlign = "center";
    context.fillText(this.text, this.x, this.y + this.nodeRadius / 6);
  }
}
