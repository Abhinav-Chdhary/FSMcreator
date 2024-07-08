import drawArrow from "../util/drawArrow";
import drawLinkText from "../util/drawLinkText";

export default class SelfLink {
  constructor(node, mouse) {
    this.node = node;
    this.anchorAngle = 0;
    this.mouseOffsetAngle = 0;
    this.text = "t";
    this.nodeRadius = 30;

    if (mouse) {
      this.setAnchorPoint(mouse.x, mouse.y);
    }
  }
  setMouseStart(x, y) {
    this.mouseOffsetAngle =
      this.anchorAngle - Math.atan2(y - this.node.y, x - this.node.x);
  }
  setAnchorPoint(x, y) {
    this.anchorAngle =
      Math.atan2(y - this.node.y, x - this.node.x) + this.mouseOffsetAngle;
  }
  getEndPointsAndCircle() {
    let circleX =
      this.node.x + 1.5 * this.nodeRadius * Math.cos(this.anchorAngle);
    let circleY =
      this.node.y + 1.5 * this.nodeRadius * Math.sin(this.anchorAngle);
    let circleRadius = 0.75 * this.nodeRadius;
    let startAngle = this.anchorAngle - Math.PI * 0.8;
    let endAngle = this.anchorAngle + Math.PI * 0.8;
    let startX = circleX + circleRadius * Math.cos(startAngle);
    let startY = circleY + circleRadius * Math.sin(startAngle);
    let endX = circleX + circleRadius * Math.cos(endAngle);
    let endY = circleY + circleRadius * Math.sin(endAngle);

    return {
      hasCircle: true,
      startX: startX,
      startY: startY,
      endX: endX,
      endY: endY,
      startAngle: startAngle,
      endAngle: endAngle,
      circleX: circleX,
      circleY: circleY,
      circleRadius: circleRadius,
    };
  }
  draw(context, color = "black", caretVisible = false) {
    let stuff = this.getEndPointsAndCircle();
    // draw the arc
    context.beginPath();
    context.arc(
      stuff.circleX,
      stuff.circleY,
      stuff.circleRadius,
      stuff.startAngle,
      stuff.endAngle,
      false
    );
    context.strokeStyle = color;
    context.stroke();

    // draw text
    let textX = stuff.circleX + stuff.circleRadius * Math.cos(this.anchorAngle);
    let textY = stuff.circleY + stuff.circleRadius * Math.sin(this.anchorAngle);
    drawLinkText(
      context,
      this.text,
      textX,
      textY,
      this.anchorAngle,
      color,
      caretVisible
    );

    // draw the head of arrow
    drawArrow(
      context,
      stuff.endX,
      stuff.endY,
      stuff.endAngle + Math.PI * 0.4,
      color
    );
  }
  containsPoint(x, y) {
    let stuff = this.getEndPointsAndCircle();
    let dx = x - stuff.circleX;
    let dy = y - stuff.circleY;
    let distance = Math.sqrt(dx * dx + dy * dy) - stuff.circleRadius;
    let hitTargetPadding = 6; // six is target padding
    return Math.abs(distance) < hitTargetPadding;
  }
}
