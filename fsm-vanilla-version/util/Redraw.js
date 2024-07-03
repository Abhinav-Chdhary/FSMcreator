export function redraw(context, canvas, nodes) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  nodes.forEach((node) => {
    node.draw(context);
  });
}
