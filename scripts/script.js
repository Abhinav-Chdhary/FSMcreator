import { getRelativeMousePosition } from "../util/MousePosition";
import { redraw } from "../util/Redraw";
import Node from "../classes/node";
import TempLink from "../classes/tempLink";
import StartLink from "../classes/startLink";
import Link from "../classes/link";
import SelfLink from "../classes/selfLink";

let canvas;
let context;
export let nodes = [],
  links = [];
let selectedObject = null; // node or link
let originalClick,
  movingObject = false;
let caretVisible = false,
  caretTimer;
let shiftPressed = false;
let currentLink = null;

window.onload = function () {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  // create node
  canvas.ondblclick = function (e) {
    let mouse = getRelativeMousePosition(e, canvas);
    selectedObject = selectAnObject(mouse.x, mouse.y);

    // if no object at mouse position create node
    if (selectedObject === null) {
      let newNode = new Node(mouse.x, mouse.y);
      nodes.push(newNode);
      selectedObject = newNode;
      resetCaret();
    } else if (selectedObject instanceof Node) {
      selectedObject.setAcceptState();
    }
    redraw(
      context,
      canvas,
      nodes,
      links,
      selectedObject,
      caretVisible,
      currentLink
    );
  };

  // select an object
  canvas.onmousedown = function (e) {
    let mouse = getRelativeMousePosition(e, canvas);
    selectedObject = selectAnObject(mouse.x, mouse.y);
    originalClick = mouse;
    movingObject = false;

    if (selectedObject != null) {
      if (shiftPressed && selectedObject instanceof Node) {
        currentLink = new SelfLink(selectedObject, mouse);
      } else {
        movingObject = true;
        if (selectedObject.setMouseStart)
          selectedObject.setMouseStart(mouse.x, mouse.y);
      }
      resetCaret();
    } else if (shiftPressed) {
      currentLink = new TempLink(mouse, mouse);
    }
    redraw(
      context,
      canvas,
      nodes,
      links,
      selectedObject,
      caretVisible,
      currentLink
    );
  };

  canvas.onmousemove = function (e) {
    let mouse = getRelativeMousePosition(e, canvas);

    if (currentLink != null) {
      //console.log(currentLink);
      let targetNode = selectAnObject(mouse.x, mouse.y);
      if (!(targetNode instanceof Node)) {
        targetNode = null;
      }
      if (selectedObject === null) {
        // if no begin node
        if (targetNode !== null) {
          currentLink = new StartLink(targetNode, originalClick);
        } else {
          currentLink = new TempLink(originalClick, mouse);
        }
      } else {
        // if there's a begin node
        if (targetNode === selectedObject) {
          currentLink = new SelfLink(selectedObject, mouse);
        } else if (targetNode !== null) {
          currentLink = new Link(selectedObject, targetNode);
        } else {
          currentLink = new TempLink(
            selectedObject.closestPointOnCircle(mouse.x, mouse.y),
            mouse
          );
        }
      }
      redraw(
        context,
        canvas,
        nodes,
        links,
        selectedObject,
        caretVisible,
        currentLink
      );
    }

    if (movingObject) {
      selectedObject.setAnchorPoint(mouse.x, mouse.y);
      redraw(
        context,
        canvas,
        nodes,
        links,
        selectedObject,
        caretVisible,
        currentLink
      );
    }
  };

  canvas.onmouseup = function (e) {
    movingObject = false;

    if (currentLink != null) {
      if (!(currentLink instanceof TempLink)) {
        selectedObject = currentLink;
        links.push(currentLink);
        resetCaret();
      }
      currentLink = null;
      redraw(
        context,
        canvas,
        nodes,
        links,
        selectedObject,
        caretVisible,
        currentLink
      );
    }
  };
};

document.onkeydown = function (e) {
  const key = e.key;
  if (key === "Backspace") {
    if (selectedObject != null && "text" in selectedObject) {
      let len = selectedObject.text.length;
      let newText = selectedObject.text.substr(0, len - 1);
      selectedObject.text = newText;
      resetCaret();
      redraw(
        context,
        canvas,
        nodes,
        links,
        selectedObject,
        caretVisible,
        currentLink
      );
    }
  } else if (
    selectedObject != null &&
    "text" in selectedObject &&
    /^[a-zA-Z0-9]$/.test(key)
  ) {
    selectedObject.text += key;
    resetCaret();
    redraw(
      context,
      canvas,
      nodes,
      links,
      selectedObject,
      caretVisible,
      currentLink
    );
  } else if (key === "Shift") {
    shiftPressed = true;
  } else if (key === "Delete") {
    if (selectedObject !== null) {
      // Remove nodes
      nodes = nodes.filter((node) => node !== selectedObject);

      // Remove links
      links = links.filter(
        (link) =>
          link !== selectedObject &&
          !(link instanceof SelfLink && link.node === selectedObject) &&
          !(
            link instanceof Link &&
            (link.nodeA === selectedObject || link.nodeB === selectedObject)
          )
      );

      redraw(
        context,
        canvas,
        nodes,
        links,
        selectedObject,
        caretVisible,
        currentLink
      );
    }
  }
};
document.onkeyup = function (e) {
  const key = e.key;
  if (key === "Shift") {
    shiftPressed = false;
  }
};

function selectAnObject(x, y) {
  for (let i = 0; i < nodes.length; i++) {
    let node = nodes[i];
    if (node.containsPoint(x, y)) {
      return node;
    }
  }
  for (let i = 0; i < links.length; i++) {
    let link = links[i];
    if (link.containsPoint(x, y)) {
      return link;
    }
  }
  return null;
}

function resetCaret() {
  clearInterval(caretTimer);
  caretTimer = setInterval(function () {
    caretVisible = !caretVisible;
    redraw(
      context,
      canvas,
      nodes,
      links,
      selectedObject,
      caretVisible,
      currentLink
    );
  }, 500);
  caretVisible = true;
}

const searchBox = document.getElementById("searchBox");

searchBox.addEventListener("change", handleSearchChange);

function handleSearchChange(event) {
  let searchString = event.target.value;
  if (searchString.length === 0) return;
  nodes.forEach((node) => {
    if (node.text.includes(searchString)) {
      node.draw(context, "red");
    }
  });
  links.forEach((link) => {
    if (link.text.includes(searchString)) {
      link.draw(context, "red");
    }
  });
}
