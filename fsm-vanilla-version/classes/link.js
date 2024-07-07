import drawArrow from "../util/drawArrow";

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
  draw(context, color = "black") {
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
        stuff.endAngle - stuff.reverseScale * (Math.PI / 2)
      );
    } else {
      drawArrow(
        context,
        stuff.endX,
        stuff.endY,
        Math.atan2(stuff.endY - stuff.startY, stuff.endX - stuff.startX)
      );
    }
  }
}
