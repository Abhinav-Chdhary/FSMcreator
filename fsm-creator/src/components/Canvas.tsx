import { KeyboardEvent as ReactKeyboardEvent, useEffect } from "react";
import { handleDoubleClick } from "../util/handleDoubleClick";
import { handleClickOnCanvas } from "../util/handleClick";
import { handleKeyDown } from "../util/handleDelete";
import { useRedraw } from "../util/useRedraw";
import { handleClickDrag } from "../util/handleDrag";
import { handleShiftDrag } from "../util/handleShiftDrag";
import "./Canvas.css";
import useCanvasStore from "../util/canvasStore";

export default function Canvas() {
  const { canvasRef, circles, selectedObject } = useCanvasStore();

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      if (!ctx) {
        console.error("Failed to get 2d context");
      }
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
        handleKeyDown(event, selectedObject);
      window.addEventListener("keydown", boundHandleKeyDown);

      // on press shift
      const boundHandleShiftDown = (event: KeyboardEvent) =>
        handleShiftDrag(event, ctx, canvas);
      window.addEventListener("keydown", boundHandleShiftDown);

      //on click and drag
      const cleanUpHandleClickDrag = handleClickDrag(
        ctx,
        canvas,
        selectedObject
      );

      //redraw if anything changes
      useRedraw(ctx, canvas);
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
