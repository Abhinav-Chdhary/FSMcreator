import drawArrow from "../util/drawArrow";

export default class TempLink {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }
  draw(context) {
    context.beginPath();
    context.moveTo(this.to.x, this.to.y);
    context.lineTo(this.from.x, this.from.y);
    context.stroke();

    // draw the head of the arrow
    drawArrow(
      context,
      this.to.x,
      this.to.y,
      Math.atan2(this.to.y - this.from.y, this.to.x - this.from.x)
    );
  }
}
