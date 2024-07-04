import { getRelativeMousePosition } from "../util/MousePosition";
import { redraw } from "../util/Redraw";
import Node from "../classes/node";

let canvas;
let nodes = [],
  links = [];
let selectedObject = null; // node or link
let originalClick,
  movingObject = false;

window.onload = function () {
  canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");

  // create node
  canvas.ondblclick = function (e) {
    let mouse = getRelativeMousePosition(e, canvas);
    selectedObject = selectAnObject(mouse.x, mouse.y);

    // if no object at mouse position create node
    if (selectedObject === null) {
      let newNode = new Node(mouse.x, mouse.y);
      nodes.push(newNode);
      selectedObject = newNode;
    } else if (selectedObject instanceof Node) {
      selectedObject.setAcceptState();
    }
    redraw(context, canvas, nodes, selectedObject);
  };

  // select an object
  canvas.onmousedown = function (e) {
    let mouse = getRelativeMousePosition(e, canvas);
    selectedObject = selectAnObject(mouse.x, mouse.y);
    originalClick = mouse;
    movingObject = false;

    if (selectedObject != null) {
      movingObject = true;
      if (selectedObject.setMouseStart)
        selectedObject.setMouseStart(mouse.x, mouse.y);
    }
    redraw(context, canvas, nodes, selectedObject);
  };

  canvas.onmousemove = function (e) {
    let mouse = getRelativeMousePosition(e, canvas);

    if (movingObject) {
      selectedObject.setAnchorPoint(mouse.x, mouse.y);
      redraw(context, canvas, nodes, selectedObject);
    }
  };

  canvas.onmouseup = function (e) {
    movingObject = false;
  };
};

function selectAnObject(x, y) {
  for (let i = 0; i < nodes.length; i++) {
    let node = nodes[i];
    if (node.containsPoint(x, y)) {
      return node;
    }
  }
  return null;
}
