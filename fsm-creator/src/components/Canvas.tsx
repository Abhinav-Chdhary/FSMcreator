import {
  KeyboardEvent as ReactKeyboardEvent,
  useContext,
  useEffect,
} from "react";
import { CanvasContext } from "../context/canvasContext";
import { handleDoubleClick } from "../util/handleDoubleClick";
import { handleClickOnCanvas } from "../util/handleClick";
import { handleKeyDown } from "../util/handleDelete";
import { redraw } from "../util/redraw";
import { handleClickDrag } from "../util/handleDrag";
import { handleShiftDrag } from "../util/handleShiftDrag";
import "./Canvas.css";

export default function Canvas() {
  const canvasContext = useContext(CanvasContext);

  if (!canvasContext) {
    throw new Error("CanvasContext must be used within a provider");
  }
  const { canvasRef, ctx, circles, setCircles, selectedObject } = canvasContext;

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas && ctx) {
      // Add double click event listener for drawing circles
      const boundHandleDoubleClick = (event: MouseEvent) =>
        handleDoubleClick(event, ctx, canvas);
      canvas.addEventListener("dblclick", boundHandleDoubleClick);

      // Add click event listener for selecting objects
      const boundHandleClick = (event: MouseEvent) =>
        handleClickOnCanvas(event, ctx, canvas);
      canvas.addEventListener("click", boundHandleClick);

      // on press delete event
      const boundHandleKeyDown = (event: KeyboardEvent) =>
        handleKeyDown(event, selectedObject, setCircles);
      window.addEventListener("keydown", boundHandleKeyDown);

      // on press shift
      const boundHandleShiftDown = (event: KeyboardEvent) =>
        handleShiftDrag(event, ctx, canvas);
      window.addEventListener("keydown", boundHandleShiftDown);

      //on click and drag
      const cleanUpHandleClickDrag = handleClickDrag(ctx, canvas);

      //redraw if anything changes
      redraw(ctx, canvas);
      // Clean up event listeners on component unmount
      return () => {
        canvas.removeEventListener("dblclick", boundHandleDoubleClick);
        canvas.removeEventListener("click", boundHandleClick);
        window.removeEventListener("keydown", boundHandleKeyDown);
        window.removeEventListener("keydown", boundHandleShiftDown);
        cleanUpHandleClickDrag();
      };
    } else {
      console.warn("Canvas element not found in the DOM.");
    }
  }, [circles, selectedObject]);

  return <canvas ref={canvasRef} width={800} height={600} />;
}
