import { useEffect, useRef, useState } from "react";
import { handleDoubleClick } from "../util/handleDoubleClick";
import { handleClickOnCanvas } from "../util/handleClick";
import "./Canvas.css";
import Circle from "../elements/circle";
import { selectType } from "../util/customTypes";

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
          selectedObject
        );
      canvas.addEventListener("dblclick", boundHandleDoubleClick);

      // Add click event listener for selecting objects
      const boundHandleClick = (event: MouseEvent) =>
        handleClickOnCanvas(event, canvas, ctx, circles, setSelectedObject);
      canvas.addEventListener("click", boundHandleClick);

      // Clean up event listeners on component unmount
      return () => {
        canvas.removeEventListener("dblclick", boundHandleDoubleClick);
        canvas.removeEventListener("click", boundHandleClick);
      };
    } else {
      console.warn("Canvas element not found in the DOM.");
    }
  }, [circles, selectedObject]);

  return <canvas ref={canvasRef} width={800} height={600} />;
}
