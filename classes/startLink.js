import drawArrow from "../util/drawArrow";
import drawLinkText from "../util/drawLinkText";

export default class StartLink {
  constructor(node, start) {
    this.node = node;
    this.deltaX = 0;
    this.deltaY = 0;
    this.text = "";

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
  draw(context, color = "black", caretVisible = false) {
    let coordinates = this.getEndPoints();

    context.beginPath();
    context.moveTo(coordinates.startX, coordinates.startY);
    context.lineTo(coordinates.endX, coordinates.endY);
    context.strokeStyle = color;
    context.stroke();

    let textAngle = Math.atan2(
      coordinates.startY - coordinates.endY,
      coordinates.startX - coordinates.endX
    );
    drawLinkText(
      context,
      this.text,
      coordinates.startX,
      coordinates.startY,
      textAngle,
      color,
      caretVisible
    );

    drawArrow(
      context,
      coordinates.endX,
      coordinates.endY,
      Math.atan2(-this.deltaY, -this.deltaX),
      color
    );
  }
  containsPoint(x, y) {
    let stuff = this.getEndPoints();
    let hitTargetPadding = 6; // six is target padding
    let dx = stuff.endX - stuff.startX;
    let dy = stuff.endY - stuff.startY;
    let length = Math.sqrt(dx * dx + dy * dy);
    let percent =
      (dx * (x - stuff.startX) + dy * (y - stuff.startY)) / (length * length);
    let distance = (dx * (y - stuff.startY) - dy * (x - stuff.startX)) / length;
    return percent > 0 && percent < 1 && Math.abs(distance) < hitTargetPadding;
  }
}
