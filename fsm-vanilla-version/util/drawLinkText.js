export default function (
  context,
  text,
  x,
  y,
  angle,
  color = "black",
  caretVisible = false
) {
  context.fillStyle = color;
  context.font = "20px 'Times New Roman', sans-serif";
  context.textAlign = "center";
  let width = context.measureText(text).width;
  x -= width / 2;
  if (angle !== null) {
    let cos = Math.cos(angle);
    let sin = Math.sin(angle);

    let cornerPointX = (width / 2 + 5) * (cos > 0 ? 1 : -1);
    let cornerPointY = (10 + 5) * (sin > 0 ? 1 : -1);
    let slide =
      sin * Math.pow(Math.abs(sin), 40) * cornerPointX -
      cos * Math.pow(Math.abs(cos), 10) * cornerPointY;
    x += cornerPointX - sin * slide;
    y += cornerPointY + cos * slide;

    x = Math.round(x);
    y = Math.round(y);
    //context.rotate(angle);
    context.fillText(text, x, y);
    if (caretVisible && color === "blue") {
      x += width/2;
      context.beginPath();
      context.moveTo(x, y-10);
      context.lineTo(x, y);
      context.stroke();
    }
  }
}
