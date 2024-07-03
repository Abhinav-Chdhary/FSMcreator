export default class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isAcceptState = false;
    this.text = "";
    this.nodeRadius = 30;
  }
  draw(context, color = "black") {
    context.beginPath();
    context.arc(this.x, this.y, this.nodeRadius, 0, 2 * Math.PI, false);
    context.strokeStyle = color;
    context.stroke();

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
    let scale = Math.sqrt(dx * dx + dy * dy);
    return {
      x: this.x + (dx * this.nodeRadius) / scale,
      y: this.y + (dy * this.nodeRadius) / scale,
    };
  }
}
