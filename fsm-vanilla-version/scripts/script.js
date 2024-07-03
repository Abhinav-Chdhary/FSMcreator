import { getRelativeMousePosition } from "../util/MousePosition";
import Node from "../classes/node";

let canvas;
let nodes = [],
  links = [];

window.onload = function () {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  canvas.ondblclick = function (e) {
    let mouse = getRelativeMousePosition(e, canvas);
    nodes.push(new Node(mouse.x, mouse.y));
    redraw(context, canvas);
  };
};

function redraw(context, canvas) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  nodes.forEach((node) => {
    node.draw(context);
  });
}
