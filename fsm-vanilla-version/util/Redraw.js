export function redraw(context, canvas, nodes, selectedObject = null) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  nodes.forEach((node) => {
    if (node === selectedObject) node.draw(context, "blue");
    else node.draw(context);
  });
}
