import drawArrow from "../util/drawArrow";
import drawLinkText from "../util/drawLinkText";

export default class Link {
  constructor(nodeA, nodeB) {
    this.nodeA = nodeA;
    this.nodeB = nodeB;
    this.text = "";
    this.lineAngleAdjust = 0;
    this.parallelPart = 0.5;
    this.perpendicularPart = 0;
  }
  getAnchorPoint() {
    let dx = this.nodeB.x - this.nodeA.x;
    let dy = this.nodeB.y - this.nodeA.y;
    let scale = Math.sqrt(dx * dx + dy * dy);
    return {
      x:
        this.nodeA.x +
        dx * this.parallelPart -
        (dy * this.perpendicularPart) / scale,
      y:
        this.nodeA.y +
        dy * this.parallelPart +
        (dy * this.perpendicularPart) / scale,
    };
  }
  setAnchorPoint(x, y) {
    let dx = this.nodeB.x - this.nodeA.x;
    let dy = this.nodeB.y - this.nodeA.y;
    let scale = Math.sqrt(dx * dx + dy * dy);
    this.parallelPart =
      (dx * (x - this.nodeA.x) + dy * (y - this.nodeA.y)) / (scale * scale);
    this.perpendicularPart =
      (dx * (y - this.nodeA.y) - dy * (x - this.nodeA.x)) / scale;

    if (
      this.parallelPart > 0 &&
      this.parallelPart < 1 &&
      Math.abs(this.perpendicularPart)
    ) {
      this.lineAngleAdjust = (this.perpendicularPart < 0) * Math.PI;
      this.perpendicularPart = 0;
    }
  }
  getEndPointsAndCircle() {
    if (this.perpendicularPart == 0) {
      let midX = (this.nodeA.x + this.nodeB.x) / 2;
      let midY = (this.nodeA.y + this.nodeB.y) / 2;
      let start = this.nodeA.closestPointOnCircle(midX, midY);
      let end = this.nodeB.closestPointOnCircle(midX, midY);
      return {
        hasCircle: false,
        startX: start.x,
        startY: start.y,
        endX: end.x,
        endY: end.y,
      };
    }
    let anchor = this.getAnchorPoint();
    let circle = circleFromThreePoints(
      this.nodeA.x,
      this.nodeA.y,
      this.nodeB.x,
      this.nodeB.y,
      anchor.x,
      anchor.y
    );
    let isReversed = this.perpendicularPart > 0;
    let reverseScale = isReversed ? 1 : -1;
    let startAngle =
      Math.atan2(this.nodeA.y - circle.y, this.nodeA.x - circle.x) -
      (reverseScale * nodeRadius) / circle.radius;
    let endAngle =
      Math.atan2(this.nodeB.y - circle.y, this.nodeB.x - circle.x) +
      (reverseScale * nodeRadius) / circle.radius;
    let startX = circle.x + circle.radius * Math.cos(startAngle);
    let startY = circle.y + circle.radius * Math.sin(startAngle);
    let endX = circle.x + circle.radius * Math.cos(endAngle);
    let endY = circle.y + circle.radius * Math.sin(endAngle);
    return {
      hasCircle: true,
      startX: startX,
      startY: startY,
      endX: endX,
      endY: endY,
      startAngle: startAngle,
      endAngle: endAngle,
      circleX: circle.x,
      circleY: circle.y,
      circleRadius: circle.radius,
      reverseScale: reverseScale,
      isReversed: isReversed,
    };
  }
  draw(context, color = "black", caretVisible = false) {
    let stuff = this.getEndPointsAndCircle();

    // draw the arc
    context.beginPath();
    if (stuff.hasCircle) {
      context.arc(
        stuff.circleX,
        stuff.circleY,
        stuff.startAngle,
        stuff.endAngle,
        stuff.isReversed
      );
    } else {
      context.moveTo(stuff.startX, stuff.startY);
      context.lineTo(stuff.endX, stuff.endY);
    }
    context.strokeStyle = color;
    context.stroke();

    // the arrow head
    if (stuff.hasCircle) {
      drawArrow(
        context,
        stuff.endX,
        stuff.endY,
        stuff.endAngle - stuff.reverseScale * (Math.PI / 2),
        color
      );
    } else {
      drawArrow(
        context,
        stuff.endX,
        stuff.endY,
        Math.atan2(stuff.endY - stuff.startY, stuff.endX - stuff.startX),
        color
      );
    }

    // draw text
    if (stuff.hasCircle) {
      let startAngle = stuff.startAngle;
      let endAngle = stuff.endAngle;
      if (endAngle < startAngle) {
        endAngle += Math.PI * 2;
      }
      let textAngle = (startAngle + endAngle) / 2 + stuff.isReversed * Math.PI;
      let textX = stuff.circleX + stuff.circleRadius * Math.cos(textAngle);
      let textY = stuff.circleY + stuff.circleRadius * Math.sin(textAngle);
      drawLinkText(
        context,
        this.text,
        textX,
        textY,
        textAngle + this.lineAngleAdjust,
        color,
        caretVisible
      );
    } else {
      let textX = (stuff.startX + stuff.endX) / 2;
      let textY = (stuff.startY + stuff.endY) / 2;
      let textAngle = Math.atan2(
        stuff.endX - stuff.startX,
        stuff.startY - stuff.endY
      );
      drawLinkText(
        context,
        this.text,
        textX,
        textY,
        textAngle + this.lineAngleAdjust,
        color,
        caretVisible
      );
    }
  }
  containsPoint(x, y) {
    let hitTargetPadding = 6;
    let stuff = this.getEndPointsAndCircle();
    if (stuff.hasCircle) {
      let dx = x - stuff.circleX;
      let dy = y - stuff.circleY;
      let distance = Math.sqrt(dx * dx + dy * dy) - stuff.circleRadius;
      if (Math.abs(distance) < hitTargetPadding) {
        let angle = Math.atan2(dy, dx);
        let startAngle = stuff.startAngle;
        let endAngle = stuff.endAngle;
        if (stuff.isReversed) {
          let temp = startAngle;
          startAngle = endAngle;
          endAngle = temp;
        }
        if (endAngle < startAngle) {
          endAngle += Math.PI * 2;
        }
        if (angle < startAngle) {
          angle += Math.PI * 2;
        } else if (angle > endAngle) {
          angle -= Math.PI * 2;
        }
        return angle > startAngle && angle < endAngle;
      }
    } else {
      let dx = stuff.endX - stuff.startX;
      let dy = stuff.endY - stuff.startY;
      let length = Math.sqrt(dx * dx + dy * dy);
      let percent =
        (dx * (x - stuff.startX) + dy * (y - stuff.startY)) / (length * length);
      let distance =
        (dx * (y - stuff.startY) - dy * (x - stuff.startX)) / length;
      return (
        percent > 0 && percent < 1 && Math.abs(distance) < hitTargetPadding
      );
    }
    return false;
  }
}
