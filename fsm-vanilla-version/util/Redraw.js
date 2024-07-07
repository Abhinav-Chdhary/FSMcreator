export function redraw(
  context,
  canvas,
  nodes,
  links,
  selectedObject = null,
  caretVisible = false,
  currentLink
) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  nodes.forEach((node) => {
    if (node === selectedObject) node.draw(context, "blue", caretVisible);
    else node.draw(context);
  });
  links.forEach((link) => {
    if (link === selectedObject) link.draw(context, "blue");
    else link.draw(context);
  });
  if (currentLink != null) {
    context.lineWidth = 1;
    context.fillStyle = context.strokeStyle = "black";
    currentLink.draw(context);
  }
}
