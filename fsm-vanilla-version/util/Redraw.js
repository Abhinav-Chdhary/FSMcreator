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
  for (let i = 0; i < nodes.length; i++) {
    let node = nodes[i];
    if (node === selectedObject) node.draw(context, "blue", caretVisible);
    else node.draw(context);
  }
  for (let i = 0; i < links.length; i++) {
    let link = links[i];
    if (link === selectedObject) link.draw(context, "blue", caretVisible);
    else link.draw(context);
  }
  if (currentLink != null) {
    context.lineWidth = 1;
    context.fillStyle = context.strokeStyle = "black";
    currentLink.draw(context);
  }
}
