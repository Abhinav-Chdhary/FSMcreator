import { getRelativeMousePosition } from "../util/MousePosition";
import { redraw } from "../util/Redraw";
import Node from "../classes/node";

let canvas;
let nodes = [],
  links = [];
let selectedObject = null; // node or link

window.onload = function () {
  canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");

  // create node
  canvas.ondblclick = function (e) {
    let mouse = getRelativeMousePosition(e, canvas);
    nodes.push(new Node(mouse.x, mouse.y));
    redraw(context, canvas, nodes);
  };

  // select an object
  canvas.onmousedown = function (e) {
    let mouse = getRelativeMousePosition(e, canvas);
    selectedObject = selectAnObject(mouse.x, mouse.y, context);
  };
};

function selectAnObject(x, y, context) {
  nodes.forEach((node) => {
    if (node.containsPoint(x, y)) {
      selectedObject = node;
      node.draw(context, "blue");
    }
  });
}
