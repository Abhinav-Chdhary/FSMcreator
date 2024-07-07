import drawArrow from "../util/drawArrow";

export default class StartLink {
  constructor(node, start) {
    this.node = node;
    this.deltaX = 0;
    this.deltaY = 0;

    if (start) {
      this.setAnchorPoint(start.x, start.y);
    }
  }
  setAnchorPoint(x, y) {
    this.deltaX = x - this.node.x;
    this.deltaY = y - this.node.y;
    //if(Math.abs(this.deltaX)<sna)
  }
  getEndPoints() {
    let startX = this.node.x + this.deltaX;
    let startY = this.node.y + this.deltaY;
    let end = this.node.closestPointOnCircle(startX, startY);
    return {
      startX: startX,
      startY: startY,
      endX: end.x,
      endY: end.y,
    };
  }
  draw(context) {
    let coordinates = this.getEndPoints();

    context.beginPath();
    context.moveTo(coordinates.startX, coordinates.startY);
    context.lineTo(coordinates.endX, coordinates.endY);
    context.stroke();

    drawArrow(
      context,
      coordinates.endX,
      coordinates.endY,
      Math.atan2(-this.deltaY, -this.deltaX)
    );
  }
}
