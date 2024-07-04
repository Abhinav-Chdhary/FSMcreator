export function redraw(
  context,
  canvas,
  nodes,
  selectedObject = null,
  caretVisible = false
) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  nodes.forEach((node) => {
    if (node === selectedObject) node.draw(context, "blue", caretVisible);
    else node.draw(context);
  });
}
