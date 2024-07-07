import { getRelativeMousePosition } from "../util/MousePosition";
import { redraw } from "../util/Redraw";
import Node from "../classes/node";

let canvas;
let context;
let nodes = [],
  links = [];
let selectedObject = null; // node or link
let originalClick,
  movingObject = false;
let caretVisible = false,
  caretTimer;

window.onload = function () {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  const inputBox = document.getElementById("input");

  // create node
  canvas.ondblclick = function (e) {
    let mouse = getRelativeMousePosition(e, canvas);
    selectedObject = selectAnObject(mouse.x, mouse.y);

    // if no object at mouse position create node
    if (selectedObject === null) {
      let newNode = new Node(mouse.x, mouse.y);
      nodes.push(newNode);
      selectedObject = newNode;
      resetCaret(context);
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
      resetCaret(context);
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

document.onkeydown = function (e) {
  const key = e.key;
  if (key === "Backspace") {
    if (selectedObject != null && "text" in selectedObject) {
      selectedObject.text = selectedObject.text.substr(
        0,
        selectedObject.text.length - 1
      );
      resetCaret();
      redraw(context, canvas, nodes, selectedObject);
    }
  } else if (
    selectedObject != null &&
    "text" in selectedObject &&
    key.length == 1 &&
    ((key >= "a" && key <= "z") || (key >= "A" && key <= "Z"))
  ) {
    console;
    selectedObject.text += key;
    redraw(context, canvas, nodes, selectedObject);
  } else {
    console.log(key);
  }
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

function resetCaret() {
  clearInterval(caretTimer);
  caretTimer = setInterval(function () {
    caretVisible = !caretVisible;
    redraw(context, canvas, nodes, selectedObject, caretVisible);
  }, 500);
  caretVisible = true;
}
