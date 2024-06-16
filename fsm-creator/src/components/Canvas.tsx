import {
  KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { handleDoubleClick } from "../util/handleDoubleClick";
import { handleClickOnCanvas } from "../util/handleClick";
import "./Canvas.css";
import Circle from "../elements/circle";
import { selectType } from "../util/customTypes";
import { handleKeyDown } from "../util/handleDelete";
import { redraw } from "../util/redraw";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [circles, setCircles] = useState<Circle[]>([]);
  const [selectedObject, setSelectedObject] = useState<selectType>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

      if (!ctx) {
        console.error("Failed to get 2D context from canvas element.");
        return;
      }

      // Add double click event listener for drawing circles
      const boundHandleDoubleClick = (event: MouseEvent) =>
        handleDoubleClick(
          event,
          canvas,
          ctx,
          circles,
          setCircles,
          selectedObject,
          setSelectedObject
        );
      canvas.addEventListener("dblclick", boundHandleDoubleClick);

      // Add click event listener for selecting objects
      const boundHandleClick = (event: MouseEvent) =>
        handleClickOnCanvas(event, ctx, canvas, circles, setSelectedObject);
      canvas.addEventListener("click", boundHandleClick);

      // on press delete event
      const boundHandleKeyDown = (event: KeyboardEvent) =>
        handleKeyDown(event, selectedObject, setCircles);
      window.addEventListener("keydown", boundHandleKeyDown);

      //redraw if anything changes
      redraw(ctx, circles, canvas, selectedObject);
      // Clean up event listeners on component unmount
      return () => {
        canvas.removeEventListener("dblclick", boundHandleDoubleClick);
        canvas.removeEventListener("click", boundHandleClick);
        window.removeEventListener("keydown", boundHandleKeyDown);
      };
    } else {
      console.warn("Canvas element not found in the DOM.");
    }
  }, [circles, selectedObject]);

  return <canvas ref={canvasRef} width={800} height={600} />;
}
