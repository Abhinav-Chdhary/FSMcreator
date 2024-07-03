export default class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isAcceptState = false;
    this.text = "";
    this.nodeRadius = 30;
  }
  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.nodeRadius, 0, 2 * Math.PI, false);
    context.stroke();
    if (this.isAcceptState) {
      context.beginPath();
      context.arc(this.x, this.y, this.nodeRadius - 6, 0, 2 * Math.PI, false);
      context.stroke();
    }
  }
}
