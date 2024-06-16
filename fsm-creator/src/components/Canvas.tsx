import { useEffect, useRef, useState } from "react";
import { handleDoubleClick } from "../util/handleDoubleClick";
import "./Canvas.css";
import Circle from "../elements/circle";
import { handleClickOnCanvas } from "../util/handleClick";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [circles, setCircles] = useState<Circle[]>([]);

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
        handleDoubleClick(event, canvas, ctx, circles, setCircles);
      canvas.addEventListener("dblclick", boundHandleDoubleClick);

      // Add click event listener for selecting objects
      const boundHandleClick = (event: MouseEvent) =>
        handleClickOnCanvas(event, canvas, ctx, circles);
      canvas.addEventListener("click", boundHandleClick);

      // Clean up event listeners on component unmount
      return () => {
        canvas.removeEventListener("dblclick", boundHandleDoubleClick);
        canvas.removeEventListener("click", boundHandleClick);
      };
    } else {
      console.warn("Canvas element not found in the DOM.");
    }
  }, [circles]);

  return <canvas ref={canvasRef} width={800} height={600} />;
}
